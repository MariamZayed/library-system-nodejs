module.exports.checkBasicAdmin=(request,response,next)=>{
    if(request.role=="basicAdmin")
    {
    //go to next layer  (controller)
      next();
    }
    else{
        let error=new Error("Not authorized");
        error.status=403;
        next(error);
    }
  }

module.exports.checkAdminAndBasicAdmin=(request,response,next)=>{
    if(request.role=="admin" || request.role=="basicAdmin")
    {
    //go to next layer  (controller)
      next();
    }
    else{
        let error=new Error("Not authorized");
        error.status=403;
        next(error);
    }
  }
    


  module.exports.checkEmpolyeeAdminandBasic=(request,response,next)=>{
    if(request.role=="admin" || request.role=="basicAdmin" || request.role=="empolyee")
    {
    //go to next layer  (controller)
      next();
    }
    else{
        let error=new Error("Not authorized");
        error.status=403;
        next(error);
    }
  }

  module.exports.checkEmpolyeeAdminandBasicMember=(request,response,next)=>{
    if(request.role=="admin" || request.role=="basicAdmin" || request.role=="empolyee"||request.role=="member")
    {
    //go to next layer  (controller)
      next();
    }
    else{
        let error=new Error("Not authorized");
        error.status=403;
        next(error);
    }
  }
