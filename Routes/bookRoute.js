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
  
    router
    .route("/book/ArrivalBook")
    .get(controller.getArrivalBook)
    router
    .route("/book/searchBookByYear/:year")
    .get(controller.searchBookByYear)

 //schema on operation book for member
 router
 .route("/book/readingbook")
 .get(controller.getBooksreading)
 router
 .route("/book/borrowingbook")
 .get(controller.getBooksBorrow)
 router
 .route("/book/BookborrowByYearandMonth/:year/:month")
 .get(controller.BookborrowByYearandMonth)
 router
 .route("/book/BookreadingByYearandMonth/:year/:month")
 .get(controller.BookreadingByYearandMonth)
 router
 .route("/book/getCurentBooksBorrow")
 .get(controller.getCurentBooksBorrow)


 
module.exports = router;
