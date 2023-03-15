const { body, param } = require("express-validator");
exports.validateEmployee= [
    body("firstName").isString().withMessage("firstName must be a String"),
    body("lastName").isString().withMessage("lastName must be a String"),
    body("email").isEmail().withMessage("email should contain letters and numbers"),
    body("password").isLength({ min:5}).withMessage("password should contain letters and numbers"),
    body("birthDate").isDate().withMessage("birthDate must be a date only"),
    body("hireDate").isDate().withMessage("hireDate must be a date only"),
    body("salary").isInt().withMessage("salary must be a numbers only"),

  ];

  exports.validateEmployeeOptional = [
    body("id").isInt().withMessage(" ID must be an Integer"),
    body("firstName").isString().optional().withMessage("firstName must be a String"),
    body("lastName").isString().optional().withMessage("lastName must be a String"),
    body("email").isEmail().optional().withMessage("email should contain letters and numbers"),
    body("password").optional().isLength({ min:5}).withMessage("password should contain letters and numbers"),
    body("birthDate").isDate().optional().withMessage("birthDate must be a date only"),
    body("hireDate").isDate().not().optional().withMessage("hireDate must be a date only"),
    body("salary").isInt().not().optional().withMessage("salary must be a numbers only"),
  ];

  exports.paramVal = [
    param("id").isInt().withMessage(" ID must be an Integer"),
  ];
  exports.paramVal2 = [
    param("firstName").isString().withMessage("firstName must be an string"),
    param("lastName").isString().withMessage("lastName must be an string"),

  ];
  