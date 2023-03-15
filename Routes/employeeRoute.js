const express = require("express");
const multer = require("multer");
const path = require("path");
// const{checkAdminAndBasicAdmin}=require('./../Core/authentication/authenticationMW');
const controller = require("./../Controller/employeeController");
const employeeValidation = require("./../Core/validations/employeeValidation");
// const validateMW= require('./../Core/validations/validateMW');
const { check } = require("express-validator");

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
      callBack(null, path.join(__dirname, "..", "images", "employees"));
    },
    filename: (request, file, callBack) => {
      let fileExtension = path.extname(file.originalname);
      callBack(null, +new Date() + fileExtension);
    },
  }),
});

const router = express.Router();
router
  .route("/employee")
  .get(employeeValidation.validateEmployee, controller.getAllEmployee)
  .post(
    multerFilter.single("image"),
    employeeValidation.validateEmployee,
    controller.addEmployee
  )
  .patch(
    multerFilter.single("image"),
    employeeValidation.validateEmployeeOptional,
    controller.updateEmployee
  );

//Delete Child by id
router
  .route("/employee/:id")
  .delete(
    multerFilter.single("image"),
    employeeValidation.paramVal,
    controller.deleteEmployee
  );

//search for firstName and lastName
router.route("/employee/search").get(controller.searchEmployee);

module.exports = router;
