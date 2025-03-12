require("dotenv").config();
const { Sequelize } = require("sequelize");

// Creiamo un'istanza di Sequelize con le variabili d'ambiente
const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: false, // Disabilita i log SQL (opzionale)
  }
);

// Funzione per testare la connessione
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("✅ Connesso a MySQL con Sequelize!");
  } catch (err) {
    console.error("❌ Errore connessione Sequelize:", err);
  }
}

testConnection();

module.exports = sequelize;
