const express=require("express")
const router = express.Router();    
const adminvalidation = require("../Core/Validation/adminValidation");
const validateMW = require("../Core/Validation/validateMW");
const controller = require("../Controller/adminController");
const multer = require("multer");
const path = require("path");

const upload = multer({ 
    fileFilter: (request, file, cb) => {
        if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
            cb(null, true);
        } else {
            cb(new Error("file should be Image only."));
        }
    } ,
    storage: multer.diskStorage({
        destination:(request, file, cb) => {
            cb(null, path.join(__dirname,"..","images","admin"));
        },
        filename: (request, file, cb) => {
            let ext = path.extname(file.originalname);
            let fileName = path.basename(file.originalname, ext);
            let finalName =  file.fieldname + '-' + fileName + '-' + Date.now() + ext
            cb(null, finalName);
        }
    }),
});

const lol = (req,res,next)=>{
    console.log(req.body)
    console.log(req.file)
    console.log(controller.addAdmin)
    
    next();
}

router
    .route("/admin")
    .get(controller.getAllAdmins)
    .post(upload.single('image'),adminvalidation.post, validateMW ,lol,controller.addAdmin)
    .patch(upload.single('image'),adminvalidation.update ,validateMW ,controller.updateAdmin)
    .delete(adminvalidation.delete ,validateMW ,controller.deleteAdmin);

module.exports = router;