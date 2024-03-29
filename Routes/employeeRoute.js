const express = require("express");
const controller = require("./../Controller/employeeController");
const employeeValidation = require("./../Core/Validation/employeeValidation");
const validateMW = require("./../Core/Validation/validateMW");
const upload = require("../Core/helper/uploadImage");
const authorization = require("../Middleware/authorization");

const router = express.Router();
router
  .route("/employee")
  .get(
    // authorization.checkEmpolyeeAdminandBasic,
    employeeValidation.validateEmployee,
    controller.getAllEmployee
  )
  .post(
    // authorization.checkAdminAndBasicAdmin,
    employeeValidation.validateEmployee,
    validateMW,
    controller.addEmployee
  )
  .patch(
    // authorization.checkEmpolyeeAdminandBasic,
    upload("employees"),
    employeeValidation.validateEmployeeOptional,
    validateMW,
    controller.updateEmployee
  );

//Delete Child by id
router
  .route("/employee/:id")
  .delete(
    // authorization.checkEmpolyeeAdminandBasic,
    employeeValidation.paramVal,
    validateMW,
    controller.deleteEmployee
  );
  
  // get admin by id
  router
  .route("/employee/:id")
  .get(
    // authorization.checkEmpolyeeAdminandBasic,
    employeeValidation.paramVal,
    validateMW,
    controller.getEmployeeByID
  );

//search for firstName and lastName
router.route("/employee/search").get(
  // authorization.checkEmpolyeeAdminandBasic,
  employeeValidation.search,validateMW,
  controller.searchEmployee);

module.exports = router;
