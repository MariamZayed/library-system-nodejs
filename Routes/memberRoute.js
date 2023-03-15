const express=require("express");
const multer = require("multer");
const path = require("path");
//to upload image(file) use package multer
const controller=require("./../Controller/memberController");

const router=express.Router();
const multerFilter = multer({
    fileFilter: (request, file, callBack) => {
      if (
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg"
      ) {
        callBack(null, true);
      } else {
        callBack(new Error("Not an image"));
      }
    },
    storage: multer.diskStorage({
      destination: (request, file, callBack) => {
        callBack(null, path.join(__dirname, "..", "images", "member"));
      },
      filename: (request, file, callBack) => {
        let fileExtension = path.extname(file.originalname);
        callBack(null, +new Date() + fileExtension);
      },
    }),
  });

router.route("/member")
    .get(controller.getAllMember)
    .post(multerFilter.single("image"),controller.addMember)
    .put(multerFilter.single("image"),controller.updateMember)
    .delete(multerFilter.single("image"),controller.deleteMember)

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