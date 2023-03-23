const express=require("express");
const controller=require("../Controller/loginController")
//validation
const router=express.Router();
const upload =require("../Core/helper/uploadImage");
const loginValidation = require("../Core/Validation/loginValidation")
const validateMW = require("../Core/Validation/validateMW")

router.post("/login/member",loginValidation.login, validateMW, controller.loginMember);
router.post("/login/empolyee",loginValidation.login, validateMW,controller.loginEmpolyee);
router.post("/login/admin",loginValidation.login, validateMW,controller.loginAdmin);
router.post("/login/basicAdmin",loginValidation.login, validateMW,controller.loginBasicAdmin);
router.post("/activate/admin",upload("admin"),loginValidation.active, validateMW,controller.activateAdmin);
router.post("/activate/basicAdmin",upload("basicAdmin"),loginValidation.active, validateMW,controller.activatebasicAdmin);
router.post("/activate/employee",upload("employees"),loginValidation.active, validateMW,controller.activateEmployee);
router.post("/activate/member",upload("member"),loginValidation.active, validateMW,controller.activateMember);

module.exports=router;
