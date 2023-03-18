const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const bookSchema = new mongoose.Schema({
  _id: Number,
  title: {
    type: String,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z0-9 ]*$/.test(v);
      },
      message: "Please enter a valid name",
    },
    required: [true, "Title is required"],
  },
  author: {
    type: String,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z]*$/.test(v);
      },
      message: "Please enter a valid name",
    },
    required: [true, "Author is required"],
  },
  publisher: {
    type: String,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z0-9 ]*$/.test(v);
      },
      message: "Please enter a valid name",
    },
    required: [true, "Publisher is required"],
  },
  // Date is like this: 2009-09-02
  publishingDate: {
    type: Date,
  },
  category: {
    type: String,
    enum: {
      values: [
        "Sci-fi",
        "Fantasy",
        "Mystery",
        "Thriller",
        "Horror",
        "Historical",
        "Romance",
        "Philosophy",
        "Fiction",
      ],
      message: "{Values} is not a category",
    },
  },
  edition: {
    type: Number,
    validate: {
      validator: function (v) {
        return /^\+?(0|[1-9]\d*)$/.test(v);
      },
      message: "Please enter a valid positive integer",
    },
  },
  pages: {
    type: Number,
    validate: {
      validator: function (v) {
        return /^\+?(0|[1-9]\d*)$/.test(v);
      },
      message: "Please enter a valid positive integer",
    },
  },
  totalNoOfCopies: {
    type: Number,
    validate: {
      validator: function (v) {
        return /^\+?(0|[1-9]\d*)$/.test(v);
      },
      message: "Please enter a valid positive integer",
    },
  },
  noOfBorrowedCopies: {
    type: Number,
    validate: {
      validator: function (v) {
        return /^\+?(0|[1-9]\d*)$/.test(v);
      },
      message: "Please enter a valid positive integer",
    },
  },
  noOfreadingCopies: {
    type: Number,
    validate: {
      validator: function (v) {
        return /^\+?(0|[1-9]\d*)$/.test(v);
      },
      message: "Please enter a valid positive integer",
    },
  },
  noOfAvailableCopies: {
    type: Number,
    validate: {
      validator: function (v) {
        return /^\+?(0|[1-9]\d*)$/.test(v);
      },
      message: "Please enter a valid positive integer",
    },
  },
  timesOfBorrowing: {
    type: Number,
    validate: {
      validator: function (v) {
        return /^\+?(0|[1-9]\d*)$/.test(v);
      },
      message: "Please enter a valid positive integer",
    },
  },
  timesOfReading: {
    type: Number,
    validate: {
      validator: function (v) {
        return /^\+?(0|[1-9]\d*)$/.test(v);
      },
      message: "Please enter a valid positive integer",
    },
  },
  available:Number,
  shelfNo: {
    type: Number,
    validate: {
      validator: function (v) {
        return /^\+?(0|[1-9]\d*)$/.test(v);
      },
      message: "Please enter a valid positive integer",
    },
  },
  // Date is like this: 2009-09-02
  arrivalDate: {
    type: Date,
  },
});

bookSchema.plugin(AutoIncrement, { id: "books_id", inc_field: "_id" });

mongoose.model("book", bookSchema);
