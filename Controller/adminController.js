const mongoose=require("mongoose");
require("../Model/adminModel");
const fs =require("fs") 
const { response } = require("express");
const { matchedData } = require("express-validator");
const bcrypt = require("bcrypt");
const path = require("path");
const saltRounds = 10
const salt = bcrypt.genSaltSync(saltRounds);

//getter
const adminSchema = mongoose.model("admins");

exports.getAllAdmins=(request,response)=>{
    adminSchema.find({})
                .then((data)=>{
                    response.status(200).json({data});        
                })
                .catch((error)=>{
                    next(error);
                })
}

exports.getAdminById=(request,response,next)=>{
    adminSchema.findOne(
        {_id:request.body.id})
        .then((data)=>{
        if(data){
            response.status(200).json({data}); 
        }
        else
            throw new Error("Id not found")
    })
    .catch ((error)=> {next(error)});
}

exports.addAdmin=async(request,response,next)=>{
    new adminSchema({
        firstName:request.body.firstName,
        lastName:request.body.lastName,
        password: bcrypt.hashSync(request.body.password, salt),
        email:request.body.email,
        birthdate:request.body.birthdate,
        hireDate:request.body.hireDate,
        salary:request.body.salary,
        image:request.file.path
    }).save()// insertOne
    .then(data=>{
        console.log(data)
        response.status(201).json({data});
    })
    .catch(error=>next(error));
}

exports.updateAdmin=(request,response,next)=>{
    adminSchema.findOne({
        _id:request.body.id
    }).then((data)=>{
        if(!data){
            throw new Error(" Admin not found ts");
        }
        if(request.file && data.image){
            fs.unlinkSync(path.join(__dirname,"..","images","admin",`${data.image}`));
        }   
        return adminSchema.updateOne({//Use return because use of two query actions 
            _id:request.body.id
        },{
            $set:{
                firstName:request.body.firstName,
                lastName:request.body.lastName,
                password:request.body.password,
                email:request.body.email,
                birthdate:request.body.birthdate,
                hireDate:request.body.hireDate,
                salary:request.body.salary,
                image:request.file?.filename ?? undefined//if no file posted, then make mongo put undefined  
            }
        })   
    })
    .then(data=>{
                response.status(200).json({data});
        })
        .catch(error=>next(error));
}

exports.deleteAdmin=(request,response,next)=>{
    adminSchema.deleteOne({
        _id:request.body.id
    }).then(data=>{
        if(data.deletedCount>0){
            response.status(200).json({data});
        }else 
        throw new Error ("Can't delete not found id ")
        
    })
    .catch(error=>next(error));
}
