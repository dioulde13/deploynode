const mysql = require('mysql2');
require('dotenv').config();

// Pool de connexions recommandé pour production
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,  // Tu peux ajuster selon ton besoin
  queueLimit: 0
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Erreur de connexion à MySQL :', err.stack);
  } else {
    console.log('✅ Connecté à MySQL Clever Cloud !');
    connection.release();
  }
});

module.exports = pool;
