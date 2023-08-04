const mongoose=require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);


const schema=new mongoose.Schema({
    _id:Number,
    bookId:{
    type:Number,
    ref:"book",
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
    },
    _id:false
});
schema.plugin(AutoIncrement, { id: "bookOperation_id", inc_field: "_id" });


mongoose.model("bookOperattion",schema);

