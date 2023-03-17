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



///// Start of Searching //////////
exports.searchBookByYear=(request,response,next)=>{
  const year = request.params.year * 1;
    // *1 to convert it to number
    bookSchema.aggregate([ 
    {
        $match:
        {
            publishingDate:{
                $gte :new Date (`${year}-01-01`),
                $lte :new Date (`${year}-12-31`)
            },          
            }
        }// stage1
        ,
        {
        $project:
        {
                title:1,
                author:1,
                publisher:1,
                publishingDate:1,
                category:1
        }
    }// stage2
    ])
    .then((data) => {
        response.status(200).json({ data });
        })
        .catch((error) => next(error));
}

exports.searchBookByCatagery=(request,response,next)=>{
    const catagery = request.params.catagery;
    // *1 to convert it to number
    bookSchema.aggregate([ 
    {
        $match:
        {
        category:{$eq:`${catagery}`},          
        }
    }// stage1
    ,
    {
    $project:
        {
            title:1,
            author:1,
            publisher:1,
            publishingDate:1,
            category:1
        }
    }// stage2
    ])
    
    .then((data) => {
        response.status(200).json({ data });
        })
        .catch((error) => next(error));
    }

    exports.searchBookByTitle=(request,response,next)=>{
    const title = request.params.title;
      // *1 to convert it to number
    bookSchema.aggregate([ 
    {
        $match:
        {
        title:{$eq:`${title}`},          
        }
    }// stage1
    ,
    {
    $project:
        {
            title:1,
            author:1,
            noOfBorrowedCopies:1,
            noOfAvailableCopies:1,
        }
    }// stage2
    ])
    
    .then((data) => {
        response.status(200).json({ data });
        })
        .catch((error) => next(error));
}
    
exports.searchBookByPublisher=(request,response,next)=>{
    const publisher = request.params.publisher;
      // *1 to convert it to number
    bookSchema.aggregate([ 
    {
        $match:
        {
        publisher:{$eq:`${publisher}`},          
        }
    }// stage1
    ,
    {
    $project:
        {
            title:1,
            publisher:1,
            author:1,
            noOfBorrowedCopies:1,
            noOfAvailableCopies:1,
        }
    }// stage2
    ])
    .then((data) => {
        response.status(200).json({ data });
        })
        .catch((error) => next(error));
}

exports.searchBookByAuthor=(request,response,next)=>{
    const author = request.params.author;
    bookSchema.aggregate([ 
    {
        $match:
        {
        author:{$eq:`${author}`},          
        }
    }// stage1
    ,
    {
    $project:
        {
            title:1,
            author:1,
            noOfBorrowedCopies:1,
            noOfAvailableCopies:1,
        }
    }// stage2
    ])
    .then((data) => {
        response.status(200).json({ data });
        })
        .catch((error) => next(error));
}
///// End of Searching //////////

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