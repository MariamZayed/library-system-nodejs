const { body, param, query } = require("express-validator");

exports.post = [
    body("firstName").isString().withMessage("First Name must be string"),
    body("lastName").isString().withMessage("Last Name must be string"),
    body("password").isLength({min: 8}).withMessage("Password Must be Min length 8"),
    body("email").isEmail().withMessage("Invalid Email Format"),
    body("birthdate").isString().withMessage("Invalid birthdate"),
    body("hiredate").isString().withMessage("Invalid Hiredate"),
    body("salary").isNumeric().withMessage("Salary Must be Number"),
];

exports.update = [
    body("id").isNumeric().withMessage("Id Shoud be Number"),
    body("firstName").optional().isString().withMessage("First Name must be string"),
    body("lastName").optional().isString().withMessage("Last Name must be string"),
    body("password").optional().isLength({min: 8}).withMessage("Password Must be Min length 8"),
    body("email").optional().isEmail().withMessage("Invalid Email Format"),
    body("birthdate").optional().isString().withMessage("Invalid birthdate"),
    body("hiredate").optional().isString().withMessage("Invalid Hiredate"),
    body("salary").optional().isNumeric().withMessage("Salary Must be Number")
];

exports.delete = [
    body("id").isNumeric().withMessage("Id Shoud be Number"),
]

exports.getById = [
    param("id").isNumeric().withMessage("Id Shoud be Number"),
]

