const cloudinary = require('cloudinary').v2;
// Configuration (supports lowercase and uppercase env var names)
const cloudName = process.env.cloud_name || process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUD_NAME;
const apiKey = process.env.cloud_api_key || process.env.CLOUDINARY_API_KEY || process.env.CLOUD_API_KEY;
const apiSecret = process.env.cloud_api_secret || process.env.CLOUDINARY_API_SECRET || process.env.CLOUD_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
  console.warn('Cloudinary configuration missing: set cloud_name, cloud_api_key, and cloud_api_secret in .env');
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});
module.exports = cloudinary;



