const { body, param, query } = require("express-validator");

exports.post = [
  body("title").isString().withMessage("Title must be string"),
  body("author").isString().withMessage("Author must be string"),
  body("publisher").isString().withMessage("Publisher must be string"),
  body("publishingDate").isDate().withMessage("publishingDate Invalid Date"),
  body("category").isString().withMessage("Category must be string"),
  body("arrivalDate").isDate().withMessage("arrivalDate Invalid Date"),
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
    .withMessage("no Of Available Copies Must be a Number")
];

exports.update = [
  body("id").isInt().withMessage("id must be Number"),
  body("title").optional().isString().withMessage("Title must be string"),
  body("author").optional().isString().withMessage("Author must be string"),
  body("publisher").optional().isString().withMessage("Publisher must be string"),
  body("publishingDate").optional().isDate().withMessage("Invalid Date"),
  body("category").optional().isString().withMessage("Category must be string"),
  body("arrivalDate").optional().isDate().withMessage("Invalid Date"),
  body("edition").optional().isNumeric().withMessage("Edition Must be Number"),
  body("pages").optional().isNumeric().withMessage("Pages Must be Number"),
  body("totalNoOfCopies")
    .optional()
    .isNumeric()
    .withMessage("total No Of Copies Must be Number"),
  body("noOfBorrowedCopies")
    .optional()
    .isNumeric()
    .withMessage("no Of Borrowed Copies Must be Number"),
  body("noOfreadingCopies")
    .optional()
    .isNumeric()
    .withMessage("no Of reading Copies Must be Number"),
  // timesOfReading
  body("timesOfBorrowing")
    .optional()
    .isNumeric()
    .withMessage("Times of the book being borrowed Must be a Number"),
  body("timesOfReading")
    .optional()
    .isNumeric()
    .withMessage("Times of the book being read Must be a Number"),
  body("noOfAvailableCopies")
    .optional()
    .isNumeric()
    .withMessage("no Of Available Copies Must be a Number")
];

exports.delete = [body("id").isInt().withMessage("Id Shoud be Number")];
exports.year = [param("year").isInt().withMessage("year Shoud be Number")];
exports.id = [param("id").isInt().withMessage("Id Shoud be Number")];

exports.year_month=[
  param("year").isInt({min: 1800}).withMessage("year Shoud be Number & bigger than 1800"),
  param("month").isInt({min: 1, max: 12}).withMessage("Invalid Value for Month")
];

exports.bookAction = [
  body("bookId").isInt().withMessage("bookId must be Number"),
  body("memberId").isInt().withMessage("memberId must be Number"),
  body("empId").isInt().withMessage("empId must be Number"),
  body("dateReturn").isDate().withMessage("dateReturn must be Date"),
  body("operationOnBook")
    .isString({ in: ["reading", "borrowing"]})
    .withMessage("inValid Value")
];

exports.bookReturn = [
  body("bookId").isInt().withMessage("bookId must be Number"),
  body("memberId").isInt().withMessage("memberId must be Number"),
  body("operationOnBook")
    .isString({ in: ["reading", "borrowing"]})
    .withMessage("inValid Value")
];