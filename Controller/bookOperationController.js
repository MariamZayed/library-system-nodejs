const mongoose = require("mongoose");
require("./../Model/BookOperation");
//getter
const bookSchema = mongoose.model("book");
const bookOperattion= mongoose.model("bookOperattion");

// functions of member//

exports.getBooksreading = (request, response, next) => {
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
            operationOnBook:{$eq:"reading"},
            startOperation:{
                $gte :new Date (`${firstDay}`),
                $lte:new Date (`${lastDay}`)
            },
           // memberId:{$eq:2}
        }
    }// stage1
    ,
    {
    $project:
        {
            bookId:1,
            startOperation:1,
            return:1,
            operationOnBook:1,
            memberId:1
        }
    }// stage2
])
.then((data) => {
        response.status(200).json({ data });
    })
    .catch((error) => next(error));
}

exports.getBooksBorrow = (request, response, next) => {
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
         // memberId:{$eq:2}
    }
    }// stage1
    ,
    {
    $project:
        {
            bookId:1,
            startOperation:1,
            return:1,
            operationOnBook:1
        }
    }// stage2
])
.then((data) => {
    response.status(200).json({ data });
    })
.catch((error) => next(error));
}

exports.borrowBookByYearandMonth = (request, response, next) => {
    const year = request.params.year * 1;
    const month = request.params.month * 1;
    // *1 to convert it to number
    bookOperattion.aggregate([ 
    {
        $match:
        {
            operationOnBook:{$eq:"borrowing"},
            startOperation:{
                $gte :new Date (`${year}-${month}-01`),
                $lte :new Date (`${year}-${month}-31`)
            },
            // memberId:{$eq:2}
        }
    }// stage1
    ,
    {
    $project:
        {
            bookId:1,
            startOperation:1,
            return:1,
            operationOnBook:1
        }
    }// stage3
])

    .then((data) => {
        response.status(200).json({ data });
    })
    .catch((error) => next(error));


}

exports.readingBookByYearandMonth = (request, response, next) => {
    const year = request.params.year * 1;
    const month = request.params.month * 1;
    // *1 to convert it to number
    bookOperattion.aggregate([ 
    {
        $match:
        {
            operationOnBook:{$eq:"reading"},
            startOperation:{
                $gte :new Date (`${year}-${month}-01`),
                $lte :new Date (`${year}-${month}-31`)
            },
           // memberId:{$eq:2}
        }
    }// stage1
    ,
    {
    $project:
        {
            bookId:1,
            startOperation:1,
            return:1,
            operationOnBook:1
        }
    }// stage3
])

    .then((data) => {
        response.status(200).json({ data });
    })
    .catch((error) => next(error));
}

// current borrowing books and return date 
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
            //memberId:{$eq:request.id}
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
  
//end member//