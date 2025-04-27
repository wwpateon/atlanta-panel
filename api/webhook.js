// Patronum, yeni kod bu sekilde olacak. Sonra "Commit Changes" ye basman lazim!

export default async function handler(req, res) { if (req.method === 'POST') { console.log("Gelen Webhook:", req.body); res.status(200).json({ message: 'Webhook alındı!' }); } else { res.status(405).json({ message: 'Sadece POST isteği kabul ediliyor.' }); } }

