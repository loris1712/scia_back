require('dotenv').config();

const { Task, recurrencyType, Element, PhotographicNote, VocalNote, TextNote } = require("../models");
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

exports.uploadPhoto = async (req, res) => {
  const { failureId } = req.body;
  const file = req.file;

  console.log(failureId)

  console.log(file)

  if (!file) {
    return res.status(400).json({ error: "No photo uploaded" });
  }

  const fileName = `shipsFiles/${Date.now()}_${failureId}_${file.originalname}`;

  const params = {
    Bucket: BUCKET_NAME,
    Key: fileName,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    const uploadResult = await s3.upload(params).promise();
    const photoUrl = uploadResult.Location;

    const newNote = await PhotographicNote.create({
      failure_id: failureId,
      image_url: photoUrl,
      timestamp: new Date(),
    });

    res.status(201).json({
      message: "Nota fotografica caricata con successo",
      note: newNote,
    });
  } catch (error) {
    console.error("Errore upload foto:", error);
    res.status(500).json({ error: "Errore nel caricamento della nota fotografica" });
  }
};

exports.uploadAudio = async (req, res) => {
  const { failureId } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: "No audio uploaded" });
  }

  const fileName = `shipsFiles/${Date.now()}_${failureId}_${file.originalname}`;

  const params = {
    Bucket: BUCKET_NAME,
    Key: fileName,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    const uploadResult = await s3.upload(params).promise();
    const audioUrl = uploadResult.Location;

    const newNote = await VocalNote.create({
      failure_id: failureId,
      audio_url: audioUrl,
      timestamp: new Date(),
    });

    res.status(201).json({
      message: "Nota vocale caricata con successo",
      note: newNote,
    });
  } catch (error) {
    console.error("Errore upload audio:", error);
    res.status(500).json({ error: "Errore nel caricamento della nota vocale" });
  }
};

exports.uploadTextNote = async (req, res) => {
  try {
    const { failureId, content } = req.body;

    if (!failureId || !content) {
      return res.status(400).json({ error: "failureId e content sono obbligatori" });
    }

    const newTextNote = await TextNote.create({
      failure_id: failureId,
      text_field: content,
    });

    res.status(201).json({
      message: "Nota testuale salvata con successo",
      note: newTextNote,
    });
  } catch (error) {
    console.error("Errore nel salvataggio della nota testuale:", error);
    res.status(500).json({ error: "Errore nel salvataggio della nota testuale" });
  }
};