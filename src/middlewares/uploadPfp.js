require('dotenv').config();
const multer = require("multer");

const uploadPfp = multer({
    storage : multer.diskStorage({
        destination : (req,file,cb) => {
            cb(null,'./public/pfp');
        },
        filename : (req,file,cb) => {
            cb(null,Date.now() + file.originalname);
        }
    }),
    limits : {
        fileSize : parseInt(process.env.MAXFS) * 1024 * 1024
    },
    fileFilter : (req,file,cb) => {
        const allowed = /png|jpg|jpeg/;
        const mimeTyped = allowed.test(file.mimetype);
        if(!mimeTyped){
            return cb(new Error('File type not allowed'),false)
        }
        cb(null,true)
    }
}).single('img');

module.exports = uploadPfp;