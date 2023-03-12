const mongoose = require("mongoose");
require("./../Model/BookModel");

//getter
const bookSchema = mongoose.model("books");

exports.getAllBooks = (request, response) => {
  bookSchema
    .find({})
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};

exports.addBook = (request, response, next) => {
  new bookSchema({
    _id: request.body._id,
    title: request.body.title,
    author: request.body.author,
    publisher: request.body.publisher,
    publishingDate: request.body.publishingDate,
    category: request.body.category,
    edition: request.body.edition,
    pages: request.body.pages,
    totalNoOfCopies: request.body.totalNoOfCopies,
    noOfBorrowedCopies: request.body.noOfBorrowedCopies,
    noOfreadingCopies: request.body.noOfreadingCopies,
    noOfAvailableCopies: request.body.noOfAvailableCopies,
    available: request.body.available,
    shelfNo: request.body.shelfNo,
    arrivalDate: request.body.arrivalDate,
  })
    .save() // insertOne
    .then((data) => {
      response.status(201).json({ data });
    })
    .catch((error) => next(error));
};
