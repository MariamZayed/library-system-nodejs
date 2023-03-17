
const jwt=require("jsonwebtoken");
const mongoose=require("mongoose");
let memberSchema=mongoose.model("member");
const bcrypt = require('bcrypt');
 

//member
exports.loginMember=(request,response,next)=>{
        memberSchema.findOne({email:request.body.email})
                    .then(data=>{
                     if(data==null)
                     {
                        let error=new Error("not authenticated");
                        error.status=401;
                        throw new Error('member not found');
                     }
                     else{

                        let correctPassword= bcrypt.compare(request.body.password, data.password)
                        if(!correctPassword)
                        {
                           let error=new Error("not authenticated");
                           error.status=401;
                           throw new Error('Password Not Valid');
                        }
                       
                     }
                    return data
                    })
                    .then(data=>{
                     let token=jwt.sign({id:data._id,role:"member"}, 
                     "library",
                     {expiresIn:"24h"})
                     response.status(200).json({message:"authenticated",token});
                    })
                    .catch(error=>next(error))
}

//empolyee
exports.loginEmpolyee=(request,response,next)=>{
   memberSchema.findOne({email:request.body.email})
               .then(data=>{
                if(data==null)
                {
                   let error=new Error("not authenticated");
                   error.status=401;
                   throw new Error('employee not found');
                }
                else{

                   let correctPassword= bcrypt.compare(request.body.password, data.password)
                   if(!correctPassword)
                   {
                      let error=new Error("not authenticated");
                      error.status=401;
                      throw new Error('Password Not Valid');
                   }
                  
                }
               return data
               })
               .then(data=>{
                let token=jwt.sign({id:data._id,role:"empolyee"}, 
                "library",
                {expiresIn:"24h"})
                response.status(200).json({message:"authenticated",token});
               })
               .catch(error=>next(error))
}

//admin
exports.loginAdmin=(request,response,next)=>{
   memberSchema.findOne({email:request.body.email})
               .then(data=>{
                if(data==null)
                {
                   let error=new Error("not authenticated");
                   error.status=401;
                   throw new Error('admin not found');
                }
                else{

                   let correctPassword= bcrypt.compare(request.body.password, data.password)
                   if(!correctPassword)
                   {
                      let error=new Error("not authenticated");
                      error.status=401;
                      throw new Error('Password Not Valid');
                   }
                  
                }
               return data
               })
               .then(data=>{
                let token=jwt.sign({id:data._id,role:"admin"}, 
                "library",
                {expiresIn:"24h"})
                response.status(200).json({message:"authenticated",token});
               })
               .catch(error=>next(error))
}

//Basicadmin
exports.loginBasicAdmin=(request,response,next)=>{
   memberSchema.findOne({email:request.body.email})
               .then(data=>{
                if(data==null)
                {
                   let error=new Error("not authenticated");
                   error.status=401;
                   throw new Error('BasicAdmin not found');
                }
                else{

                   let correctPassword= bcrypt.compare(request.body.password, data.password)
                   if(!correctPassword)
                   {
                      let error=new Error("not authenticated");
                      error.status=401;
                      throw new Error('Password Not Valid');
                   }
                  
                }
               return data
               })
               .then(data=>{
                let token=jwt.sign({id:data._id,role:"basicAdmin"}, 
                "library",
                {expiresIn:"24h"})
                response.status(200).json({message:"authenticated",token});
               })
               .catch(error=>next(error))
}