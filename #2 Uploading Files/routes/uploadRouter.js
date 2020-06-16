const express = require('express')
const multer = require('multer')

const storage = multer.diskStorage({
    
    destination: (req,file,cb)=>{
        cb(null,'public/images')
    },

    filename: (req,file,cb)=>{
        cb(null, file.originalname)
    }
})

const imageFileFilter = (req,file,cb)=>{
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif|)$/)){
        return cb(new Error('You can upload only image files'),false)
    }
    cb(null,true)
}

const upload = multer({storage:storage, fileFilter: imageFileFilter})


const app = express()

app.post('/',upload.single('imageFile'),(req,res,next)=>{

    //file object contains information about where file is stored on server to get in future
    res.json(req.file)
})

module.exports = app