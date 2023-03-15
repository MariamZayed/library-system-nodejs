const { body, param, query } = require("express-validator");

exports.post = [
  body("title").isString().withMessage("Title must be string"),
  body("author").isString().withMessage("Author must be string"),
  body("publisher").isString().withMessage("Publisher must be string"),
  // body("publishingDate").isDate().withMessage("Invalid Date"),
  body("category").isString().withMessage("Category must be string"),
  // body("arrivalDate").isDate().withMessage("Invalid Date"),
  body("edition").isNumeric().withMessage("Edition Must be Number"),
  body("pages").isNumeric().withMessage("Pages Must be Number"),
  body("totalNoOfCopies")
    .isNumeric()
    .withMessage("total No Of Copies Must be Number"),
  body("noOfBorrowedCopies")
    .isNumeric()
    .withMessage("no Of Borrowed Copies Must be Number"),
  body("noOfreadingCopies")
    .isNumeric()
    .withMessage("no Of reading Copies Must be Number"),
  // timesOfReading
  body("timesOfBorrowing")
    .isNumeric()
    .withMessage("Times of the book being borrowed Must be a Number"),
  body("timesOfReading")
    .isNumeric()
    .withMessage("Times of the book being read Must be a Number"),
  body("noOfAvailableCopies")
    .isNumeric()
    .withMessage("no Of Available Copies Must be a Number"),
];

// exports.delete = [body("_id").isNumeric().withMessage("Id Shoud be a number")];
