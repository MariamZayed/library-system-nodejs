const express=require("express")
const router = express.Router();    
const childValidation = require("../Core/Validation/adminvalidation");
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

router
    .route("/admin")
    .get(controller.getAllteachers)
    .post(upload.single('image'),childValidation.post, validateMW ,controller.addAdmin)
    .patch(upload.single('image'),childValidation.update ,validateMW ,controller.updateAdmin)
    .delete(childValidation.delete ,validateMW ,controller.deleteAdmin);

module.exports = router;