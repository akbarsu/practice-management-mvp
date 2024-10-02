// Configuration for Google Cloud Vision API
const vision = require('@google-cloud/vision');

// Create a client
const client = new vision.ImageAnnotatorClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

module.exports = client;