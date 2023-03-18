const express = require("express");
const router = express.Router();
const adminvalidation = require("../Core/Validation/adminValidation");
const validateMW = require("../Core/Validation/validateMW");
const controller = require("../Controller/adminController");
const upload = require("../Core/helper/uploadImage");
const authorization = require("../Middleware/authorization");

router
    .route("/admin")
    .get(authorization.checkAdminAndBasicAdmin, controller.getAllAdmins)
    .post(authorization.checkBasicAdmin, adminvalidation.post, validateMW ,controller.addAdmin)
    .patch(authorization.checkAdminAndBasicAdmin, upload("admin"),adminvalidation.update ,validateMW ,controller.updateAdmin)
    .delete(authorization.checkAdminAndBasicAdmin, adminvalidation.delete ,validateMW ,controller.deleteAdmin);

router.route("/admin/:id").get(authorization.checkAdminAndBasicAdmin, adminvalidation.getById, validateMW, controller.getAdminById);

module.exports = router;
