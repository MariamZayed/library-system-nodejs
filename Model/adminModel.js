const mongoose=require("mongoose")

const Schema=new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName:{
        type:String,
        validate: {
            validator: function (v) {
            return /^[a-zA-Z0-9 ]*$/.test(v);
            },
        message: "Please enter a valid name",
        },
        required: [true, "Title is required"],
    },
    lastName :{
        type: String,
        required: [true, "Title is required"],
        validate: {
            validator: function (v) {
            return /^[a-zA-Z0-9 ]*$/.test(v);
            },
            message: "Please enter a valid name",
        },
    },
    password: { type: String, required: true, length: {min: 8} },
    email: {
        type: String,
        required: true,
        unique: [true, "Email must be unique"],
        trim: true,
        lowercase: true,
        match: [
        /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/,
        'Please fill a valid email address'
        ],
    },
    birthdate : { type:Date },
    hireDate : { type:Date, require:true },
    image : { type:String },
    salary : { type:Number, require:true }
})

mongoose.model("admins",Schema); //new name for model