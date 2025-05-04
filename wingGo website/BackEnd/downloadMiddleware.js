const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const {parseUrl} = require('@smithy/url-parser');
const {hash} = require('@smithy/hash-node');
const {formatUrl} = require('@aws-sdk/util-format-url');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
require('dotenv').config();


// AWS S3 configuration
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });
  


const BUCKET = process.env.AWS_BUCKET_NAME;


const previewgeneratePreSignedUrl = async (key) => {
  const params = {
      Bucket: BUCKET,
      Key: key,
      ResponseContentDisposition: 'inline', // Inline disposition
      ResponseContentType: 'image/jpeg' // Set to the correct MIME type of your image
  };

  const command = new GetObjectCommand(params);
  try {
      const url = await getSignedUrl(s3, command, { expiresIn: 300 }); // 5 minutes
      return url;
  } catch (error) {
      console.error('Error generating pre-signed URL:', error);
      throw new Error('Could not generate pre-signed URL');
  }
};

const generatePreSignedUrl = async (key) => {
  const params = {
    Bucket: BUCKET,
    Key: key,
  };

  const command = new GetObjectCommand(params);
  try {
      const url = await getSignedUrl(s3, command, { expiresIn: 300 }); // 5 minutes
      return url;
    } catch (error) {
      console.error('Error generating pre-signed URL:', error);
      throw new Error('Could not generate pre-signed URL');
    }
};


module.exports = { generatePreSignedUrl, previewgeneratePreSignedUrl};