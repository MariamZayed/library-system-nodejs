const express=require("express");
//to upload image(file) use package multer
const controller=require("./../Controller/memberController");

const router=express.Router();

router.route("/member")
    .get(controller.getAllMember)
    .post(controller.addMember)
    .put(controller.updateMember)
    .delete(controller.deleteMember)

//update specified Member.
router.route("/member/:id")
      .get(controller.getMember)
//get member by name
router.route("/member/name/:name")
      .get(controller.getMemberbyName)
//get member by email
router.route("/member/email/:email")
      .get(controller.getMemberbyemail)

//get readingbook by member
router.route("/member/readingbook/:id")
      .get(controller.getReadingbook)

module.exports=router;