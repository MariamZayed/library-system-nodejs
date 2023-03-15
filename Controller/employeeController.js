const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const salt = bcrypt.genSalt(saltRounds);
require("./../Model/employeeModel");
const EmployeeSchema = mongoose.model("employees");

//Get All Employees
exports.getAllEmployee = (request, response, next) => {
  EmployeeSchema.find({})
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};

//Add an Employee
exports.addEmployee = (request, response, next) => {
  new EmployeeSchema({
    _id: request.body.id,
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    email: request.body.email,
    password: bcrypt.hashSync(request.body.password, parseInt(salt)),
    birthDate: request.body.birthDate,
    hireDate: request.body.hireDate,
    salary: request.body.salary,
    image: request.file?.filename ?? undefined,
  })
    .save()
    .then((data) => {
      response.status(201).json({ data });
    })
    .catch((error) => next(error));
};

//Delete Employee
exports.deleteEmployee = (request, response, next) => {
  EmployeeSchema.findOne({ _id: request.params.id })
    .then((data) => {
      console.log(data);
      if (!data) {
        throw new Error("Employee not found");
      } else {
        if (data.image) {
          console.log(data.image);
          fs.unlinkSync(
            path.join(__dirname, "..", "images", "employees", `${data.image}`)
          );
        }
        return EmployeeSchema.deleteOne({ _id: request.params.id });
      }
    })
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => next(error));
};

//Search Employee using firstName and lastName
exports.searchEmployee = (request, response, next) => {
  EmployeeSchema.find({
    $and: [
      { firstName: request.query.firstName },
      { lastName: request.query.lastName },
    ],
  })
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => next(error));
};

//Employee can update except salary, hiredate and email
//Admin can update all
//employee update except salary, email, hirdate
exports.updateEmployee = (request, response, next) => {
  EmployeeSchema.findOne({
    _id: request.body.id,
  })
    .then((data) => {
      // if (request.role == "employee") {
      // if ((request.body.id = !request.id)) {
      //   throw new Error("Not Authorized to update Data");
      // }
      //   delete request.body.email;
      //   delete request.body.hireDate;
      //   delete request.body.salary;
      // }
      if (request.file && data.image)
        fs.unlinkSync(
          path.join(__dirname, "..", "images", "employees", `${data.image}`)
        );
      return EmployeeSchema.updateOne(
        {
          _id: request.body._id,
        },
        {
          $set: {
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            email: request.body.email,
            hireDate: request.body.hireDate,
            salary: request.body.salary,
            password: request.body.password,
            birthDate: request.body.birthDate,
            image: request.file?.filename ?? undefined,
          },
        }
      );
    })
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};
