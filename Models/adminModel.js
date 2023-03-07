const mongoose=require("mongoose")

const Schema=new mongoose.Schema({
    _id:{
        type:Number
    },
    firstName:{
        type:String,
        require:true
    },
    lastName :{
        type:String,
        require:true
    },
    email:{
        type:email
        // ,
        // validate:
        
    },
    password:{
        type:String
        
    },
    birthdate:{
        type:Date

    },
    hirdata:{
        type:Date,
        require:true

    },
    salary:{
        type:Number,
        require:true

    },
    image:{
        type:Image
    }

})