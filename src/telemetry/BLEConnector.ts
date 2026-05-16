/**
 * Lume-Auto — Web Bluetooth OBD-II Connector
 * Connects to BLE ELM327 adapters via the Web Bluetooth API.
 * Works in Chrome (Android + Desktop) and Edge.
 * iOS Safari does NOT support Web Bluetooth.
 */

import { type TelemetrySnapshot, tick as simulatedTick } from './SimulatedEngine';

// Common BLE OBD-II service/characteristic UUIDs
const KNOWN_SERVICES = [
  '0000ffe0-0000-1000-8000-00805f9b34fb',  // Generic BLE ELM327 (most common)
  '0000fff0-0000-1000-8000-00805f9b34fb',  // OBDLink / alt adapters
  'e7810a71-73ae-499d-8c15-faa9aef0c3f2',  // Some newer adapters
];

const KNOWN_CHARACTERISTICS = [
  '0000ffe1-0000-1000-8000-00805f9b34fb',  // Generic BLE ELM327
  '0000fff1-0000-1000-8000-00805f9b34fb',  // OBDLink TX
  'bef8d6c9-9c21-4c9e-b632-bd58c1009f9f',  // Newer adapters
];

export type BLEStatus = 'disconnected' | 'scanning' | 'connecting' | 'initializing' | 'connected' | 'error' | 'unsupported';

export interface BLEConnection {
  status: BLEStatus;
  deviceName: string | null;
  error: string | null;
  isSimulated: boolean;
  adapterInfo: string | null;
}

let device: BluetoothDevice | null = null;
let txCharacteristic: BluetoothRemoteGATTCharacteristic | null = null;
let responseBuffer = '';
let responseResolve: ((value: string) => void) | null = null;
let connectionState: BLEConnection = {
  status: 'disconnected', deviceName: null, error: null, isSimulated: false, adapterInfo: null,
};

// Raw PID values from adapter
let rawValues: Record<string, number> = {};
let startTime = Date.now();

// OBD-II PID definitions
const PIDS: { cmd: string; parse: (hex: string) => Record<string, number> }[] = [
  { cmd: '010C', parse: (h) => ({ rpm: (parseInt(h.slice(0, 2), 16) * 256 + parseInt(h.slice(2, 4), 16)) / 4 }) },
  { cmd: '010D', parse: (h) => ({ speed: parseInt(h.slice(0, 2), 16) }) },
  { cmd: '0110', parse: (h) => ({ maf: (parseInt(h.slice(0, 2), 16) * 256 + parseInt(h.slice(2, 4), 16)) / 100 }) },
  { cmd: '0111', parse: (h) => ({ throttle: parseInt(h.slice(0, 2), 16) * 100 / 255 }) },
  { cmd: '0104', parse: (h) => ({ engineLoad: parseInt(h.slice(0, 2), 16) * 100 / 255 }) },
  { cmd: '0105', parse: (h) => ({ coolant: parseInt(h.slice(0, 2), 16) - 40 }) },
  { cmd: '010F', parse: (h) => ({ iat: parseInt(h.slice(0, 2), 16) - 40 }) },
  { cmd: '010B', parse: (h) => ({ map: parseInt(h.slice(0, 2), 16) }) },
  { cmd: '010E', parse: (h) => ({ timing: parseInt(h.slice(0, 2), 16) / 2 - 64 }) },
  { cmd: '0106', parse: (h) => ({ stftB1: (parseInt(h.slice(0, 2), 16) - 128) * 100 / 128 }) },
  { cmd: '0107', parse: (h) => ({ ltftB1: (parseInt(h.slice(0, 2), 16) - 128) * 100 / 128 }) },
  { cmd: '0114', parse: (h) => ({ o2B1S1: parseInt(h.slice(0, 2), 16) / 200 }) },
  { cmd: '0142', parse: (h) => ({ battery: (parseInt(h.slice(0, 2), 16) * 256 + parseInt(h.slice(2, 4), 16)) / 1000 }) },
  { cmd: '0101', parse: (h) => ({ mil: (parseInt(h.slice(0, 2), 16) & 0x80) ? 1 : 0, dtcCount: parseInt(h.slice(0, 2), 16) & 0x7F }) },
];

/**
 * Check if Web Bluetooth is available
 */
export function isBLESupported(): boolean {
  return !!(navigator as any).bluetooth;
}

/**
 * Handle incoming BLE notifications (adapter responses)
 */
function handleNotification(event: Event) {
  const value = (event.target as unknown as BluetoothRemoteGATTCharacteristic).value;
  if (!value) return;

  const decoder = new TextDecoder();
  const chunk = decoder.decode(value);
  responseBuffer += chunk;

  // ELM327 responses end with '>' prompt
  if (responseBuffer.includes('>')) {
    const response = responseBuffer.replace(/>/g, '').trim();
    responseBuffer = '';
    if (responseResolve) {
      responseResolve(response);
      responseResolve = null;
    }
  }
}

/**
 * Send an AT/OBD command via BLE and wait for response
 */
