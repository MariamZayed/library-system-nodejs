const mongoose = require("mongoose");
require("./../Model/BookModel");
require("./../Model/BookOperation");
//getter
const bookSchema = mongoose.model("book");

exports.getAllBooks = (request, response, next) => {
  bookSchema
    .find({})
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};

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

exports.updateBook = (request, response, next) => {
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
          arrivalDate: request.body.arrivalDate,
        },
      }
    )
    .then((data) => {
      if (data.matchedCount == 0) {
        throw new Error("Not Found");
      } else {
        response.status(200).json(data);
      }
    })
    .catch((error) => next(error));
};

exports.deleteBook = (request, response, next) => {
  bookSchema
    .deleteOne({ _id: request.body.id })
    .then((data) => {
      if (data.deletedCount == 0) {
        throw new Error("Not Found");
      } else {
        response.status(200).json(data);
      }
    })
    .catch((error) => next(error));
};

exports.getOneBook = (request, response, next) => {
  bookSchema
    .findOne({ _id: request.params.id })
    .then((data) => {
      if (data == null) {
        throw new Error("Not Found");
      } else {
        response.status(200).json(data);
      }
    })
    .catch((error) => next(error));
};
//member
exports.getArrivalBook = (request, response) => {
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
  bookSchema
    .aggregate([
      {
        $match: {
          arrivalDate: {
            $gte: new Date(`${firstDay}`),
            $lte: new Date(`${lastDay}`),
          },
        },
      }, // stage1
      {
        $project: {
          title: 1,
          author: 1,
          category: 1,
        },
      }, // stage2
    ])

    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => next(error));
};

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
};
    
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
};

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
};
    
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
};


//end member//

// -------- Start Noor -----
exports.mostBorrowedBooks = (request,response, next) => {
  bookSchema.aggregate([
      {
        $match: {
          operationOnBook: 'borrowing',
          startOperation:{
            $gte: moment(request.body.year).toDate(),
            $lt: moment(request.body.year).add(1, 'year').toDate(),
          }
      },
      },
      {
        $group: {
          _id: '$bookId',
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
      {
        $limit: 10,
      },
      {
        $lookup: {
          from: 'book',
          localField: '_id',
          foreignField: '_id',
          as: 'book',
        },
      },
      {
        $project: {
          _id: 1,
          count: 1,
          book: { title: 1, category: 1, author: 1, publisher: 1, publishingDate: 1, edition: 1 },
        },
      },
    ])
      .then((data) => {
        response.status(200).json({ data });
      })
      .catch((error) => {
        next(error);
      });
};

  exports.mostReadBooks = (request,response, next) => {
    bookSchema.aggregate([
        {
          $match: {
            operationOnBook: 'reading',
            startOperation:{
              $gte: moment(request.body.year).toDate(),
              $lt: moment(request.body.year).add(1, 'year').toDate(),
            }
        },
        },
        {
          $group: {
            _id: '$bookId',
            count: { $sum: 1 },
          },
        },
        {
          $sort: {
            count: -1,
          },
        },
        {
          $limit: 10,
        },
        {
          $lookup: {
            from: 'book',
            localField: '_id',
            foreignField: '_id',
            as: 'book',
          },
        },
        {
          $project: {
            _id: 1,
            count: 1,
            book: { title: 1, category: 1, author: 1, publisher: 1, publishingDate: 1, edition: 1 },
          },
        },
      ])
        .then((data) => {
          response.status(200).json({ data });
        })
        .catch((error) => {
          next(error);
        });
};

exports.getNewArrivalBooks = (request, response, next) => {
  bookOperattion
  // .find()
  .find({ startOperation: { $gte: moment().subtract(1, 'month').toDate() } }, { __v: 0, startOperation: 0})
      .then((data) => {
        response.status(200).json({ data });
      })
      .catch((error) => {
        return null;
      });
};

exports.getAvailableBooks=(request,response,next)=>{
  bookSchema.find({available:{$gt:0}})
  .then((data)=>{
    response.status(200).json({data})
    
  }
  ).catch((error)=> {   
    return null
 })
};

// -------- End Noor -----


