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
  if ( request.role != "empolyee" ){
    EmployeeSchema.find({}, {password:0})
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
  }else{
    EmployeeSchema.find({_id: request.id}, {password:0})
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
  }
  
};

exports.getEmployeeByID=(request,response,error)=>{
  if (request.role != "empolyee" || (request.role == "empolyee" && request.body.id == request.id)){
      EmployeeSchema.findOne({_id:request.params.id})
      .then((data)=>{
      if(data == null)
          throw new Error("Id not found")
      else
          response.status(200).json({data}); 
      }).catch ((error)=> {next(error)});
  }else{
      next(new Error("not have permission"))
  }
}

//Add an Employee
exports.addEmployee = (request, response, next) => {
  new EmployeeSchema({
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
  if (
    request.role != "empolyee" ||
    (request.role == "empolyee" && request.params.id == request.id)
  ) {
    EmployeeSchema.findOne({ _id: request.params.id })
      .then((data) => {
        if (!data) {
          throw new Error("Employee not found");
        } else {
          if (data.image) {
            fs.unlinkSync(
              path.join(__dirname, "..", "images", `${data.image}`)
            );
          }
          return EmployeeSchema.deleteOne({ _id: request.params.id });
        }
      })
      .then((data) => {
        response.status(200).json({ data });
      })
      .catch((error) => next(error));
  } else {
    next(new Error("not have permission"));
  }
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
  let password;
  if(request.body.password){
      password = bcrypt.hashSync(request.body.password, salt);
  }
  if (
    request.role != "empolyee" ||
    (request.role == "empolyee" && request.body.id == request.id)
  ) {
    EmployeeSchema.findOne({
      _id: request.body.id,
    })
      .then((data) => {
        if (request.role == "employee") {
          delete request.body.email;
          delete request.body.salary;
        }
        if (request.file && data.image)
          fs.unlinkSync(path.join(__dirname, "..", "images", `${data.image}`));
        return EmployeeSchema.updateOne(
          {
            _id: request.body.id,
          },
          {
            $set: {
              firstName: request.body.firstName,
              lastName: request.body.lastName,
              email: request.body.email,
              salary: request.body.salary,
              password: password,
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
  } else {
    next(new Error("not have permission"));
  }
};
