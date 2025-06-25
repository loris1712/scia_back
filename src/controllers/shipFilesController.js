const { ShipFiles } = require('../models');
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

exports.getFiles = async (req, res) => {
  try {
    const { ship_id, user_id } = req.query;

    if (!ship_id || !user_id) {
      return res.status(400).json({ error: 'Il parametro ship_id è obbligatorio.' });
    }

    const files = await ShipFiles.findAll({
      where: { ship_id, user_id },
      order: [['uploaded_at', 'DESC']],
    });

    const signedFiles = await Promise.all(
      files.map(async (file) => {
        let signedUrl = null;
        const key = extractS3Key(file.file_link);

        if (key) {
          const command = new GetObjectCommand({
            Bucket: BUCKET_NAME,
            Key: key,
          });

          try {
            signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
          } catch (err) {
            console.warn("Errore generando signed URL per file_link:", err);
            signedUrl = file.file_link; // fallback
          }
        }

        return {
          ...file.toJSON(),
          file_link: signedUrl,
        };
      })
    );

    res.status(200).json({ files: signedFiles });
  } catch (error) {
    console.error('Errore nel recupero dei file:', error);
    res.status(500).json({ error: 'Errore nel recupero dei file.' });
  }
};