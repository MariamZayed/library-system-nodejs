const mongoose = require("mongoose");
require("../Model/BookOperationModel");
require("./../Model/memberModel");
require("./../Model/employeeModel");
require("./../Model/BookModel");
//getter
const bookSchema = mongoose.model("book");
const memberSchema = mongoose.model("member");
const employeeSchema = mongoose.model("employees");
const bookOperattion = mongoose.model("bookOperattion");
// functions of member//

exports.getBooksreading = (request, response, next) => {
  //get current month from fist day to last day of month
  const date = new Date();
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let f = new Date(year, month, 1).getDate();
  let l = new Date(year, month, 0).getDate();
  //format
  f = f < 10 ? "0" + f : f;
  l = l < 10 ? "0" + l : l;
  month = month < 10 ? "0" + month : month;
  const firstDay = new Date(`${year}-${month}-${f}`);
  const lastDay = new Date(`${year}-${month}-${l}`);
  //console.log(firstDay,lastDay)
  bookOperattion
    .aggregate([
      {
        $match: {
          operationOnBook: { $eq: "reading" },
          startOperation: {
            $gte: new Date(`${firstDay}`),
            $lte: new Date(`${lastDay}`),
          },
          memberId:{$eq:request.id}
        },
      }, // stage1
      {
        $project: {
          bookId: 1,
          startOperation: 1,
          return: 1,
          operationOnBook: 1,
          memberId: 1,
        },
      }, // stage2
    ])
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => next(error));
};

exports.getBooksBorrow = (request, response, next) => {
  //get current month from fist day to last day of month
  const date = new Date();
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let f = new Date(year, month, 1).getDate();
  let l = new Date(year, month, 0).getDate();
  //format
  f = f < 10 ? "0" + f : f;
  l = l < 10 ? "0" + l : l;
  month = month < 10 ? "0" + month : month;
  const firstDay = new Date(`${year}-${month}-${f}`);
  const lastDay = new Date(`${year}-${month}-${l}`);
  //console.log(firstDay,lastDay)
  bookOperattion
    .aggregate([
      {
        $match: {
          operationOnBook: { $eq: "borrowing" },
          startOperation: {
            $gte: new Date(`${firstDay}`),
            $lte: new Date(`${lastDay}`),
          },
          memberId:{$eq:request.id}
        },
      }, // stage1
      {
        $project: {
          bookId: 1,
          startOperation: 1,
          return: 1,
          operationOnBook: 1,
        },
      }, // stage2
    ])
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => next(error));
};

exports.borrowBookByYearandMonth = (request, response, next) => {
  const year = request.params.year * 1;
  const month = request.params.month * 1;
  // *1 to convert it to number
  bookOperattion
    .aggregate([
      {
        $match: {
          operationOnBook: { $eq: "borrowing" },
          startOperation: {
            $gte: new Date(`${year}-${month}-01`),
            $lte: new Date(`${year}-${month}-31`),
          },
          memberId:{$eq:request.id}
        },
      }, // stage1
      {
        $project: {
          bookId: 1,
          startOperation: 1,
          return: 1,
          operationOnBook: 1,
        },
      }, // stage3
    ])

    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => next(error));
};

exports.readingBookByYearandMonth = (request, response, next) => {
  const year = request.params.year * 1;
  const month = request.params.month * 1;
  // *1 to convert it to number
  bookOperattion
    .aggregate([
      {
        $match: {
          operationOnBook: { $eq: "reading" },
          startOperation: {
            $gte: new Date(`${year}-${month}-01`),
            $lte: new Date(`${year}-${month}-31`),
          },
          memberId:{$eq:request.id}
        },
      }, // stage1
      {
        $project: {
          bookId: 1,
          startOperation: 1,
          return: 1,
          operationOnBook: 1,
        },
      }, // stage3
    ])

    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => next(error));
};



