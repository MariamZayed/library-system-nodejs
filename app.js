const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const morgan = require("morgan");
const fs = require("fs");
const app=express()
const port = process.env.PORT || 8080;
mongoose.set("strictQuery",false)

const basicAdminRoute = require("./Routes/basicAdminRoute");
const adminRoute = require("./Routes/adminRoute");

// mongoose.connect('mongodb+srv://nodejs:q7GOqqPWdQlbkaHH@librarynodejs.ym4zs66.mongodb.net/?retryWrites=true&w=majority')
mongoose.connect("mongodb://127.0.0.1:27017/library")
    .then(() => {
        console.log("database connected");
        app.listen(port,()=>{
            console.log("server connected....");
        })
    })
    .catch((error)=> console.log(`DB connection error ${error}`))

    app.use(
        morgan("tiny", {
        stream: fs.createWriteStream("./log.log", {
            flags: "a", // appending
        }),
        })
    );
    app.use(cors());
    app.use(express.json());
    app.use(basicAdminRoute);
    app.use(adminRoute);

    app.use((request,response)=>{
        response.status(404).json({message:"Not Found"});
    });
    
    //Middlewre 3--- Error ----
    app.use((error,request,response,next)=>{
        response.status(500).json({message:error+""})
    });