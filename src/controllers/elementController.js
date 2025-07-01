const { Organizations } = require("aws-sdk");
const { Element, ElemetModel, Ship, Spare, JobExecution, 
  VocalNote, TextNote, PhotographicNote, Parts, OrganizationCompanyNCAGE, User } = require("../models");

const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const BUCKET_NAME = 'scia-project-questit';

const extractS3Key = (url) => {
  if (!url) return null;
  try {
    const u = new URL(url);
    return decodeURIComponent(u.pathname.startsWith('/') ? u.pathname.slice(1) : u.pathname);
  } catch (e) {
    return null;
  }
};

exports.getElement = async (req, res) => {
  try {
    const { element, ship_id } = req.body;

    if (!element || !ship_id) {
      return res.status(400).json({ error: "Missing element or ship_id in request body" });
    }

    // Trova il modello dell'elemento
    const elementModel = await ElemetModel.findOne({
      where: {
        ESWBS_code: element,
        ship_model_id: ship_id,
      },
      raw: true,
    });

    if (!elementModel) {
      return res.status(404).json({ error: "Element model not found" });
    }

    // Trova l'elemento vero e proprio
    const elementData = await Element.findOne({
      where: {
        element_model_id: elementModel.id,
      },
      raw: true,
    });

    if (!elementData) {
      return res.status(404).json({ error: "Element not found" });
    }

    // Trova i ricambi associati
    const spares = await Spare.findAll({
      where: { element_model_id: elementModel.id },
      raw: true,
    });

    // Trova tutte le job execution collegate
    const jobExecutions = await JobExecution.findAll({
      where: { element_eswbs_instance_id: elementData.id },
      raw: true,
    });

    // Per ogni jobExecution, recupera le note collegate
    const jobExecutionIds = jobExecutions.map((job) => job.id);

    const [vocalNotesRaw, textNotes, photographyNotesRaw] = await Promise.all([
      VocalNote.findAll({ where: { id: jobExecutionIds }, raw: true }),
      TextNote.findAll({ where: { id: jobExecutionIds }, raw: true }),
      PhotographicNote.findAll({ where: { id: jobExecutionIds }, raw: true }),
    ]);

    const vocalNotes = await Promise.all(
      vocalNotesRaw.map(async (note) => {
        const key = extractS3Key(note.audio_url);
        if (key) {
          const command = new GetObjectCommand({ Bucket: BUCKET_NAME, Key: key });
          note.audio_url = await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // 1 ora
        }
        return note;
      })
    );

    const photographyNotes = await Promise.all(
      photographyNotesRaw.map(async (note) => {
        const key = extractS3Key(note.image_url);
        if (key) {
          const command = new GetObjectCommand({ Bucket: BUCKET_NAME, Key: key });
          note.image_url = await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // 1 ora
        }
        return note;
      })
    ); 

    const Author = (vocalNotes.length > 0 && vocalNotes[0].author) 
      ? await User.findOne({
          where: { id: vocalNotes[0].author },
          raw: true,
        }) 
      : null;

    const parts = elementModel.Manufacturer_Parts_ID
      ? await Parts.findOne({
          where: { ID: elementModel.Manufacturer_Parts_ID },
          raw: true,
        })
      : null;

    const Organization = parts && parts.OrganizationCompanyNCAGE_ID
      ? await OrganizationCompanyNCAGE.findOne({
          where: { ID: parts.OrganizationCompanyNCAGE_ID },
          raw: true,
        })
      : null;


    return res.status(200).json({
      element: elementData,
      model: elementModel,
      spares,
      jobExecutions,
      parts: parts,
      organization: Organization,
      notes: {
        vocal: vocalNotes,
        text: textNotes,
        photos: photographyNotes,
        author: Author,
      },
    });

  } catch (error) {
    console.error("Error retrieving element with related data:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.addElementTimeWork = async (req, res) => {
  const { id, time } = req.body;

  try {
    const element = await Element.findByPk(id);
    if (!element) {
      return res.status(404).json({ error: "Element not found" });
    }

    element.time_to_work = time; 
    element.updated_at = new Date(); 
    await element.save();

    res.status(200).json({ message: "Element timeWork updated", element });
  } catch (error) {
    console.error("Error updating element timeWork:", error);
    res.status(500).json({ error: "Error updating element timeWork" });
  }
};


exports.updateElement = async (req, res) => {
  const { id } = req.params;
  try {
    const [updatedRows] = await Element.update(req.body, {
      where: { id },
    });

    if (updatedRows === 0) {
      return res.status(404).json({ error: "Element not found" });
    }

    res.json({ message: "Element successfully updated" });
  } catch (error) {
    console.error("Error updating element:", error);
    res.status(500).json({ error: "Error updating element" });
  }
};

exports.getElements = async (req, res) => {
  const { ship_model_id, user_id } = req.params;

  try {
    if (!ship_model_id) {
      return res.status(400).json({ error: "Missing ship_id parameter" });
    }

    const ship = await Ship.findOne({
      where: { id: ship_model_id, user_id: user_id },
    });

    if (!ship) {
      return res.status(404).json({ error: "Ship not found" });
    }

    const flatElements = await ElemetModel.findAll({
      where: { ship_model_id: ship.ship_model_id },
      raw: true,
    });

    if (!flatElements || flatElements.length === 0) {
      return res.status(404).json({ error: "Elements not found" });
    }

    // Funzione per trasformare in albero
    const buildTree = (items, parentId = 0) => {
      return items
        .filter(item => item.parent_element_model_id === parentId)
        .map(item => ({
          id: item.id.toString(),
          name: item.LCN_name,
          code: item.ESWBS_code || undefined,
          children: buildTree(items, item.id),
        }));
    };

    const tree = buildTree(flatElements);

    return res.status(200).json(tree);
  } catch (error) {
    console.error("Error retrieving elements:", error);
    return res.status(500).json({ error: "Server error while retrieving elements" });
  }
};
