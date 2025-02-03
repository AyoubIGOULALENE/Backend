const path = require('path')
const multer = require("multer")


const photostorage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,path.join(__dirname,'../images'))
    },
    filename:(req,file,cb) => {
        if(file){
            cb(null,new Date().toISOString().replace(/:/g , '-') + file.originalname )
        }else{
            cb(null,false)
        }
    }
})

//photoupload
const photoupload = multer({
    storage:photostorage,
    fileFilter:(req,file,cb) => {
        if(file.mimetype.startsWith("image")){
            cb(null,true)
        }else{
            cb({message : "unsupported file format"},false)
        }
    },
    limits:{fileSize: 1024 * 1024 * 30}
})
/*--------------------------------------------*/
const furphotostorage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,path.join(__dirname,'../images'))
    },
    filename:(req,file,cb) => {
        if(file){
            cb(null,new Date().toISOString().replace(/:/g , '-') + file.originalname )
        }else{
            cb(null,false)
        }
    }
})

//photoupload
const furphotoupload = multer({
    storage:furphotostorage,
    fileFilter:(req,file,cb) => {
        if(file.mimetype.startsWith("image")){
            cb(null,true)
        }else{
            cb({message : "unsupported file format"},false)
        }
    },
    limits:{fileSize: 1024 * 1024 * 30}
})

module.exports = {photoupload,furphotoupload}