exports.bookAction = async (request, response, next) => {
  try {
    let findBook = await bookSchema.findOne({ _id: request.body.bookId });
    if (findBook == null) throw new Error("book not found");
    let findMember = await memberSchema.findOne({ _id: request.body.memberId });
    if (findMember == null) throw new Error("member not found");
    let findEmp = await employeeSchema.findOne({ _id: request.body.empId });
    if (findEmp == null) throw new Error("employee not found");
    // add [&& return] to the next if after the ("get" from transaction schema) function is done
    let checkreturn = await bookOperattion.findOne({
      bookId: request.body.bookId,
      memberId: request.body.memberId,
      isReturn: false,
    });
    if (checkreturn) throw new Error("can't borrow or read the same book");
    // member can borrow by book id and the member isn't iterrated before
    if (findBook.noOfAvailableCopies > 1) {
      new bookOperattion({
        bookId: request.body.bookId,
        memberId: request.body.memberId,
        empId: request.body.empId,
        operationOnBook: request.body.operationOnBook,
        // startOperation: request.body.startOperation,
        dateReturn: request.body.dateReturn,
        isReturn: false,
      })
        .save() // insertOne
        .then(async (data) => {
          if (request.body.operationOnBook == "borrowing") {
            console.log(
              await bookSchema.updateOne(
                { _id: request.body.bookId },
                {
                  $inc: {
                    noOfBorrowedCopies: 1,
                    timesOfBorrowing: 1,
                    noOfAvailableCopies: -1,
                  },
                }
              )
            );
          } else {
            console.log(
              await bookSchema.updateOne(
                { _id: request.body.bookId },
                {
                  $inc: {
                    noOfreadingCopies: 1,
                    timesOfReading: 1,
                    noOfAvailableCopies: -1,
                  },
                }
              )
            );
          }
          // console.log(lll);
          response.status(201).json({ data });
        })

        .catch((error) => next(error));
    }
  } catch (error) {
    next(error);
  }
};

exports.returnDate = (request, response, next) => {
    bookOperattion
      .find({ dateReturn: { $lte: Date.now() }, isReturn:false })
      .then((data) => {
        response.status(200).json({ data });
      })
      .catch((error) => next(error));
  };

exports.bookReturn = async (request, response, next) => {
  try {
    let findBook = await bookSchema.findOne({ _id: request.body.bookId });
    if (findBook == null) throw new Error("book not found");
    let findMember = await memberSchema.findOne({ _id: request.body.memberId });
    if (findMember == null) throw new Error("member not found");

    let checkreturn = await bookOperattion.findOne({
      bookId: request.body.bookId,
      memberId: request.body.memberId,
      isReturn: false,
    });
    if (!checkreturn)
      throw new Error(
        "This member hadn't borrow or read this book before to return a book!"
      );
    if (checkreturn) {
      bookOperattion
        .updateOne(
          { _id: checkreturn.id },
          {
            isReturn: true,
          }
        )
        .then((data) => {
          if (request.body.operationOnBook == "borrowing")
            bookSchema.updateOne(
              { _id: request.body.bookId },
              { $inc: { noOfBorrowedCopies: -1, noOfAvailableCopies: 1 } }
            );
          else
            bookSchema.updateOne(
              { _id: request.body.bookId },
              { $inc: { noOfreadingCopies: -1, noOfAvailableCopies: 1 } }
            );

          response.status(201).json({ data });
        })
        .catch((error) => next(error));
    }
  } catch (error) {
    next(error);
  }
};

exports.getAllBookOperations = (request, response) => {
  bookOperattion
    .find({})
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};

exports.getCurentBooksBorrow = (request, response, next) => {
  //get current month from fist day to last day of month
  const date = new Date();
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let f = new Date(year, month, 1).getDate();
  let l = new Date(year, month, 0).getDate();
  //format
  f = f < 10 ? '0'+f : f;
  l = l < 10 ? '0'+l : l;
  month = month < 10 ? '0'+month : month;

  const firstDay = new Date(`${year}-${month}-${f}`);
  const lastDay = new Date(`${year}-${month}-${l}`);
  //console.log(firstDay,lastDay)
  bookOperattion.aggregate([ 
  {
      $match:
      {
          operationOnBook:{$eq:"borrowing"},
          startOperation:{
            $gte :new Date (`${firstDay}`),
            $lte:new Date (`${lastDay}`)
          },
          isReturn:{$eq:"false"},
          memberId:{$eq:request.id}
      }
  }// stage1
  ,
  {
    $lookup: {
      from: "books",
      localField: "bookId",
      foreignField: "_id",
      as: "borrowBooks"
  }
  },
  {
 $project:
      {
            startOperation:1,
            return:1,
            operationOnBook:1,
            memberId:1,
            borrowBooks:"$borrowBooks"
      }
  }// stage2
  
])
.then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => next(error));


}

exports.returnDate = (request, response, next) => {
  bookOperattion
    .find({ dateReturn: { $lte: Date.now() }, isReturn: false })
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => next(error));
};