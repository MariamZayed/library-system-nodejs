const express = require("express");
const router = express.Router();
const bookValidation = require("../Core/Validation/bookValidation");
const validateMW = require("../Core/Validation/validateMW");
const controller = require("../Controller/bookController");

router
  .route("/book")
  .get(controller.getAllBooks)
  .post(bookValidation.post, validateMW, controller.addBook)
  .patch(bookValidation.update, validateMW, controller.updateBook)
  .delete(bookValidation.delete, validateMW, controller.deleteBook);
  
module.exports = router;
