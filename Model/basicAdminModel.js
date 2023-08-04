const mongoose = require("mongoose")
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = new mongoose.Schema({
    _id: Number,
    firstName:{
        type:String,
        validate: {
            validator: function (v) {
            return /^[a-zA-Z]*$/.test(v);
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
            return /^[a-zA-Z]*$/.test(v);
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
    hiredate : { 
        require:true,
        type: String,
        validate: {
            validator: function (v) {
            return /(^0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4}$)/.test(v);
            },
            message: "Please enter a valid date",
        },
    },
    birthdate : {
        type: String,
        validate: {
            validator: function (v) {
            return /(^0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4}$)/.test(v);
            },
            message: "Please enter a valid date",
        }, 
    },
    image : { type:String },
    salary : { type:Number, require:true },
    isActivated:{type:Boolean,default: false},
    isRoot: {type: Boolean, default: false}
})

Schema.plugin(AutoIncrement,{
    id: 'basicAdminCounter',
    inc_field: "_id"
});

mongoose.model("basicAdmins",Schema); //new name for model
