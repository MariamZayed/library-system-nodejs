const express=require("express")
const mongoose=require("mongoose")
const app=express()
const adminRoute = require("./Routes/adminRoute");

const cors=require("cors")
const port = process.env.PORT || 8080;


mongoose.set("strictQuery",false)


mongoose.connect('mongodb+srv://nodejs:q7GOqqPWdQlbkaHH@librarynodejs.ym4zs66.mongodb.net/?retryWrites=true&w=majority')
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

    app.use((request,response)=>{
        response.status(404).json({message:"Not Found"});
    });
    
    //Middlewre 3--- Error ----
    app.use((error,request,response,next)=>{
        response.status(500).json({message:error+""})
    });