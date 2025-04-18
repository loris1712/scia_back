require('dotenv').config(); // Carica le variabili d'ambiente prima di tutto

const { UserLogin, User, UserRole, Team, RanksMarine } = require("../models");
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
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

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
      id: id,
      firstName: first_name,
      lastName: last_name,
      rank: userRole ? userRole.rank : null,
      type: userRole ? userRole.type : null,
      role: userRole ? userRole.role_name : "N/A",
      profileImage: profile_image,
      email: email,
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
