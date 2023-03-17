const jwt=require("jsonwebtoken");

module.exports=(request,response,next)=>{
  //search for authorization
 try{
  let token =request.get("authorization").split(" ")[1];
 //console.log(token);
 let decodedToken = jwt.verify(token,"School");
 request.id=decodedToken.id;
 request.role=decodedToken.role;
 //console.log(decodedToken);
 //to go to the next layers(end point) with id ,role
 next();
 }
 catch(error)
 {
  error.status=401;
  error.message="NOT authenticated";
  next(error);
 }

}
