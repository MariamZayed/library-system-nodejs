const express = require("express");
const router = express.Router();
const bookValidation = require("../Core/Validation/bookValidation");
const validateMW = require("../Core/Validation/validateMW");
const controller = require("../Controller/bookOperationController");
const authorization = require("../Middleware/authorization");

 //schema on operation book for member
router
    .route("/book/readingbook")
    .get(authorization.checkEmpolyeeAdminandBasic, controller.getBooksreading)
router
    .route("/book/borrowingbook")
    .get(authorization.checkEmpolyeeAdminandBasic, controller.getBooksBorrow)
router
    .route("/book/BookborrowByYearandMonth/:year/:month")
    .get(authorization.checkEmpolyeeAdminandBasic, bookValidation.year_month, validateMW, controller.borrowBookByYearandMonth)
router
.route("/book/BookreadingByYearandMonth/:year/:month")
    .get(authorization.checkEmpolyeeAdminandBasic, bookValidation.year_month, validateMW, controller.readingBookByYearandMonth)

router
    .route("/bookaction")
    .get(authorization.checkEmpolyeeAdminandBasic, controller.getAllBookOperations)
    .post(authorization.checkEmpolyeeAdminandBasic,bookValidation.bookAction,  validateMW, controller.bookAction);

router.route("/bookreturn").post(authorization.checkEmpolyeeAdminandBasic,bookValidation.bookReturn, validateMW, controller.bookReturn);

router
    .route("/book/numOfBorrowedBooks")
    // .get(controller.numOfBorrowedBooks)

module.exports = router;