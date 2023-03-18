// const mongoose = require("mongoose");
// const bcrypt = require('bcrypt');
// require("./../../Model/memberModel");
// let memberSchema=mongoose.model("member");


// exports.login(role)=>{(request,response,next)=>{
//         memberSchema.findOne({email:request.body.email})
//                     .then(data=>{
//                      if(data==null)
//                      {
//                         let error=new Error("not authenticated");
//                         error.status=401;
//                         throw new Error('member not found');
//                      }
//                      else{
    
//                         let correctPassword= bcrypt.compare(request.body.password, data.password)
//                         if(!correctPassword)
//                         {
//                            let error=new Error("not authenticated");
//                            error.status=401;
//                            throw new Error('Password Not Valid');
//                         }
                       
//                      }
//                     return data
//                     })
//                     .then(data=>{
//                      let token=jwt.sign({id:data._id,role:role}, 
//                      "library",
//                      {expiresIn:"24h"})
//                      response.status(200).json({message:"authenticated",token});
//                     })
//                     .catch(error=>next(error))
//     }
    
// }