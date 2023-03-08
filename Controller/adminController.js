const mongoose=require("mongoose");
require("./../Model/adminModel"); 
const bcrypt = require("bcrypt");
const saltRounds = 10
const salt = bcrypt.genSaltSync(saltRounds);

//getter
const adminSchema = mongoose.model("admins");

exports.getAllteachers=(request,response)=>{
    adminSchema.find({})
                .then((data)=>{
                    response.status(200).json({data});        
                })
                .catch((error)=>{
                    next(error);
                })
}

exports.addAdmin=(request,response,next)=>{
    new adminSchema({
        _id: new mongoose.Types.ObjectId(),
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

exports.updateAdmin=(request,response,next)=>{
    adminSchema.updateOne({
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
            image:request.file.path
        }
    }).then(data=>{
        if(data.matchedCount==0)
            next(new Error("Teacher not Found"));
        else
            response.status(200).json({data});
    })
    .catch(error=>next(error));
}

exports.deleteAdmin=(request,response,next)=>{
    adminSchema.deleteOne({
        _id:request.body.id
    }).then(data=>{
        response.status(200).json({data});
    })
    .catch(error=>next(error));
}