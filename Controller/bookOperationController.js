const mongoose = require("mongoose");
require("./../Model/BookOperation");
//getter
const bookSchema = mongoose.model("book");
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
          // memberId:{$eq:2}
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
          // memberId:{$eq:2}
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
          // memberId:{$eq:2}
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
          // memberId:{$eq:2}
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

// current borrowing books and return date 
exports.getCurentBooksBorrow = async (request, response, next) => {
  let finalData = {};
	const endDate = await bookOperattion.aggregate([
		{
			$match: {
				operationOnBook: "borrowing",
				memberId: { $eq: request.id},
				isReturned:false 
			},
		}, // stage1,
		{
			$project: {
				_id: 0,
				dateReturn: 1,
			},
		}, // stage2
	]);

	let warning = false;
	endDate.forEach((element) => {
		if (new Date(element.dateReturn) < new Date(Date.now())) warning = true;
	});

	const curr = await bookOperattion.aggregate([
		{
			$match: {
			
          operationOnBook:{$eq:"borrowing"},
          isReturn:{$eq:"false"},
          memberId:{$eq:request.id}
			},
		}, // stage1
		{
		    $lookup: {
      from: "books",
      localField: "bookId",
      foreignField: "_id",
      as: "borrowBooks"
        }
		},
		{
			$project: {
        startOperation:1,
        isReturn:1,
        operationOnBook:1,
        memberId:1,
        dateReturn:1,
				title: { $arrayElemAt: ["$borrowBooks.title", 0] },
			},
		}, // stage2
	])
  
  .then((data) => {
		response.status(200).json({ data });
	})
	.catch((error) => next(error));

	if (warning) {
		finalData.Warn = "I am Warning You ";
	}
	finalData.currentBook = curr;
	response.status(200).json({ finalData });
};

// number of borrowed books for any books
exports.numOfBorrowedBooks = async (request, response, next) => {
	const curr = await bookOperattion.aggregate([
		{
			$match: {
          operationOnBook:{$eq:"borrowing"},
			},
		}, // stage1
      {
        $group: {
          _id: "$bookId",
          Total_Number_Of_Operation: { $sum: 1 },
        },
      }, // stage2
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
    let findMember = await member.findOne({ _id: request.body.memberId });
    if (findMember == null) throw new Error("member not found");
    let findEmp = await employee.findOne({ _id: request.body.empId });
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
        .then((data) => {
          if (request.body.operationOnBook == "borrowing")
            bookSchema.updateOne(
              { _id: request.body.bookId },
              { $inc: { noOfBorrowedCopies: 1, noOfAvailableCopies: -1 } }
            );
          else
            bookSchema.updateOne(
              { _id: request.body.bookId },
              { $inc: { noOfreadingCopies: 1, noOfAvailableCopies: -1 } }
            );

          response.status(201).json({ data });
        })
        .catch((error) => next(error));
    }
  } catch (error) {
    next(error);
  }
};

// return book


//if any member exceeds the return date of borrow books
exports.returnDate = (request, response, next) => {
    bookOperattion
      .find({ dateReturn: { $lte: Date.now() }, isReturn:false })
      .then((data) => {
        response.status(200).json({ data });
      })
      .catch((error) => next(error));
  };

//end member//

exports.bookReturn = async (request, response, next) => {
  try {
    let findBook = await bookSchema.findOne({ _id: request.body.bookId });
    if (findBook == null) throw new Error("book not found");
    let findMember = await member.findOne({ _id: request.body.memberId });
    if (findMember == null) throw new Error("member not found");
    let findEmp = await employee.findOne({ _id: request.body.empId });
    if (findEmp == null) throw new Error("employee not found");
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

// get all book operations

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


