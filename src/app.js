require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const sequelize = require("./config/db");

// Routes Folders
const shipRoutes = require("./routes/shipRoutes");
const authRoutes = require("./routes/authRoutes");
const jobExecutionRoutes = require("./routes/jobExecutionRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());

// Routes API
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/ships", shipRoutes);
app.use("/api/auth", authRoutes);
app.use("/jobs-executions", jobExecutionRoutes);

// Sincronizziamo Sequelize con il database
sequelize.sync()
    .then(() => console.log("Database sincronizzato"))
    .catch(err => console.error("Errore di sincronizzazione:", err));

app.get("/api/test-db", async (req, res) => {
    try {
      const [rows] = await db.promise().query("SELECT NOW() as time"); 
      res.json({ status: "success", serverTime: rows[0].time });
    } catch (err) {
      console.error("Errore query:", err);
      res.status(500).json({ error: "Errore connessione al database" });
    }
  });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