async function sendBLECommand(cmd: string, timeoutMs: number = 3000): Promise<string> {
  if (!txCharacteristic) return '';

  return new Promise((resolve) => {
    responseResolve = resolve;
    responseBuffer = '';

    const encoder = new TextEncoder();
    const data = encoder.encode(cmd + '\r');

    // BLE has a 20-byte MTU limit; most commands fit easily
    txCharacteristic!.writeValue(data).catch(() => {
      resolve('');
    });

    setTimeout(() => {
      if (responseResolve) {
        responseResolve(responseBuffer || '');
        responseResolve = null;
      }
    }, timeoutMs);
  });
}

/**
 * Scan and connect to a BLE OBD-II adapter
 */
export async function connectBLE(
  onStatusChange: (status: BLEConnection) => void
): Promise<boolean> {
  if (!isBLESupported()) {
    connectionState = { status: 'unsupported', deviceName: null, error: 'Web Bluetooth not supported in this browser', isSimulated: false, adapterInfo: null };
    onStatusChange({ ...connectionState });
    return false;
  }

  try {
    connectionState = { status: 'scanning', deviceName: null, error: null, isSimulated: false, adapterInfo: null };
    onStatusChange({ ...connectionState });

    // Request device — browser shows native picker dialog
    device = await (navigator as any).bluetooth.requestDevice({
      // Accept any device with known OBD-II services, or allow all
      filters: KNOWN_SERVICES.map(uuid => ({ services: [uuid] })),
      optionalServices: KNOWN_SERVICES,
    }).catch(async () => {
      // If filtered scan fails, try acceptAllDevices
      return await (navigator as any).bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: KNOWN_SERVICES,
      });
    });

    if (!device) {
      connectionState = { status: 'error', deviceName: null, error: 'No device selected', isSimulated: false, adapterInfo: null };
      onStatusChange({ ...connectionState });
      return false;
    }

    const name = device.name || 'Unknown Device';
    connectionState = { status: 'connecting', deviceName: name, error: null, isSimulated: false, adapterInfo: null };
    onStatusChange({ ...connectionState });

    // Connect to GATT server
    const server = await device.gatt!.connect();

    // Discover services and find the right characteristic
    let foundCharacteristic: BluetoothRemoteGATTCharacteristic | null = null;

    for (const serviceUUID of KNOWN_SERVICES) {
      try {
        const service = await server.getPrimaryService(serviceUUID);
        const characteristics = await service.getCharacteristics();

        for (const char of characteristics) {
          // Look for a writable characteristic that also supports notifications
          const props = char.properties;
          if ((props.write || props.writeWithoutResponse) && (props.notify || props.read)) {
            foundCharacteristic = char;
            break;
          }
          // Fallback: any characteristic in our known list
          if (KNOWN_CHARACTERISTICS.includes(char.uuid)) {
            foundCharacteristic = char;
            break;
          }
        }
        if (foundCharacteristic) break;
      } catch {
        // Service not available on this device, try next
        continue;
      }
    }

    if (!foundCharacteristic) {
      connectionState = { status: 'error', deviceName: name, error: 'No compatible OBD-II characteristic found', isSimulated: false, adapterInfo: null };
      onStatusChange({ ...connectionState });
      return false;
    }

    txCharacteristic = foundCharacteristic;

    // Enable notifications for responses
    if (foundCharacteristic.properties.notify) {
      await foundCharacteristic.startNotifications();
      foundCharacteristic.addEventListener('characteristicvaluechanged', handleNotification);
    }

    // Initialize ELM327
    connectionState = { status: 'initializing', deviceName: name, error: null, isSimulated: false, adapterInfo: null };
    onStatusChange({ ...connectionState });

    await sendBLECommand('ATZ', 4000);    // Reset (takes longer)
    await delay(1500);
    await sendBLECommand('ATE0');          // Echo off
    await sendBLECommand('ATL0');          // Linefeeds off
    await sendBLECommand('ATS0');          // Spaces off
    await sendBLECommand('ATH0');          // Headers off
    await sendBLECommand('ATSP0');         // Auto-detect protocol
    const info = await sendBLECommand('ATI');  // Get adapter info

    connectionState = {
      status: 'connected',
      deviceName: name,
      error: null,
      isSimulated: false,
      adapterInfo: info || `BLE: ${name}`,
    };
    onStatusChange({ ...connectionState });
    startTime = Date.now();

    // Handle disconnection
    device.addEventListener('gattserverdisconnected', () => {
      connectionState = { status: 'disconnected', deviceName: null, error: null, isSimulated: false, adapterInfo: null };
      onStatusChange({ ...connectionState });
      txCharacteristic = null;
    });

    return true;

  } catch (err: any) {
    const msg = err?.message || 'Bluetooth connection failed';
    connectionState = { status: 'error', deviceName: null, error: msg, isSimulated: false, adapterInfo: null };
    onStatusChange({ ...connectionState });
    return false;
  }
}

/**
 * Read a single PID via BLE
 */
