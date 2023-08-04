const jwt=require("jsonwebtoken");

module.exports=(request,response,next)=>{
  //search for authorization
  try{    
      let token =request.get("authorization").split(" ")[1];
      let decodedToken = jwt.verify(token,"library");
      request.id=decodedToken.id;
      request.role=decodedToken.role;
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
