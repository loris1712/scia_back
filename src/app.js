require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const db = require("./config/db");

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());


// Rotte API
app.use("/api/users", require("./routes/userRoutes"));

app.get("/api/test-db", async (req, res) => {
    try {
      const [rows] = await db.promise().query("SELECT NOW() as time"); // Per MySQL
      res.json({ status: "success", serverTime: rows[0].time });
    } catch (err) {
      console.error("Errore query:", err);
      res.status(500).json({ error: "Errore connessione al database" });
    }
  });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
