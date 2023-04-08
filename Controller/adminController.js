const mongoose=require("mongoose");
require("../Model/adminModel");
const fs =require("fs") 
const { response } = require("express");
const bcrypt = require("bcrypt");
const path = require("path");
const saltRounds = 10
const salt = bcrypt.genSaltSync(saltRounds);

//getter
const adminSchema = mongoose.model("admins");

exports.getAllAdmins=(request,response, error)=>{
    if(request.role == "admin"){
        adminSchema.find({_id: request.id}, {password: 0})
        .then((data)=>{
            response.status(200).json({data});        
        })
        .catch((error)=>{
            next(error);
        })
    }else{
        adminSchema.find({}, {password: 0})
        .then((data)=>{
            response.status(200).json({data});        
        })
        .catch((error)=>{
            next(error);
        })
    }
}

exports.getAdminById=(request,response,next)=>{
    // if(request.role == "basicAdmin" || (request.role == "admin" && request.params.id == request.id)){
        adminSchema.findOne({_id:request.params.id})
        .then((data)=>{
        if(data == null)
            throw new Error("Id not found")
        else
            response.status(200).json({data}); 
        }).catch ((error)=> {next(error)});
    // }else{
    //     console.log(request.role);
    //     next(new Error("not have permission"))
    // }
}

exports.addAdmin=async(request,response,next)=>{
    new adminSchema({
        firstName:request.body.firstName,
        lastName:request.body.lastName,
        password: bcrypt.hashSync(request.body.password, salt),
        email:request.body.email,
        birthdate:request.body.birthdate,
        hireDate:request.body.hiredate,
        salary:request.body.salary,
    }).save()
    .then(data=>{
        console.log(data)
        response.status(201).json({data});
    })
    .catch(error=>next(error));
}

exports.updateAdmin=(request,response,next)=>{
    let password;
    if(request.body.password){
        password = bcrypt.hashSync(request.body.password, salt);
    }
    if(request.role != "admin" || (request.role == "admin" && request.body.id == request.id)){
    adminSchema.findOne({
        _id:request.body.id
    }).then((data)=>{
        if(!data){
            throw new Error(" Admin not found ts");
        }
        if(request.file && data.image){
            fs.unlinkSync(path.join(__dirname,"..","images",`${data.image}`));
        }   
        return adminSchema.updateOne({//Use return because use of two query actions 
            _id:request.body.id
        },{
            $set:{
                firstName:request.body.firstName,
                lastName:request.body.lastName,
                password: password,
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
    }else{
        next(new Error("not have permission"))
    }
}

exports.deleteAdmin=(request,response,next)=>{
    if(request.role == "basicAdmin" || (request.role == "admin" && request.body.id == request.id)){
        adminSchema.findOne({
            _id:request.body.id
        }).then(data=>{
            if(!data)
                throw new Error ("Can't delete not found id ")
            if (data.image){
            fs.unlinkSync(path.join(__dirname,"..","images",`${data.image}`));
            }
            return adminSchema.deleteOne({ _id: request.body.id });
        }).then (data=>{
            if(data.deletedCount>0){
                response.status(200).json({data});
            }
        }
        )
            .catch(error=>next(error));
            }else{
                next(new Error("not have permission"))
    }
}
