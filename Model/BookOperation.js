const mongoose=require("mongoose");

const schema=new mongoose.Schema({
bookId:{
    type:Number,
    ref:"books",
    required:true
},

empId:{
    type:Number,
    ref:"employees",
    required:true
},

memberId:{
    type:Number,
    ref:"member",
    required:true
},

operationOnBook:{
    type: String,
    enum: ["reading", "borrowing"],
    required: [true , "Value must be read OR borrow"],  
},

startOperation:{
    type: Date, 
    default: Date.now,
},

dateReturn:{
    type: Date, 
},

isReturn:{
    type:Boolean,
    default:false
}

})

mongoose.model("bookOperattion",schema);

