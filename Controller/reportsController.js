const { request, response } = require("express");
const mongoose = require("mongoose");
let fs = require("fs")
require("./../Model/BookModel");
require("./../Model/BookOperation");
require("./../Model/adminModel");
require("./../Model/memberModel");
require("./../Model/employeeModel");
let operations = require("./../Controller/bookOperationController");
//getter
const adminSchema = mongoose.model("admins");
const employeeSchema = mongoose.model("employees");
const memberSchema = mongoose.model("member");
const bookSchema = mongoose.model("book");
const bookOperationSchema = mongoose.model("bookOperattion");



exports.getBooksCounts = (request, response, next) => {
  bookSchema
    .estimatedDocumentCount()
    .then((data) => {
      response.status(200).json({ "Number of books in the system": data });
    })
    .catch((error) => {
      next(error);
    });
};

exports.getAdminCounts = (request, response, next) => {
  adminSchema
    .estimatedDocumentCount()
    .then((data) => {
      response.status(200).json({ "Number of admins in the system": data });
    })
    .catch((error) => {
      next(error);
    });
};

exports.getEmployeeCounts = (request, response, next) => {
  employeeSchema
    .estimatedDocumentCount()
    .then((data) => {
      response.status(200).json({ "Number of employees in the system": data });
    })
    .catch((error) => {
      next(error);
    });
};

exports.getMemberCounts = (request, response, next) => {
  bookSchema
    .estimatedDocumentCount()
    .then((data) => {
      response.status(200).json({ "Number of members in the system": data });
    })
    .catch((error) => {
      next(error);
    });
};

exports.getBooksCounts = (request, response, next) => {
  bookSchema
    .estimatedDocumentCount()
    .then((data) => {
      response.status(200).json({ "Number of books in the system": data });
    })
    .catch((error) => {
      next(error);
    });
};

exports.getBookOperations = (request, response, next) => {
  let report = {
    [operations.getBooksBorrow,operations.getBooksreading,operations.]
  }
};
