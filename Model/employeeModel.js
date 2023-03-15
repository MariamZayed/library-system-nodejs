const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

//Schema
let employeeSchema = new mongoose.Schema({
  _id: Number,
  firstName: {
    type: String,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z]*$/.test(v);
      },
      message: "Please enter a valid firstName",
    },
    required: [true, "firstName  is required"],
  },
  lastName: {
    type: String,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z]*$/.test(v);
      },
      message: "Please enter a valid lastName",
    },
    required: [true, "lasttName  is required"],
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email must be uniqe"],
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: "Please enter a valid email",
    },
    required: [true, "email  is required"],
  },
  password: {
    type: String,
    required: true,
    length: { min: 5 },
  },
  image: String,
  
  birthDate: {
    type: String,
    validate: {
        validator: function (v) {
        return /(^0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4}$)/.test(v);
        },
        message: "Please enter a valid date",
    }, 
},
  hireDate: { 
    require:true,
    type: String,
    validate: {
        validator: function (v) {
        return /(^0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4}$)/.test(v);
        },
        message: "Please enter a valid date",
    },
},
  salary: {
    type: Number,
    required: true,
    min: "3000",
    max: "20000",
  }
});

employeeSchema.plugin(AutoIncrement, { id: "employeeId", inc_field: "_id" });
mongoose.model("employees", employeeSchema);
