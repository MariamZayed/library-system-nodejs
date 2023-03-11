const express=require("express")
const router = express.Router();    
const basicAdminvalidation = require("../Core/Validation/basicAdminValidation");
const validateMW = require("../Core/Validation/validateMW");
const controller = require("../Controller/basicAdminController");
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
            cb(null, path.join(__dirname,"..","images","basicAdmin"));
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
    .route("/basicAdmin")
    .get(controller.getAllBasicAdmins)
    .post(upload.single('image'),basicAdminvalidation.post, validateMW ,controller.addBasicAdmin)
    .patch(upload.single('image'),basicAdminvalidation.update ,validateMW ,controller.updateBasicAdmin)
    .delete(basicAdminvalidation.delete ,validateMW ,controller.deleteBasicAdmin);

module.exports = router;