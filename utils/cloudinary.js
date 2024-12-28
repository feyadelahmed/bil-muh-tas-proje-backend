const cloudinary = require("cloudinary").v2;

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const transformations = [
  {quality: 'auto'},
  {fetch_format: 'auto'},
  {width: 1200},
];

async function upload(resim) {

  const uploadResult = await new Promise((resolve) => {
    cloudinary.uploader.upload_stream((error, uploadResult) => {
      return resolve(uploadResult);
    }).end(resim.buffer);
  });

  const url = await cloudinary.url(uploadResult.public_id, {
    fetch_format: 'auto',
    quality: 'auto',
  });

  return url;
}

module.exports = {
  upload,
};