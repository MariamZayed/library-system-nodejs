const express=require("express");
const controller=require("./../Controller/loginController")
const router=express.Router();

router.post("/login/member",controller.loginMember);
router.post("/login/empolyee",controller.loginEmpolyee);
router.post("/login/admin",controller.loginAdmin);
router.post("/login/basicAdmin",controller.loginBasicAdmin);

module.exports=router;
