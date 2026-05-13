import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// API Endpoints
app.post('/api/opt-in', async (req, res) => {
  const { phone, consent } = req.body;
  
  if (!consent) {
    return res.status(400).json({ error: "Explicit TCPA consent is required." });
  }
  if (!phone || phone.length < 10) {
    return res.status(400).json({ error: "Invalid phone number." });
  }
  
  // In production, instantiate Twilio using process.env.TWILIO_ACCOUNT_SID
  // await twilioClient.messages.create({ ... })
  console.log(`[Lume-Auto API] Secured Opt-In for ${phone}. Consent: ${consent}`);
  
  res.status(200).json({ success: true, message: "Successfully joined the deterministic governance waitlist." });
});

// Serve static React app in production
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Lume-Auto Web Service running on port ${PORT}`);
});
