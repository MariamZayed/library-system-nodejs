const express = require("express");
const multer = require("multer");
const path = require("path");
const controller = require("./../Controller/employeeController");
const employeeValidation = require("./../Core/Validation/employeeValidation");
const validateMW = require("./../Core/Validation/validateMW");
// const{checkAdminAndBasicAdmin}=require('./../Core/authentication/authenticationMW');

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
    validateMW,
    controller.addEmployee
  )
  .patch(
    multerFilter.single("image"),
    employeeValidation.validateEmployeeOptional,
    validateMW,
    controller.updateEmployee
  );

//Delete Child by id
router
  .route("/employee/:id")
  .delete(
    multerFilter.single("image"),
    employeeValidation.paramVal,
    validateMW,
    controller.deleteEmployee
  );

//search for firstName and lastName
router.route("/employee/search").get(validateMW, controller.searchEmployee);

module.exports = router;
