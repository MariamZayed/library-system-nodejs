const mongoose = require("mongoose");
require("../Model/BookModel");
require("./../Model/BookOperation")
//getter
const bookSchema = mongoose.model("book");
const bookOperattion= mongoose.model("bookOperattion");

exports.getAllBooks = (request, response) => {
  bookSchema
    .find({})
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};

// @author: ashraf
exports.addBook = (request, response, next) => {
  new bookSchema({
    title: request.body.title,
    author: request.body.author,
    publisher: request.body.publisher,
    publishingDate: request.body.publishingDate,
    category: request.body.category,
    edition: request.body.edition,
    pages: request.body.pages,
    totalNoOfCopies: request.body.totalNoOfCopies,
    noOfBorrowedCopies: request.body.noOfBorrowedCopies,
    noOfreadingCopies: request.body.noOfreadingCopies,
    noOfAvailableCopies: request.body.noOfAvailableCopies,
    timesOfBorrowing: request.body.timesOfBorrowing,
    timesOfReading: request.body.timesOfReading,
    available: request.body.available,
    shelfNo: request.body.shelfNo,
    arrivalDate: request.body.arrivalDate,
  })
    .save() // insertOne
    .then((data) => {
      response.status(201).json({ data });
    })
    .catch((error) => next(error));
};

exports.updateBook=(request,response,next)=>{
  bookSchema
  .updateOne(
    {
      _id: request.body.id,
    },
    {
      $set: {
    title: request.body.title,
    author: request.body.author,
    publisher: request.body.publisher,
    publishingDate: request.body.publishingDate,
    category: request.body.category,
    edition: request.body.edition,
    pages: request.body.pages,
    totalNoOfCopies: request.body.totalNoOfCopies,
    noOfBorrowedCopies: request.body.noOfBorrowedCopies,
    noOfreadingCopies: request.body.noOfreadingCopies,
    noOfAvailableCopies: request.body.noOfAvailableCopies,
    timesOfBorrowing: request.body.timesOfBorrowing,
    timesOfReading: request.body.timesOfReading,
    available: request.body.available,
    shelfNo: request.body.shelfNo,
    arrivalDate: request.body.arrivalDate
      },
    }
  )
  .then((data) => {
    if(data.matchedCount == 0){
      throw new Error("Not Found")
    }else{
      response.status(200).json(data);
    }
  })
  .catch((error) => next(error));
}


exports.deleteBook=(request,response,next)=>{
  bookSchema
  .deleteOne({_id: request.body.id})
  .then((data) => {
    if(data.deletedCount == 0){
      throw new Error("Not Found")
    }else{
      response.status(200).json(data);
    }
  })
  .catch((error) => next(error));
}

// @author: asmaa
// functions of member//

// get borrowbook by filter year and month
exports.BookborrowByYearandMonth = (request, response, next) => {
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

// get radingbook by filter year and month
exports.BookreadingByYearandMonth = (request, response, next) => {
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

// get Booksreading in current month for member
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

// get BooksBorrow in current month for member
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

//arrivalBook
exports.getArrivalBook = (request, response) => {
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

  bookSchema.aggregate([ 
  {
    $match:
    {
      arrivalDate:{
          $gte :new Date (`${firstDay}`),
          $lte:new Date (`${lastDay}`)
        },
    }
      
  }// stage1
  ,
  
  {
 $project:
      {
            title:1,
            author:1,
            category:1,
      }
  }// stage2
])

.then((data) => {
      response.status(200).json({ data });
    })
.catch((error) => next(error));
}

//search book by year
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


//search book by catagery
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
  

//search book by publisher
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
  
//search book by author
exports.searchBookByAuthor=(request,response,next)=>{
  const author = request.params.author;
  
    // *1 to convert it to number
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
  
//search book by available
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
//end member//
