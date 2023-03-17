const express = require("express");
const router = express.Router();
// const bookValidation = require("../Core/Validation/bookValidation");
const validateMW = require("../Core/Validation/validateMW");
const controller = require("../Controller/bookOperationController");

 //schema on operation book for member
router
    .route("/book/readingbook")
    .get(controller.getBooksreading)
router
    .route("/book/borrowingbook")
    .get(controller.getBooksBorrow)
router
    .route("/book/BookborrowByYearandMonth/:year/:month")
    .get(controller.borrowBookByYearandMonth)
router
.route("/book/BookreadingByYearandMonth/:year/:month")
    .get(controller.readingBookByYearandMonth)



router
  .route("/bookaction")
  .get(controller.getAllBookOperations)
  .post(validateMW, controller.bookAction);

router.route("/bookreturn").post(validateMW, controller.bookReturn);


module.exports = router;
