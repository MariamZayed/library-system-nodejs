const express = require("express");
const controller = require("./../Controller/memberController");
const upload = require("../Core/helper/uploadImage");
const authorization = require("../Middleware/authorization");
const memberValidation = require("./../Core/Validation/memberValidation");
const validateMW = require("./../Core/Validation/validateMW");
const router = express.Router();

router
  .route("/member")
  .all(authorization.checkEmpolyeeAdminandBasic)
  .get(controller.getAllMember)
  .post(memberValidation.postValidator, validateMW, controller.addMember)
  .patch(
    upload("member"),
    memberValidation.putValidator,
    validateMW,
    controller.updateMember
  )
  .delete(memberValidation.deleteValidator, validateMW, controller.deleteMember);

//update specified Member.
router
  .route("/member/:id")
  .get(
    authorization.checkEmpolyeeAdminandBasic,
    memberValidation.getByIdValidate,
    validateMW,
    controller.getMember
  );
//get member by name
router
  .route("/member/name/:name")
  .get(
    authorization.checkEmpolyeeAdminandBasic,
    memberValidation.getByNameValidate,
    validateMW,
    controller.getMemberbyName
  );
//get member by email
router
  .route("/member/email/:email")
  .get(
    authorization.checkEmpolyeeAdminandBasic,
    memberValidation.getByEmailValidate,
    validateMW,
    controller.getMemberbyemail
  );

module.exports = router;