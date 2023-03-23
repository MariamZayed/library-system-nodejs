
const { request, response } = require("express");
const mongoose = require("mongoose");
let fs = require("fs");
let path = require("path");
require("./../Model/BookModel");
require("./../Model/BookOperationModel");
require("./../Model/adminModel");
require("./../Model/memberModel");
require("./../Model/employeeModel");
// let operations = require("./../Controller/bookOperationController");
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
  memberSchema
    .estimatedDocumentCount()
    .then((data) => {
      response.status(200).json({ "Number of members in the system": data });
    })
    .catch((error) => {
      next(error);
    });
};

exports.getBookOperations = (request, response, next) => {
  let file_name = `bookOperationsReport${Date.now().toString()}.json`;
  bookOperationSchema
    .find({})
    .then((data) => {
      let jsonContent = JSON.stringify(data);
      return fs.writeFile(
        path.join(__dirname, '..', 'report', file_name),
        jsonContent,
        "utf8",
        function (err) {
          if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
          }
          console.log("JSON file has been saved.");
        }
      );
    }).then(_ => {
      response.status(200).json({ "data": file_name });
    })
    .catch((error) => {
      next(error);
    });
};