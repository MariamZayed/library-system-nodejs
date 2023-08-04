require("./../Model/basicAdminModel");
require("./../Model/adminModel");
require("./../Model/memberModel")
require("./../Model/employeeModel");
const jwt=require("jsonwebtoken");
const mongoose=require("mongoose");
let basicSchema=mongoose.model("basicAdmins");
let adminSchema=mongoose.model("admins");
let employeeSchema=mongoose.model("employees");
let memberSchema=mongoose.model("member");
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const checkMailAndPassword = async (model, request, response, next) => {
	try {
		let data = await model.findOne({ email: request.body.email });
		if (data == null) {
			throw new Error('either mail or password is wrong');
		} else {
			let matched = await bcrypt.compare(request.body.password, data.password);
			if (!matched) throw new Error('either mail or password is wrong');
		}
		return data;
	} catch (error) { next(error); }
};

exports.loginBasicAdmin=(request,response,next)=>{
   checkMailAndPassword(basicSchema,request,response,next)
      .then(data=>{
         if(data.isActivated){
            let token;
            if(data.isRoot){
                token=jwt.sign({id:data._id,role:"Root"}, 
            "library",
            {expiresIn:"24h"})
            }else{
               token=jwt.sign({id:data._id,role:"basicAdmin"}, 
               "library",
               {expiresIn:"24h"})
            }
            response.status(200).json({message:"authenticated",token});
         }else{
            throw new Error("You didn't activate your account!");
         }
         
      })
      .catch(error=>next(error))
}

exports.loginAdmin=(request,response,next)=>{
   checkMailAndPassword(adminSchema, request,response,next)
   .then(data=>{
      if(data.isActivated){
         let token=jwt.sign({id:data._id,role:"admin"}, 
         "library",
         {expiresIn:"24h"})
         response.status(200).json({message:"authenticated",token});
      }else
         throw new Error ("You didn't activate your account!");
   })
   .catch(error=>next(error))
}

exports.loginEmpolyee=(request,response,next)=>{
   checkMailAndPassword(employeeSchema,request,response,next)
      .then(data=>{
         let token=jwt.sign({id:data._id,role:"empolyee"}, 
         "library",
         {expiresIn:"24h"})
         response.status(200).json({message:"authenticated",token});
   })
   .catch(error=>next(error))
}

exports.loginMember=(request,response,next)=>{
   checkMailAndPassword(memberSchema,request,response,next)
      .then(data=>{
         // if shcema.admin.isactvated == false
         // {
         //   throw "sorry u should activate"
         // }
         let token=jwt.sign({id:data._id,role:"member"}, 
         "library",
         {expiresIn:"24h"})
         response.status(200).json({message:"authenticated",token});
      })
      .catch(error=>next(error))
}

exports.activateAdmin = (request,response,next) => {
   checkMailAndPassword(adminSchema, request,response,next)
   .then(data=>{
      if(data.isActivated){
         throw new Error ("You are activated your account!");
      }else{
         return adminSchema.updateOne({_id: data.id}, {
            $set: {
               image: request.file.filename,
               password: bcrypt.hashSync(request.body.new_password, salt),
               isActivated: true
            }
         })
      }
   }).then(_ => {
      response.json({"data": "activate successful. please login"})
   })
   .catch(error=>next(error))

}



exports.activatebasicAdmin = (request,response,next) => {
   checkMailAndPassword(basicSchema, request,response,next)
   .then(data=>{
      if(data.isActivated){
         throw new Error ("You are activated your account!");
      }else{
         return basicSchema.updateOne({_id: data.id}, {
            $set: {
               image: request.file.filename,
               password: bcrypt.hashSync(request.body.new_password, salt),
               isActivated: true
            }
         })
      }
   }).then(_ => {
      response.json({"data": "activate successful. please login"})
   })
   .catch(error=>next(error))

}



exports.activateEmployee = (request,response,next) => {
   checkMailAndPassword(employeeSchema, request,response,next)
   .then(data=>{
      if(data.isActivated){
         throw new Error ("You are activated your account!");
      }else{
         return employeeSchema.updateOne({_id: data.id}, {
            $set: {
               image: request.file.filename,
               password: bcrypt.hashSync(request.body.new_password, salt),
               isActivated: true
            }
         })
      }
   }).then(_ => {
      response.json({"data": "activate successful. please login"})
   })
   .catch(error=>next(error))

}


exports.activateMember = (request,response,next) => {
   checkMailAndPassword(memberSchema, request,response,next)
   .then(data=>{
      if(data.isActivated){
         throw new Error ("You are activated your account!");
      }else{
         return memberSchema.updateOne({_id: data.id}, {
            $set: {
               image: request.file.filename,
               password: bcrypt.hashSync(request.body.new_password, salt),
               isActivated: true
            }
         })
      }
   }).then(_ => {
      response.json({"data": "activate successful. please login"})
   })
   .catch(error=>next(error))

}