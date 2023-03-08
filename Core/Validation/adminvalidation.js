const { body, param, query } = require("express-validator");

exports.post = [
    body("firstName").isString().withMessage("First Name must be string"),
    body("lastName").isString().withMessage("Last Name must be string"),
    body("password").isLength({min: 8}).withMessage("Password Must be Min length 8"),
    body("email").isEmail().withMessage("Invalid Email Format"),
    body("birthdate").isDate().withMessage("Invalid Date"),
    body("hireDate").isDate().withMessage("Invalid Hire Date"),
    body("image").isString().withMessage(" Invalid Image"),
    body("salary").isNumeric().withMessage("Salary Must be Number"),
];

exports.update = [
    body("id").isMongoId().withMessage("Id Shoud be Object"),
    body("lastName").optional().isString().withMessage("Last Name must be string"),
    body("password").optional().isLength({min: 8}).withMessage("Password Must be Min length 8"),
    body("email").optional().isEmail().withMessage("Invalid Email Format"),
    body("birthdate").optional().isDate().withMessage("Invalid Date"),
    body("hireDate").optional().isDate().withMessage("Invalid Hire Date"),
    body("image").optional().isString().withMessage("Invalid Image"),
    body("salary").optional().isNumeric().withMessage("Salary Must be Number")
];

exports.delete = [
    body("id").isMongoId().withMessage("Id Shoud be Object"),
]