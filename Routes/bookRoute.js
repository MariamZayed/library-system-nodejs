const express = require("express");
const router = express.Router();
const bookValidation = require("../Core/Validation/bookValidation");
const validateMW = require("../Core/Validation/validateMW");
const controller = require("../Controller/bookController");
const authorization = require("../Middleware/authorization");

router
  .route("/book")
  .get(authorization.checkEmpolyeeAdminandBasicMember,controller.getAllBooks)
  .post(authorization.checkEmpolyeeAdminandBasic,bookValidation.post, validateMW, controller.addBook)
  .patch(authorization.checkEmpolyeeAdminandBasic,bookValidation.update, validateMW, controller.updateBook)
  .delete(authorization.checkEmpolyeeAdminandBasic,bookValidation.delete, validateMW, controller.deleteBook);

router
  .route("/book/searchBookByYear/:year")
  .get(authorization.checkEmpolyeeAdminandBasicMember, bookValidation.year, validateMW, controller.searchBookByYear)
router
  .route("/book/searchBookByCatagery/:Catagery")
  .get(controller.searchBookByCatagery)
router
  .route("/book/searchBookByPublisher/:Publisher")
  .get(controller.searchBookByPublisher)
router
  .route("/book/searchBookByAuthor/:Author")
  .get(controller.searchBookByAuthor)

router.route("/book/arrivalbook").get(authorization.checkEmpolyeeAdminandBasicMember,controller.getArrivalBook);
router.route("/bookByID/:id").get(authorization.checkEmpolyeeAdminandBasicMember,bookValidation.id, validateMW, controller.getOneBook);


module.exports = router;
