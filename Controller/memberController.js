const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
require("./../Model/memberModel");
require("./../Model/BookModel");
const memberSchema = mongoose.model("member");
const bcrypt = require("bcryptjs");
const saltRound = 10;
const salt = bcrypt.genSaltSync(saltRound);

exports.getAllMember = (request, response, next) => {
  memberSchema
    .find({},{password:0})
    .then((data) => {
      response.status(200).json({ data });
    })
    //put next to move to error middle ware not handle error here
    .catch((error) => next(error));
};

exports.addMember = (request, response, next) => {
  //create object from schem then use save as(insert one)
  new memberSchema({
    _id: request.body.id,
    fullName: request.body.fullName,
    email: request.body.email,
    password: bcrypt.hashSync(request.body.password, salt),
    phoneNumber: request.body.phonenumber,
    birthDate: request.body.birthdate,
    fullAddress: request.body.fulladdress,
    createdAt: request.body.createdat,
    readingBooks: request.body.readingBooks,
  })
    .save()
    .then((data) => {
      response.status(201).json({ data });
    })
    .catch((error) => next(error));
};

exports.updateMember=(request,response,next)=>{
  let password;
  if(request.body.password){
    password =  bcrypt.hashSync(request.body.password, salt);
  }
    memberSchema.findOne({
        _id: request.body.id,
      })
        .then((data) => {
          if (request.role == "member") {
          if ((request.body.id = !request.id)) {
            throw new Error("Not Authorized to update Data");
          }
            delete request.body.email;
          }
          if (request.file && data.image)
            fs.unlinkSync(
              path.join(__dirname, "..", "images", `${data.image}`)
            );
          return memberSchema.updateOne(
            {
              _id: request.body.id,
            },
            {
                $set:{
                    fullName:request.body.fullName,
                    email: request.body.email,
                    password: password,
                    phoneNumber:request.body.phonenumber,
                    image: request.file?.filename ?? undefined,
                    birthDate:request.body.birthdate,
                    fullAddress:request.body.fulladdress,
                    createdAt:request.body.createdat
        
                }
            }
          );
        })
        .then((data) => {
             //if id member not found
        if(data.matchedCount==0)
        {
            next(new Error("member not found"));
        }
        else
        response.status(200).json({data:"updated"});
        })
        .catch((error) => {
          next(error);
        });
   
}

exports.deleteMember=(request,response,next)=>{
    memberSchema.findOne({ _id: request.body.id })
    .then((data) => {
      console.log(data);
      if (!data) {
        throw new Error("member not found");
      } else {
        if (data.image) {
          fs.unlinkSync(
            path.join(__dirname, "..", "images", `${data.image}`)
          );
        }
        return memberSchema.deleteOne({ _id: request.body.id });
      }
    })
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => next(error));
}

exports.getMember = (request, response, next) => {
  memberSchema
    .findOne({ _id: request.params.id })
    .then((data) => {
      if (data == null) {
        next(new Error("member  not found "));
      } else {
        response.status(200).json({ data });
      }
    })
    .catch((error) => next(error));
};

exports.getMemberbyName = (request, response, next) => {
  memberSchema
    .find({ fullName: request.params.name })
    .then((data) => {
      if (data == null) {
        next(new Error("member  not found "));
      } else {
        response.status(200).json({ data });
      }
    })
    .catch((error) => next(error));
};
exports.getMemberbyemail = (request, response, next) => {
  memberSchema
    .find({ email: { $regex: request.params.email } })
    .then((data) => {
      if (data == null) {
        next(new Error("member  not found "));
      } else {
        response.status(200).json({ data });
      }
    })
    .catch((error) => next(error));
};

exports.getReadingbook = (request, response, next) => {
  memberSchema
    .find({ _id: request.params.id }, { readingBooks: 1 })
    .populate({ path: "readingBooks", select: { title: 1 } })
    .then((data) => {
      if (data == null) {
        next(new Error("book not found"));
      } else {
        response.status(200).json({ data });
      }
    })
    .catch((error) => next(error));
};

exports.getborrowbook = (request, response, next) => {
  memberSchema
    .find({ _id: request.params.id }, { readingBooks: 1 })
    .populate({ path: "readingBooks", select: { title: 1 } })
    .then((data) => {
      if (data == null) {
        next(new Error("book not found"));
      } else {
        response.status(200).json({ data });
      }
    })
    .catch((error) => next(error));
};
