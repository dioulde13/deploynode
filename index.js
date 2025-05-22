const express = require('express');
const db = require('./db'); // Connexion MySQL

const app = express();
app.use(express.json());

// Route d'accueil (test de connexion)
app.get('/', (req, res) => {
  db.query('SELECT NOW() AS now', (err, results) => {
    if (err) return res.status(500).send('Erreur de requête');
    res.send(`📅 Heure actuelle dans MySQL : ${results[0].now}`);
  });
});

// ✅ Ajouter un utilisateur
app.post('/users', (req, res) => {
  const { nom, prenom, adresse } = req.body;
  if (!nom || !prenom) {
    return res.status(400).json({ message: 'Nom et prénom requis.' });
  }

  const query = 'INSERT INTO users (nom, prenom, adresse) VALUES (?, ?, ?)';
  db.query(query, [nom, prenom, adresse], (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'insertion :', err);
      return res.status(500).json({ message: 'Erreur serveur.' });
    }
    res.status(201).json({ message: 'Utilisateur ajouté.', id: result.insertId });
  });
});

// ✅ Lister les utilisateurs
app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération :', err);
      return res.status(500).json({ message: 'Erreur serveur.' });
    }
    res.status(200).json(results);
  });
});

// Lancer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});
