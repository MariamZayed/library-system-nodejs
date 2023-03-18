const controller = require("./../Controller/memberController");
const upload = require("../Core/helper/uploadImage");
const authorization = require("../Middleware/authorization");
const memberValidation = require("./../Core/Validation/memberValidation");
const validateMW = require("./../Core/Validation/validateMW");

//validation

router
  .route("/member")
  .all(authorization.checkEmpolyeeAdminandBasic)
  .get(controller.getAllMember)
  .post(memberValidation.post, validateMW, controller.addMember)
  .put(
    upload("member"),
    memberValidation.update,
    validateMW,
    controller.updateMember
  )
  .delete(memberValidation.delete, validateMW, controller.deleteMember);

//update specified Member.
router
  .route("/member/:id")
  .get(
    authorization.checkEmpolyeeAdminandBasic,
    memberValidation.getById,
    validateMW,
    controller.getMember
  );
//get member by name
router
  .route("/member/name/:name")
  .get(
    authorization.checkEmpolyeeAdminandBasic,
    memberValidation.getByName,
    validateMW,
    controller.getMemberbyName
  );
//get member by email
router
  .route("/member/email/:email")
  .get(
    authorization.checkEmpolyeeAdminandBasic,
    memberValidation.getByEmail,
    validateMW,
    controller.getMemberbyemail
  );

//get readingbook by member
router
  .route("/member/readingbook/:id")
  .get(
    authorization.checkEmpolyeeAdminandBasic,
    memberValidation.getById,
    validateMW,
    controller.getReadingbook
  );

module.exports = router;
