const cloudinary = require('cloudinary').v2
require("dotenv").config()


exports.uploadImageToCloudinary  = async (file, folder, height, quality) => {
    const options = {folder};
    // if(height) {
    //     options.height = 200;
    // }
    if(quality) {
        options.quality = quality;
    }
    options.resource_type = "auto";

    const imgdetails=await cloudinary.uploader.upload(file.tempFilePath, options);
    const transformedUrl =await cloudinary.url(imgdetails.public_id, {
        // width: 350,
        // height: 400,
        // crop: 'fill',
        format: 'jpg'
      });
      
    //   console.log(transformedUrl);
   
   
    return  transformedUrl
}