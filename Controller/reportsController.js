// const { request, response } = require("express");
// const mongoose = require("mongoose");
// let fs = require("fs");
// require("./../Model/BookModel");
// require("./../Model/BookOperation");
// require("./../Model/adminModel");
// require("./../Model/memberModel");
// require("./../Model/employeeModel");
// // let operations = require("./../Controller/bookOperationController");
// //getter
// const adminSchema = mongoose.model("admins");
// const employeeSchema = mongoose.model("employees");
// const memberSchema = mongoose.model("member");
// const bookSchema = mongoose.model("book");
// // const bookOperationSchema = mongoose.model("bookOperattion");

// exports.getBooksCounts = (request, response, next) => {
//   bookSchema
//     .estimatedDocumentCount()
//     .then((data) => {
//       response.status(200).json({ "Number of books in the system": data });
//     })
//     .catch((error) => {
//       next(error);
//     });
// };

// exports.getAdminCounts = (request, response, next) => {
//   adminSchema
//     .estimatedDocumentCount()
//     .then((data) => {
//       response.status(200).json({ "Number of admins in the system": data });
//     })
//     .catch((error) => {
//       next(error);
//     });
// };

// exports.getEmployeeCounts = (request, response, next) => {
//   employeeSchema
//     .estimatedDocumentCount()
//     .then((data) => {
//       response.status(200).json({ "Number of employees in the system": data });
//     })
//     .catch((error) => {
//       next(error);
//     });
// };

// exports.getMemberCounts = (request, response, next) => {
//   memberSchema
//     .estimatedDocumentCount()
//     .then((data) => {
//       response.status(200).json({ "Number of members in the system": data });
//     })
//     .catch((error) => {
//       next(error);
//     });
// };

// // exports.getBookOperations = (request, response, next) => {
// //   bookOperationSchema
// //     .find({})
// //     .then((data) => {
// //       let report = data;
// //       let jsonObj = JSON.parse(report);
// //       let jsonContent = JSON.stringify(jsonObj);
// //       fs.writeFile(
// //         "bookOperationsReport.json",
// //         jsonContent,
// //         "utf8",
// //         function (err) {
// //           if (err) {
// //             console.log("An error occured while writing JSON Object to File.");
// //             return console.log(err);
// //           }
// //           console.log("JSON file has been saved.");
// //         }
// //       );
// //       response.status(200).json({ data });
// //     })
// //     .catch((error) => {
// //       next(error);
// //     });
// // };
