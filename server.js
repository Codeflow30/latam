const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const PORT = process.env.PORT || 3000;

app.post('/send', async (req, res) => {
  const { amount, email } = req.body || {};
  if (!amount || !email) return res.status(400).json({ error: 'Montant et e-mail requis' });

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'service.latam.pret@gmail.com',
      subject: 'Nouvelle demande de prêt — LATAM',
      text: `Nouvelle demande de prêt\n\nMontant: ${amount}\nE-mail: ${email}\nDate: ${new Date().toISOString()}`
    };

    await transporter.sendMail(mailOptions);
    return res.json({ message: 'Demande envoyée' });
  } catch (err) {
    console.error('Erreur envoi mail:', err);
    return res.status(500).json({ error: "Échec de l'envoi du mail" });
  }
});

app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
