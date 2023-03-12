const express=require("express")
const mongoose=require("mongoose")
const app=express()

const cors=require("cors")
const port = process.env.PORT || 8080;

const adminRoute = require("./Routes/adminRoute");
const bookRoute = require("./Routes/bookRoute");


mongoose.set("strictQuery",true)
mongoose.connect('mongodb://127.0.0.1:27017/library')
    .then(() => {
        console.log("database connected");
        app.listen(port,()=>{
            console.log("server connected....");
        })
    })
    .catch((error)=> console.log(`DB connection error ${error}`))


    app.use(cors());
    app.use(express.json());
    app.use(adminRoute);
    app.use(bookRoute);

    


    server.use((request,response)=>{
        response.status(404).json({message:"Not Found"});
    });
    
    //Middlewre 3--- Error ----
    server.use((error,request,response,next)=>{
        response.status(500).json({message:error+""})
    });