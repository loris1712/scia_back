require('dotenv').config();
var pjson = require('../../package.json');
const logger = require('../../logger')

const { UserLogin, User, UserRole, Team, RanksMarine, Ship } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AWS = require('aws-sdk');
const path = require('path');
const fs = require('fs');
const multer = require('multer');


AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

const BUCKET_NAME = 'scia-project-questit';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

exports.getProfile = async (req, res) => {
  // Prendi token da header Authorization (formato: "Bearer <token>")
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: Token missing" });
  }

  const token = authHeader.split(" ")[1]; // prendi solo il token

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const userLogin = await UserLogin.findOne({
      where: { user_id: decoded.userId },
      attributes: ["email"],
      include: {
        model: User,
        as: "user",
        attributes: [
          "id",
          "first_name",
          "last_name",
          "profile_image",
          "phone_number",
          "registration_date",
          "team_id",
          "bot_id_ita",
          "bot_id_ing",
        ],
        include: [
          {
            model: Team,
            as: "team",
            attributes: ["id", "name", "team_leader_id"],
            include: [
              {
                model: User,
                as: "teamLeader",
                attributes: ["first_name", "last_name"],
              },
            ],
          },
          {
            model: Ship,
            as: "ships",
            attributes: [
              "id",
              "ship_model_id",
              "fleet_id",
              "model_code",
              "unit_name",
              "unit_code",
              "launch_date",
              "delivery_date",
              "Side_ship_number",
            ],
          },
        ],
      },
    });

    if (!userLogin || !userLogin.user) {
      return res.status(404).json({ error: "User not found" });
    }

    const {
      id,
      first_name,
      last_name,
      profile_image,
      phone_number,
      registration_date,
      team,
      bot_id_ita,
      bot_id_ing,
      ships,
    } = userLogin.user;
    const { email } = userLogin;

    const userRole = await UserRole.findOne({ where: { user_id: id } });

    if (!userRole) {
      return res.status(404).json({ error: "Role not found" });
    }

    res.json({
      id,
      firstName: first_name,
      lastName: last_name,
      rank: userRole.rank,
      type: userRole.type,
      role: userRole.role_name || "N/A",
      profileImage: profile_image,
      email,
      phoneNumber: phone_number,
      registrationDate: registration_date,
      bot_id_ing,
      bot_id_ita,
      team: team ? { id: team.id, name: team.name } : null,
      teamLeader: team?.teamLeader
        ? { firstName: team.teamLeader.first_name, lastName: team.teamLeader.last_name }
        : null,
      ships: ships.map((ship) => ({
        id: ship.id,
        shipModelId: ship.ship_model_id,
        fleetId: ship.fleet_id,
        modelCode: ship.model_code,
        unitName: ship.unit_name,
        unitCode: ship.unit_code,
        launchDate: ship.launch_date,
        deliveryDate: ship.delivery_date,
        sideShipNumber: ship.Side_ship_number,
      })),
    });
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ error: "Invalid token" });
  }
};

exports.getProfileById = async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const requestedUserId = req.params.id;

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY); // puoi usare decoded.userId se vuoi limitare accesso

    const userLogin = await UserLogin.findOne({
      where: { user_id: requestedUserId },
      attributes: ["email"],
      include: {
        model: User,
        as: "user",
        attributes: [
          "id",
          "first_name",
          "last_name",
          "profile_image",
          "phone_number",
          "registration_date",
          "team_id",
        ],
        include: [
          {
            model: Team,
            as: "team",
            attributes: ["id", "name", "team_leader_id"],
            include: [
              {
                model: User,
                as: "teamLeader",
                attributes: ["first_name", "last_name"],
              },
            ],
          },
        ],
      },
    });

    if (!userLogin || !userLogin.user) {
      return res.status(404).json({ error: "User not found" });
    }

    const {
      id,
      first_name,
      last_name,
      profile_image,
      phone_number,
      registration_date,
      team,
    } = userLogin.user;
    const { email } = userLogin;

    const userRole = await UserRole.findOne({ where: { user_id: id } });

    if (!userRole) {
      return res.status(404).json({ error: "Role not found" });
    }

    res.json({
      id,
      firstName: first_name,
      lastName: last_name,
      rank: userRole.rank,
      type: userRole.type,
      role: userRole.role_name,
      profileImage: profile_image,
      email,
      phoneNumber: phone_number,
      registrationDate: registration_date,
      team: team ? { id: team.id, name: team.name } : null,
      teamLeader: team?.teamLeader
        ? { firstName: team.teamLeader.first_name, lastName: team.teamLeader.last_name }
        : null,
    });
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ error: "Invalid token" });
  }
};

exports.updateProfile = async (req, res) => {
  const { userId, firstName, lastName, email, phoneNumber, rank } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.update({
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
    });

    // Aggiorna la email (se presente)
    if (email) {
      await UserLogin.update({ email }, { where: { user_id: userId } });
    }

    if (rank) {
      await UserRole.update({ rank }, { where: { user_id: userId } });
    }

    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}; 

exports.uploadProfileImage = async (req, res) => {
  const userId = req.body.userId;
  const file = req.file;

  console.log("File ricevuto:", file);
  console.log("Body ricevuto:", req.body);

  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const fileName = `profile_images/${userId}.jpg`;

  const params = {
    Bucket: BUCKET_NAME,
    Key: fileName,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    const uploadResult = await s3.upload(params).promise();
    const imageUrl = uploadResult.Location;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.update({ profile_image: imageUrl });

    res.status(200).json({
      message: "Immagine caricata con successo e aggiornata nel DB",
      url: imageUrl,
    });
  } catch (error) {
    console.error("Errore upload su S3 o aggiornamento DB:", error);
    res.status(500).json({ error: "Errore nel caricamento dell'immagine" });
  }
};

exports.getRanks = async (req, res) => {
  try {
    const ranks = await RanksMarine.findAll();
    res.status(200).json(ranks);
  } catch (error) {
    console.error('Errore nel recupero dei gradi:', error);
    res.status(500).json({ error: 'Errore nel recupero dei dati' });
  }
};

exports.getAPIbackend = async (req, res) => {

  try {
    res.json({
      version: pjson.version,
    });
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ error: "Invalid token" });
  }
};

exports.getLogs = (req, res) => {
  const logType = req.query.type === 'error' ? 'error.log' : 'combined.log';
  const logPath = path.join(process.cwd(), logType);

  fs.readFile(logPath, 'utf8', (err, data) => {
    if (err) {
      logger.error(`Impossibile leggere il file di log: ${logType}`, { error: err });
      return res.status(500).json({ message: 'Errore durante la lettura dei log.', error: err.message });
    }

    try {
      const logs = data
        .split('\n')
        .filter(line => line.trim() !== '') 
        .map(line => JSON.parse(line));
      res.json(logs.reverse());
    } catch (parseErr) {
      logger.error(`Errore nel parsing dei log: ${logType}`, { error: parseErr });
      res.status(500).json({ message: 'Errore durante il parsing dei log.', error: parseErr.message });
    }
  });
};
