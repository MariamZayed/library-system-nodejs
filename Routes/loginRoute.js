const express=require("express");
const controller=require("../Controller/loginController")
//validation
const router=express.Router();
const upload =require("../Core/helper/uploadImage");


router.post("/login/member",controller.loginMember);
router.post("/login/empolyee",controller.loginEmpolyee);
router.post("/login/admin",controller.loginAdmin);
router.post("/login/basicAdmin",controller.loginBasicAdmin);
router.post("/activate/admin",upload("admin"),controller.activateAdmin);
router.post("/activate/basicAdmin",upload("basicAdmin"),controller.activatebasicAdmin);
router.post("/activate/employee",upload("employees"),controller.activateEmployee);
router.post("/activate/member",upload("member"),controller.activateMember);

module.exports=router;
