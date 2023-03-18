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
  .get(controller.getArrivalBook);
router
  .route("/book/arrivalbookbyyear")
  .get(controller.getNewArrivalBooks)
router
  .route("/book/avilableBook")
  .get(controller.getAvailableBooks)
router
  .route("/book/mostBorrowedBooks")
  .get(controller.mostBorrowedBooks)
router
  .route("/book/mostReadBooks")
  .get(controller.mostReadBooks)
router
  .route("/book/searchBookByYear/:year")
  .get(controller.searchBookByYear)
  
router
  .get("/book/:id", controller.getOneBook);

module.exports = router;
