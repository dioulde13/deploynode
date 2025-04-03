const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send(
    "Vérifiez toutes vos définitions de routes et assurez-vous qu’aucun paramètre n’est vide!"
  );
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
