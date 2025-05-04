const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3Client } = require('@aws-sdk/client-s3');
require('dotenv').config();

const app = express();
const port = 3000;



const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });
const BUCKET = process.env.AWS_BUCKET_NAME;

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: BUCKET,
    key: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    }
  })
});

app.post('/upload', upload.single('file'), (req, res) => {
  res.send('File uploaded successfully');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});