const { body, param, query } = require("express-validator");

exports.login = [
  body("email").isEmail().withMessage("Email Invalid"),
  body("password").isLength({ min: 8 }).withMessage("Password Short"),
];

exports.active = [
  body("email").isEmail().withMessage("Email Invalid"),
  body("password").isLength({ min: 8 }).withMessage("Password Short"),
  body("new_password").isLength({ min: 8 }).withMessage("Password Short"),
];

