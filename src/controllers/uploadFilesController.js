require('dotenv').config();

const { User, PhotographicNote, VocalNote, TextNote } = require("../models");
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
  const { failureId, authorId, type } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: "No photo uploaded" });
  }

  const fileName = `shipsFiles/${Date.now()}_${failureId}_${file.originalname}`;

  const params = {
    Bucket: BUCKET_NAME,
    Key: fileName,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'public-read'
  };

  try {
    const uploadResult = await s3.upload(params).promise();
    const photoUrl = uploadResult.Location;

    const newNote = await PhotographicNote.create({
      failure_id: failureId,
      image_url: photoUrl,
      created_at: new Date(),
      author: authorId,
      type: type
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
  const { failureId, authorId, type } = req.body;
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
      created_at: new Date(),
      author: authorId,
      type: type
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
    const { failureId, content, authorId, type } = req.body;

    if (!failureId || !content) {
      return res.status(400).json({ error: "failureId e content sono obbligatori" });
    }

    const newTextNote = await TextNote.create({
      failure_id: failureId,
      text_field: content,
      author: authorId,
      type: type
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

exports.getAudios = async (req, res) => {
  try {
    const { failureId, type } = req.params;

    if (!failureId) {
      return res.status(400).json({ error: "failureId è obbligatorio" });
    }

    const audios = await VocalNote.findAll({
      where: { failure_id: failureId, type: type },
      include: [
        {
          model: User,
          as: 'authorDetails',
        }
      ],
    });

    res.status(200).json({
      message: "Note vocali recuperate con successo",
      notes: audios,
    });
  } catch (error) {
    console.error("Errore nel recupero delle note vocali:", error);
    res.status(500).json({ error: "Errore nel recupero delle note vocali" });
  }
};

exports.getTextNotes = async (req, res) => {
  try {
    const { failureId, type } = req.params;

    if (!failureId) {
      return res.status(400).json({ error: "failureId è obbligatorio" });
    }

    const texts = await TextNote.findAll({
      where: { failure_id: failureId, type: type },
      include: [
        {
          model: User,
          as: 'authorDetails',
        }
      ],
    });

    res.status(200).json({
      message: "Note testuali recuperate con successo",
      notes: texts,
    });
  } catch (error) {
    console.error("Errore nel recupero delle note testuali:", error);
    res.status(500).json({ error: "Errore nel recupero delle note testuali" });
  }
};

exports.getPhotos = async (req, res) => {
  try {
    const { failureId, type } = req.params;

    if (!failureId) {
      return res.status(400).json({ error: "failureId è obbligatorio" });
    }

    const photos = await PhotographicNote.findAll({
      where: { failure_id: failureId, type: type },
      include: [
        {
          model: User,
          as: 'authorDetails',
        }
      ],
    });

    res.status(200).json({
      message: "Note fotografiche recuperate con successo",
      notes: photos,
    });
  } catch (error) {
    console.error("Errore nel recupero delle note fotografiche:", error);
    res.status(500).json({ error: "Errore nel recupero delle note fotografiche" });
  }
};


//General

exports.uploadPhotoGeneral = async (req, res) => {
  const { failureId, authorId, type } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: "No photo uploaded" });
  }

  const fileName = `shipsFiles/${Date.now()}_${failureId}_${file.originalname}`;

  const params = {
    Bucket: BUCKET_NAME,
    Key: fileName,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'public-read'
  };

  try {
    const uploadResult = await s3.upload(params).promise();
    const photoUrl = uploadResult.Location;

    const newNote = await PhotographicNote.create({
      task_id: failureId,
      image_url: photoUrl,
      created_at: new Date(),
      author: authorId,
      type: type
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

exports.uploadAudioGeneral = async (req, res) => {
  const { failureId, authorId, type } = req.body;
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
      task_id: failureId,
      audio_url: audioUrl,
      created_at: new Date(),
      author: authorId,
      type: type
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

exports.uploadTextNoteGeneral = async (req, res) => {
  try {
    const { failureId, content, authorId, type } = req.body;

    if (!failureId || !content) {
      return res.status(400).json({ error: "failureId e content sono obbligatori" });
    }

    const newTextNote = await TextNote.create({
      task_id: failureId,
      text_field: content,
      author: authorId,
      type: type
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

exports.getAudiosGeneral = async (req, res) => {
  try {
    const { failureId, type } = req.params;

    if (!failureId) {
      return res.status(400).json({ error: "failureId è obbligatorio" });
    }

    const audios = await VocalNote.findAll({
      where: { task_id: failureId, type: type },
      include: [
        {
          model: User,
          as: 'authorDetails',
        }
      ],
    });

    res.status(200).json({
      message: "Note vocali recuperate con successo",
      notes: audios,
    });
  } catch (error) {
    console.error("Errore nel recupero delle note vocali:", error);
    res.status(500).json({ error: "Errore nel recupero delle note vocali" });
  }
};

exports.getTextNotesGeneral = async (req, res) => {
  try {
    const { failureId, type } = req.params;

    if (!failureId) {
      return res.status(400).json({ error: "failureId è obbligatorio" });
    }

    const texts = await TextNote.findAll({
      where: { task_id: failureId, type: type },
      include: [
        {
          model: User,
          as: 'authorDetails',
        }
      ],
    });

    console.log(texts)

    res.status(200).json({
      message: "Note testuali recuperate con successo",
      notes: texts,
    });
  } catch (error) {
    console.error("Errore nel recupero delle note testuali:", error);
    res.status(500).json({ error: "Errore nel recupero delle note testuali" });
  }
};

exports.getPhotosGeneral = async (req, res) => {
  try {
    const { failureId, type } = req.params;

    if (!failureId) {
      return res.status(400).json({ error: "failureId è obbligatorio" });
    }

    const photos = await PhotographicNote.findAll({
      where: { task_id: failureId, type: type },
      include: [
        {
          model: User,
          as: 'authorDetails',
        }
      ],
    });

    res.status(200).json({
      message: "Note fotografiche recuperate con successo",
      notes: photos,
    });
  } catch (error) {
    console.error("Errore nel recupero delle note fotografiche:", error);
    res.status(500).json({ error: "Errore nel recupero delle note fotografiche" });
  }
};
