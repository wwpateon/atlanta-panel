// Binance API ile gelen webhook BUY/SELL emirlerini otomatik işleme alır.

import axios from 'axios';

const API_KEY = process.env.BINANCE_API_KEY; const API_SECRET = process.env.BINANCE_API_SECRET;

export default async function handler(req, res) { if (req.method !== 'POST') { return res.status(405).json({ message: 'Sadece POST isteği kabul edilir.' }); }

const { action, symbol, amount, leverage, tp, sl } = req.body;

if (!action || !symbol || !amount || !leverage) { return res.status(400).json({ message: 'Eksik parametre.' }); }

try { const side = action.toLowerCase() === 'buy' ? 'BUY' : 'SELL';

// Emri örnek olarak logluyoruz (gerçekte Binance API'ye emir gönderilecek)
console.log(`Emir alındı: ${side} - ${symbol} - Miktar: ${amount} - Kaldıraç: ${leverage}x`);

// Binance'a emir göndermek istesek burada axios ile bir POST yapılır
// Örnek:
// await axios.post('https://api.binance.com/fapi/v1/order', {...}, { headers: {...} })

return res.status(200).json({ message: 'Emir kaydedildi.' });

} catch (error) { console.error('Emir işlenemedi:', error); return res.status(500).json({ message: 'Sunucu hatası.' }); } }



