// Patronum, bu kod canlı Binance Futures emirleri için! // Sadece buraya yapıştır ve Commit yap, emirler geleceğiz gibi açılacak!

import axios from 'axios';

export default async function handler(req, res) { if (req.method !== 'POST') { return res.status(405).json({ message: 'Sadece POST isteği kabul ediliyor.' }); }

const { action, symbol, amount, leverage, tp, sl } = req.body;

if (!action || !symbol || !amount || !leverage || !tp || !sl) { return res.status(400).json({ message: 'Eksik veri gönderildi.' }); }

const apiKey = process.env.BINANCE_API_KEY; const apiSecret = process.env.BINANCE_API_SECRET;

if (!apiKey || !apiSecret) { return res.status(500).json({ message: 'API anahtarları eksik.' }); }

try { const timestamp = Date.now(); const query = symbol=${symbol}&side=${action.toUpperCase()}&type=MARKET&quantity=${amount}&timestamp=${timestamp};

const signature = crypto
  .createHmac('sha256', apiSecret)
  .update(query)
  .digest('hex');

const response = await axios.post(
  'https://fapi.binance.com/fapi/v1/order',
  query + `&signature=${signature}`,
  {
    headers: { 'X-MBX-APIKEY': apiKey },
  }
);

console.log('Emir Başarılı: ', response.data);
res.status(200).json({ message: 'Emir gönderildi.', data: response.data });

} catch (error) { console.error('Emir Hatası:', error.response?.data || error.message); res.status(500).json({ message: 'Emir gönderilirken hata oldu.', error: error.response?.data || error.message }); } }


