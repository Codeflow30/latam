LATAM — Page vitrine et demande de prêt

Installation

1. Ouvrez un terminal dans le dossier du projet (c:\Users\Déo SOGBAVI\LATAM).
2. Créez un fichier `.env` avec les variables suivantes:

GMAIL_USER=votre.adresse@gmail.com
GMAIL_PASS=votre_mot_de_passe_app (ou mot de passe d'application Gmail)

3. Installez les dépendances et lancez le serveur:

```powershell
npm install
npm run start
```

Notes
- Le serveur sert `index.html` à la racine et expose une route POST `/send` qui envoie un e-mail à `service.latam.pret@gmail.com` contenant le montant et l'e-mail fournis par l'utilisateur.
- Pour Gmail, il est recommandé d'utiliser un mot de passe d'application (App Password) si l'authentification à deux facteurs est activée.
- Variables d'environnement attendues: `GMAIL_USER`, `GMAIL_PASS`, optionnellement `PORT`.

Test local
- Ouvrez le navigateur sur `http://localhost:3000` et utilisez le bouton "Demander un prêt".
- Vérifiez le terminal pour les logs et votre boîte de réception `service.latam.pret@gmail.com` pour la réception.

Sécurité
- Ne stockez jamais de mots de passe réels dans le dépôt. Utilisez `.env` et gardez-le hors du contrôle de version.

