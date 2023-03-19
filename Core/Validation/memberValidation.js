const { body, param, query } = require("express-validator");

exports.postValidator = [
    body("fullName").isString().withMessage("First Name must be string"),
    body("password").isLength({min: 8}).withMessage("Password Must be Min length 8"),
    body("email").isEmail().withMessage("Invalid Email Format"),
    body("birthdate").isString().withMessage("Invalid birthdate"),
    body("phonenumber").isString().withMessage("Invalid phone Number"),
    body("fulladdress").isObject().withMessage("Invalid address"),
    body("fulladdress.city").isString().withMessage("Invalid City"),
    body("fulladdress.street").isString().withMessage("Invalid Street"),
    body("fulladdress.building").isInt().withMessage("Invalid building"),
];

exports.putValidator = [
    body("id").isNumeric().withMessage("Id Shoud be Number"),
    body("fullName").optional().isString().withMessage("First Name must be string"),
    body("password").optional().isLength({min: 8}).withMessage("Password Must be Min length 8"),
    body("email").optional().isEmail().withMessage("Invalid Email Format"),
    body("birthdate").optional().isString().withMessage("Invalid birthdate"),
    body("phonenumber").optional().isString().withMessage("Invalid phone Number"),
    body("fulladdress").optional().isObject().withMessage("Invalid address"),
    body("fulladdress.city").optional().isString().withMessage("Invalid City"),
    body("fulladdress.street").optional().isString().withMessage("Invalid Street"),
    body("fulladdress.building").optional().isInt().withMessage("Invalid building"),
];

exports.deleteValidator = [
    body("id").isNumeric().withMessage("Id Shoud be Number"),
]

exports.getByIdValidate = [
    param("id").isNumeric().withMessage("Id Shoud be Number"),
]

exports.getByEmailValidate = [
    param("email").isEmail().withMessage("email is not valid"),
]
exports.getByNameValidate = [
    param("name").isString().withMessage("name Shoud be string"),
]


// exports.post = [
//     body("fullName").isString().withMessage("First Name must be string"),
//     body("password").isLength({min: 8}).withMessage("Password Must be Min length 8"),
//     body("email").isEmail().withMessage("Invalid Email Format"),
//     body("birthdate").isDate().withMessage("Invalid birthdate"),
//     body("phoneNumber").isNumeric().withMessage("Invalid phone Number"),
//     body("fullAddress.city").isString().withMessage("Invalid City"),
//     body("fullAddress.street").isString().withMessage("Invalid Street"),
//     body("fullAddress.building").isInt().withMessage("Invalid building"),
// ];

// exports.update = [
//     body("id").isNumeric().withMessage("Id Shoud be Number"),
//     body("fullName").optional().isString().withMessage("First Name must be string"),
//     body("password").optional().isLength({min: 8}).withMessage("Password Must be Min length 8"),
//     body("email").optional().isEmail().withMessage("Invalid Email Format"),
//     body("birthdate").optional().isDate().withMessage("Invalid birthdate"),
//     body("phoneNumber").optional().isNumeric().withMessage("Invalid phone Number"),
//     body("fullAddress.city").optional().isString().withMessage("Invalid City"),
//     body("fullAddress.street").optional().isString().withMessage("Invalid Street"),
//     body("fullAddress.building").optional().isInt().withMessage("Invalid building"),
// ];

// exports.delete = [
//     body("id").isNumeric().withMessage("Id Shoud be Number"),
// ]

// exports.getById = [
//     param("id").isNumeric().withMessage("Id Shoud be Number"),
// ]

// exports.getByEmail = [
//     param("email").isEmail().withMessage("Id Shoud be Number"),
// ]
// exports.getByName = [
//     param("name").isEmail().withMessage("Id Shoud be Number"),
// ]

