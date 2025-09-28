const { UserLogin, User, UserRole, Team, Ship } = require("../../models");
require("dotenv").config();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AWS = require('aws-sdk');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});


const s3 = new AWS.S3();

const BUCKET_NAME = 'scia-project-questit';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

exports.getUsers = async (req, res) => {
  try {
    // Prendi tutti gli utenti con UserLogin, Team, Ships
    const users = await User.findAll({
      attributes: [
        "id",
        "first_name",
        "last_name",
        "profile_image",
        "phone_number",
        "registration_date",
        "bot_id_ita",
        "bot_id_ing",
        "bot_id_esp",
        "team_id",
      ],
      include: [
        { model: UserLogin, as: "login", attributes: ["email"] },
        { model: UserRole, as: "role", attributes: ["role_name", "rank", "type"] },
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
    });

    // Funzione per generare URL firmati S3 (opzionale)
    const extractS3Key = (url) => {
      if (!url) return null;
      try {
        const u = new URL(url);
        return u.pathname.startsWith("/") ? u.pathname.slice(1) : u.pathname;
      } catch (e) {
        return url;
      }
    };

    const formattedUsers = await Promise.all(
      users.map(async (user) => {
        let signedProfileImageUrl = null;
        if (user.profile_image) {
          const profileImageKey = extractS3Key(user.profile_image);
          const command = new GetObjectCommand({
            Bucket: BUCKET_NAME,
            Key: profileImageKey,
          });
          try {
            signedProfileImageUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
          } catch (err) {
            console.warn("Errore generando URL firmato per profile_image:", err);
          }
        }

        return {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.UserLogin?.email || null,
          role: user.role?.role_name || "N/A",
          rank: user.role?.rank || null,
          type: user.role?.type || null,
          profileImage: signedProfileImageUrl,
          phoneNumber: user.phone_number,
          registrationDate: user.registration_date,
          bot_id_ita: user.bot_id_ita,
          bot_id_ing: user.bot_id_ing,
          bot_id_esp: user.bot_id_esp,
          team: user.team ? { id: user.team.id, name: user.team.name } : null,
          teamLeader: user.team?.teamLeader
            ? { firstName: user.team.teamLeader.first_name, lastName: user.team.teamLeader.last_name }
            : null,
          ships: user.ships.map((ship) => ({
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
        };
      })
    );

    res.json(formattedUsers);
  } catch (error) {
    console.error("Errore nel recupero utenti:", error);
    res.status(500).json({ error: "Errore nel recupero utenti" });
  }
};

