const mongoose=require("mongoose");
require("./../Model/basicAdminModel");
const fs =require("fs") 
const bcrypt = require("bcrypt");
const path = require("path");
const { text } = require("express");
const saltRounds = 10
const salt = bcrypt.genSaltSync(saltRounds);

//getter
const basicAdminSchema = mongoose.model("basicAdmins");

exports.getAllBasicAdmins=(request,response)=>{
    basicAdminSchema.find({})
                .then((data)=>{
                    response.status(200).json({data});        
                })
                .catch((error)=>{
                    next(error);
                })
}

exports.addBasicAdmin=(request,response,next)=>{
    new basicAdminSchema({
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
        response.status(201).json({data});
    })
    .catch(error=>next(error));
}

exports.updateBasicAdmin=(request,response,next)=>{
    basicAdminSchema.findOne({
        _id:request.body.id
    }).then((data)=>{
        console.log(data);
        if(!data){
            throw new Error("basic Admin not found ts");
        }else{//for basicAdmin role
            
        }
        if(request.file){
            fs.unlinkSync(path.join(__dirname,"..","images","basicAdmin",`${data.image}`));
        }   
        return basicAdminSchema.updateOne({//Use return because use of two query actions 
            _id:request.body.id
        },{
            $set:{
                lastName:request.body.lastName,
                password:request.body.password,
                email:request.body.email,
                birthdate:request.body.birthdate,
                hireDate:request.body.hireDate,
                salary:request.body.salary,
                image:request.file.filename 
            }
        })   
    })
    .then(data=>{
                response.status(200).json({data});
        })
        .catch(error=>next(error));
}

exports.deleteBasicAdmin=(request,response,next)=>{
    basicAdminSchema.deleteOne({
        _id:request.body.id
    }).then(data=>{
        response.status(200).json({data});
    })
    .catch(error=>next(error));
}
