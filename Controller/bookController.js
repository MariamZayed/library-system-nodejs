const mongoose = require("mongoose");
require("./../Model/BookModel");
require("./../Model/BookOperation");
//getter
const bookSchema = mongoose.model("book");

exports.getAllBooks = (request, response, next) => {
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
    timesOfBorrowing: request.body.timesOfBorrowing,
    timesOfReading: request.body.timesOfReading,
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

exports.updateBook = (request, response, next) => {
  bookSchema
    .updateOne(
      {
        _id: request.body.id,
      },
      {
        $set: {
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
          timesOfBorrowing: request.body.timesOfBorrowing,
          timesOfReading: request.body.timesOfReading,
          available: request.body.available,
          shelfNo: request.body.shelfNo,
          arrivalDate: request.body.arrivalDate,
        },
      }
    )
    .then((data) => {
      if (data.matchedCount == 0) {
        throw new Error("Not Found");
      } else {
        response.status(200).json(data);
      }
    })
    .catch((error) => next(error));
};

exports.deleteBook = (request, response, next) => {
  bookSchema
    .deleteOne({ _id: request.body.id })
    .then((data) => {
      if (data.deletedCount == 0) {
        throw new Error("Not Found");
      } else {
        response.status(200).json(data);
      }
    })
    .catch((error) => next(error));
};

exports.getOneBook = (request, response, next) => {
  bookSchema
    .findOne({ _id: request.params.id })
    .then((data) => {
      if (data == null) {
        throw new Error("Not Found");
      } else {
        response.status(200).json(data);
      }
    })
    .catch((error) => next(error));
};

//arrivalBook
exports.getArrivalBook = (request, response) => {
  const date = new Date();
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let f = new Date(year, month, 1).getDate();
  let l = new Date(year, month, 0).getDate();
  //format
  f = f < 10 ? "0" + f : f;
  l = l < 10 ? "0" + l : l;
  month = month < 10 ? "0" + month : month;
  const firstDay = new Date(`${year}-${month}-${f}`);
  const lastDay = new Date(`${year}-${month}-${l}`);
  //console.log(firstDay,lastDay)
  bookSchema
    .aggregate([
      {
        $match: {
          arrivalDate: {
            $gte: new Date(`${firstDay}`),
            $lte: new Date(`${lastDay}`),
          },
        },
      }, // stage1
      {
        $project: {
          title: 1,
          author: 1,
          category: 1,
        },
      }, // stage2
    ])

    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => next(error));
};
