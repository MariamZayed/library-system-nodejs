const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const memberSchema = new mongoose.Schema({
  _id: Number,
  fullName: {
    type: String,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z].*[\s\.]*$/.test(v);
      },
      message: "Please enter a valid name",
    },
    required: [true, "fullName  is required"],
  },
  email: {
    type: String,
    validate: {
      validator: function (v) {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
      },
      message: "Please enter a valid email",
    },
    required: [true, "email  is required"],
  },
  password: { type: String, required: true },
  phoneNumber: {
    type: String,
    unique: true,
    validate: {
      validator: function (v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, "User phone number required"],
  },
  image: String,
  birthdate : {
    type: String,
    validate: {
        validator: function (v) {
        return /(^0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4}$)/.test(v);
        },
        message: "Please enter a valid date",
    }, 
},
  fullAddress: {
    city: String,
    street: String,
    building: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    //7I dont want it to ever change
    immutable: true,
    require: true,
  },
  isActivated: {type:Boolean, default: false},
});

memberSchema.plugin(AutoIncrement, { id: "memberId", inc_field: "_id" });
mongoose.model("member", memberSchema);

// birthDate:{
//     type: Date,
//     validate: {
//     validator: function(v) {
//         v.setFullYear(v.getFullYear()+18)
//         const currentTime = new Date();
//         currentTime.setHours(0,0,0,0);
//         return v.getTime() <= currentTime.getTime();
//     },
//     message: props => 'You must be 18 years old.'
//     },
//     required: true
//   }
