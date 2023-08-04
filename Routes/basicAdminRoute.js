const express=require("express")
const router = express.Router();    
const basicAdminvalidation = require("../Core/Validation/basicAdminValidation");
const validateMW = require("../Core/Validation/validateMW");
const controller = require("../Controller/basicAdminController");
const upload = require("../Core/helper/uploadImage");
const authorization = require("../Middleware/authorization");

router
    .route("/basicAdmin")
    // .all(authorization.checkRoot)
    .get(controller.getAllBasicAdmins)
    .post(basicAdminvalidation.post, validateMW ,controller.addBasicAdmin)
    .patch(upload("basicAdmin"),basicAdminvalidation.update ,validateMW ,controller.updateBasicAdmin)
    .delete(basicAdminvalidation.delete ,validateMW ,controller.deleteBasicAdmin);

router
    .route("/basicAdmin/:id")
    .get(controller.getBasicAdminById);

module.exports = router;