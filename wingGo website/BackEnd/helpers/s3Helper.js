const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

require('dotenv').config(); // Load environment variables from .env file

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });
  
  const BUCKET = process.env.AWS_BUCKET_NAME;
  
  const uploadDocument = async (file) => {
    const params = {
      Bucket: BUCKET,
      Key: `${Date.now()}_${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };
  
    const command = new PutObjectCommand(params);
    await s3.send(command);
  
    return `https://${BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
  };
  
  module.exports = { uploadDocument };