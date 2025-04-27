// Binance canlı emir webhook.js

import axios from 'axios'; import crypto from 'crypto';

const BINANCE_API_KEY = process.env.BINANCE_API_KEY; const BINANCE_API_SECRET = process.env.BINANCE_API_SECRET; const BASE_URL = 'https://fapi.binance.com';

function sign(queryString, secret) { return crypto.createHmac('sha256', secret).update(queryString).digest('hex'); }

export default async function handler(req, res) { if (req.method !== 'POST') { return res.status(405).json({ message: 'Sadece POST istekleri kabul edilir.' }); }

try { const { action, symbol, amount, leverage } = req.body;

if (!action || !symbol || !amount || !leverage) {
  return res.status(400).json({ message: 'Eksik parametre var!' });
}

const side = action.toUpperCase() === 'BUY' ? 'BUY' : 'SELL';

// Kaldıraç ayarla
const timestampLev = Date.now();
const levQuery = `symbol=${symbol}&leverage=${leverage}&timestamp=${timestampLev}`;
const levSignature = sign(levQuery, BINANCE_API_SECRET);

await axios.post(`${BASE_URL}/fapi/v1/leverage?${levQuery}&signature=${levSignature}`, {}, {
  headers: { 'X-MBX-APIKEY': BINANCE_API_KEY },
});

// Piyasa emri aç
const timestampOrder = Date.now();
const orderQuery = `symbol=${symbol}&side=${side}&type=MARKET&quantity=${amount}&timestamp=${timestampOrder}`;
const orderSignature = sign(orderQuery, BINANCE_API_SECRET);

const orderResult = await axios.post(`${BASE_URL}/fapi/v1/order?${orderQuery}&signature=${orderSignature}`, {}, {
  headers: { 'X-MBX-APIKEY': BINANCE_API_KEY },
});

console.log('Binance emir sonucu:', orderResult.data);
res.status(200).json({ message: 'Emir gönderildi!', result: orderResult.data });

} catch (error) { console.error('Hata:', error.response ? error.response.data : error.message); res.status(500).json({ message: 'Emir gönderilemedi!', error: error.message }); } }