async function readPID(cmd: string): Promise<string> {
  const response = await sendBLECommand(cmd, 2000);
  if (!response || response.includes('NO DATA') || response.includes('ERROR') || response.includes('UNABLE')) {
    return '';
  }
  const clean = response.replace(/[\s\r\n]/g, '');
  if (clean.length >= 6) {
    return clean.substring(4);
  }
  return '';
}

/**
 * Poll all PIDs once via BLE
 */
export async function pollAllBLEPIDs(): Promise<void> {
  if (!txCharacteristic) return;

  for (const { cmd, parse } of PIDS) {
    const hex = await readPID(cmd);
    if (hex && hex.length >= 2) {
      try {
        const values = parse(hex);
        Object.assign(rawValues, values);
      } catch {
        // Skip malformed responses
      }
    }
  }
}

/**
 * Build TelemetrySnapshot from real BLE adapter data
 */
function buildSnapshot(): TelemetrySnapshot {
  const r = rawValues;
  const now = Date.now();

  return {
    timestamp: now,
    tb1_maf: r.maf || 0,
    tb2_fuelFlow: (r.maf || 0) * 22,
    tb3_map: r.map || 0,
    tb4_iat: r.iat || 25,
    tb5_throttle: r.throttle || 0,
    tb6_rpm: r.rpm || 0,
    tb7_speed: r.speed || 0,
    tb8_volEff: r.maf && r.rpm ? Math.min(100, (r.maf / (r.rpm * 0.005)) * 100) : 85,
    tb9_afr: 14.7 + (r.stftB1 || 0) * 0.05,
    tb10_baro: 101.3,
    pr1_timing: r.timing || 0,
    pr2_stftB1: r.stftB1 || 0,
    pr3_ltftB1: r.ltftB1 || 0,
    pr4_stftB2: 0,
    pr5_ltftB2: 0,
    pr6_combEff: 95 + (Math.abs(r.stftB1 || 0) < 5 ? 3 : 0),
    pr7_engLoad: r.engineLoad || 0,
    pr8_absLoad: (r.engineLoad || 0) * 0.85,
    fs1_o2UpB1: r.o2B1S1 || 0.45,
    fs2_o2DnB1: 0.72,
    fs5_catTempB1: 420,
    fs7_catEff: 93,
    fs10_driverScore: computeDriverScore(r),
    sl1_coolant: r.coolant || 0,
    sl3_battery: r.battery || 0,
    sl4_runtime: Math.floor((now - startTime) / 1000),
    sl7_mil: !!r.mil,
    sl8_dtcCount: r.dtcCount || 0,
    sl11_degradation: 88,
    mpgInstant: computeMPG(r),
    mpgRecovery: 0,
    governanceMode: computeMode(r),
  };
}

function computeDriverScore(r: Record<string, number>): number {
  let score = 80;
  if ((r.throttle || 0) > 70) score -= 15;
  if ((r.throttle || 0) < 30) score += 10;
  if ((r.speed || 0) > 0 && (r.speed || 0) < 100) score += 5;
  return Math.min(100, Math.max(0, score));
}

function computeMPG(r: Record<string, number>): number {
  if (!r.speed || r.speed < 5 || !r.maf || r.maf < 1) return 0;
  const speedMph = r.speed * 0.621371;
  const gph = r.maf * 0.0805 / 14.7 * 6.17;
  return gph > 0.01 ? Math.min(50, speedMph / gph) : 0;
}

function computeMode(r: Record<string, number>): string {
  if (r.mil) return 'Lifecycle Warning';
  if ((r.engineLoad || 0) > 70) return 'Throughput Alert';
  if (Math.abs(r.stftB1 || 0) > 15) return 'Process Drift';
  if ((r.speed || 0) < 5) return 'Nominal';
  return 'Flow State';
}

/**
 * Main BLE telemetry loop
 */
export function startBLETelemetryLoop(
  onData: (snapshot: TelemetrySnapshot) => void,
  intervalMs: number = 300
): () => void {
  startTime = Date.now();

  const timer = setInterval(async () => {
    if (txCharacteristic && connectionState.status === 'connected' && !connectionState.isSimulated) {
      await pollAllBLEPIDs();
      onData(buildSnapshot());
    } else {
      // Simulated fallback
      onData(simulatedTick());
    }
  }, intervalMs);

  return () => clearInterval(timer);
}

export function disconnectBLE(): void {
  if (device && device.gatt?.connected) {
    device.gatt.disconnect();
  }
  device = null;
  txCharacteristic = null;
  connectionState = { status: 'disconnected', deviceName: null, error: null, isSimulated: false, adapterInfo: null };
}

export function getBLEStatus(): BLEConnection {
  return { ...connectionState };
}

export function enterBLEDemoMode(onStatusChange: (status: BLEConnection) => void): void {
  connectionState = { status: 'connected', deviceName: 'SIMULATED', error: null, isSimulated: true, adapterInfo: 'Demo Mode — 2019 F-150 5.0L V8' };
  onStatusChange({ ...connectionState });
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
