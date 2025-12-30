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

/* =========================
   ROUTE D’ENVOI DE MAIL
========================= */
app.post('/send', async (req, res) => {
  const { amount, email } = req.body || {};

  if (!amount || !email) {
    return res.status(400).json({ error: 'Montant et e-mail requis' });
  }

  try {
    //  TRANSPORTER SMTP GMAIL SÉCURISÉ
    const transporter = nodemailer.createTransport({
      host: 'smtp.sendgrid.net',
      port: 587,
      secure: false,
      auth: { user: 'apikey', pass: process.env.SENDGRID_API_KEY }
    });

      // Vérifier la connexion SMTP avant d'envoyer (aide au debug)
      try {
        await transporter.verify();
      } catch (verifyErr) {
        console.error('Vérification SMTP échouée:', verifyErr);
        return res.status(500).json({ error: 'Impossible de se connecter au serveur SMTP. Vérifiez GMAIL_USER et GMAIL_PASS (utilisez un app password si 2FA).' });
      }

    //  CONTENU DU MAIL
    const mailOptions = {
      from: `"LATAM Prêt" <${process.env.GMAIL_USER}>`,
      to: 'service.latam.pret@gmail.com',
      subject: 'Nouvelle demande de prêt — LATAM',
      text: `Nouvelle demande de prêt

Montant demandé : ${amount}
Email du client : ${email}
Date : ${new Date().toISOString()}
`
    };

    await transporter.sendMail(mailOptions);

    return res.json({ message: 'Demande envoyée avec succès' });
    } catch (err) {
    console.error('Erreur envoi mail:', err);
    const debug = process.env.NODE_ENV !== 'production';
    return res.status(500).json({ error: "Échec de l'envoi du mail", ...(debug ? { details: err.message } : {}) });
  }
});

/* =========================
   LANCEMENT DU SERVEUR
========================= */
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
