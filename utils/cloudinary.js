const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name : process.env.Cloud_Name,
    api_key : process.env.Cloud_api,
    api_secret : process.env.Cloud_secret
})

// cloudinary post img
const cloudinaryupload = async (filetoupload) => {
    try {
      const data = await cloudinary.uploader.upload(filetoupload,{
        resource_type:"auto"
      })
      return data
    } catch (error) {
        return error
    }
}
// cloudinary post img
const cloudinaryremove = async (imagepublicid) => {
    try {
      const result = await cloudinary.uploader.destroy(imagepublicid)
      return result
    } catch (error) {
        throw new Error("Internal server error (Cloudinary)")
    }
}


module.exports = {cloudinaryremove,cloudinaryupload}