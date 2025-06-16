require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const sequelize = require("./config/db");
const logger = require('../logger');

logger.info('Applicazione avviata');
logger.error('Errore di test');

const shipRoutes = require("./routes/shipRoutes");
const authRoutes = require("./routes/authRoutes");
const jobExecutionRoutes = require("./routes/jobExecutionRoutes");
const elementRoutes = require("./routes/elementsRoutes");
const profileRoutes = require("./routes/profileRoutes");
const maintenanceRoutes = require("./routes/maintenanceRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const spareRoutes = require("./routes/sparesRoutes");
const checklistRoutes = require("./routes/checklistRoutes");
const facilitiestRoutes = require("./routes/facilitiesRoutes");
const cartRoutes = require("./routes/cartRoutes");
const locationsRoutes = require("./routes/locationsRoutes");
const shipFilesRoutes = require("./routes/shipFilesRoutes");
const readingsRoutes = require("./routes/readingsRoutes");
const scansRoutes = require("./routes/scansRoutes");
const failuresRoutes = require("./routes/failuresRoutes");
const uploadFilesRoutes = require("./routes/uploadFilesRoutes");

const app = express();

const cookieParser = require("cookie-parser");

app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://52.59.162.108:3000",
  "https://scia-frontend.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS: " + origin));
    }
  },
  credentials: true,
}));

app.use(helmet());
app.use(compression());
app.use(express.json());

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/ships", shipRoutes);
app.use("/api/auth", authRoutes); 
app.use("/jobs-executions", jobExecutionRoutes);
app.use("/api/element", elementRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/spare", spareRoutes);
app.use("/api/checklist", checklistRoutes);
app.use("/api/facilities", facilitiestRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/locations", locationsRoutes);
app.use("/api/shipFiles", shipFilesRoutes);
app.use("/api/readings", readingsRoutes);
app.use("/api/scans", scansRoutes);
app.use("/api/failures", failuresRoutes);
app.use("/api/uploadFiles", uploadFilesRoutes);
 
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
