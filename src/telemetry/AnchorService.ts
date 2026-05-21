/**
 * Lume Scan — Cryptographic Report Anchoring
 * 
 * Computes SHA-256 hash of condition reports and anchors them
 * to the Trust Layer Ledger (TLL) for public verification.
 * 
 * The hash is computed client-side using the Web Crypto API.
 * The anchoring POST is fire-and-forget — the hash is the proof,
 * not the API response.
 */

export interface AnchorResult {
  hash: string;           // SHA-256 hex digest
  timestamp: string;      // ISO 8601
  anchoredTo: 'TLL' | 'local';
  certificateId: string;  // UUID
  status: 'anchored' | 'pending' | 'local-only';
}

// TLL API
const TLL_API_URL = 'https://dwtl.io/api';

/**
 * Compute SHA-256 hash of any object.
 * Uses the Web Crypto API (available in all modern browsers).
 */
export async function computeSHA256(data: any): Promise<string> {
  const json = JSON.stringify(data, null, 0); // Deterministic serialization
  const encoder = new TextEncoder();
  const buffer = encoder.encode(json);
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Generate a certificate ID (UUID v4)
 */
function generateCertId(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Anchor a condition report to the appropriate ledger.
 * 
 * Flow:
 * 1. Serialize the report deterministically
 * 2. Compute SHA-256 hash
 * 3. POST to CAL (enterprise) or VET (external verification)
 * 4. Return the anchor result with hash + certificate ID
 * 
 * If the ledger is unreachable, returns local-only status
 * with the hash still computed. The hash IS the proof —
 * the ledger is the witness.
 */
export async function anchorReport(report: any, context?: {
  vin?: string;
  facilityId?: string;
  agentId?: string;
}): Promise<AnchorResult> {
  const certId = generateCertId();
  const timestamp = new Date().toISOString();

  // Build the canonical report object for hashing
  const canonical = {
    ...report,
    certificateId: certId,
    anchorTimestamp: timestamp,
    vin: context?.vin || report.vin || 'UNKNOWN',
    facilityId: context?.facilityId || 'FIELD',
    version: '1.0.0',
  };

  // Compute hash
  const hash = await computeSHA256(canonical);

  // Determine target
  const targetUrl = TLL_API_URL;
  const anchoredTo = 'TLL' as const;

  // Attempt to anchor
  try {
    const endpoint = `${targetUrl}/submit/condition`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        facilityId: context?.facilityId || 'FIELD-001',
        agentId: context?.agentId || 'LUME-AUTO',
        vin: context?.vin || report.vin || 'UNKNOWN',
        hash,
        certificateId: certId,
        timestamp,
        overallHealth: report.overallHealth,
        laneReady: report.laneReady,
        dtcCount: report.sections?.find((s: any) => s.name === 'Electrical')?.items?.find((i: any) => i.label?.includes('DTC'))?.value || '0',
        summary: report.summary,
        nodeCount: 42,
        primitiveCount: 4,
        deterministic: true,
      }),
    });

    if (response.ok) {
      return { hash, timestamp, anchoredTo, certificateId: certId, status: 'anchored' };
    }
    // API responded but with error — still have the hash
    return { hash, timestamp, anchoredTo, certificateId: certId, status: 'pending' };
  } catch {
    // Network error — ledger unreachable, hash is still valid
    return { hash, timestamp, anchoredTo: 'local', certificateId: certId, status: 'local-only' };
  }
}

/**
 * Verify a report against a known hash.
 * Recomputes the hash and compares.
 */
export async function verifyReport(report: any, expectedHash: string): Promise<boolean> {
  const computed = await computeSHA256(report);
  return computed === expectedHash;
}
