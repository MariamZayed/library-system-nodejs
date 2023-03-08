const express=require("express")
const mongoose=require("mongoose")
const app=express()
const adminRoute = require("./Routes/adminRoute");

const cors=require("cors")
const port = process.env.PORT || 8080;


mongoose.set("strictQuery",false)

// const start = async()=>{
//     try{
//         await mongoose.connect('mongodb+srv://nodejs:antilotfi43@librarynodejs.ym4zs66.mongodb.net/?retryWrites=true&w=majority');
//         console.log("database connected");
//         app.listen(port,()=>{
//             console.log("server connected....");
//         })
//     } catch(e){
//         console.log(e.message);
//     }
// };

mongoose.connect('mongodb+srv://nodejs:antilotfi43@librarynodejs.ym4zs66.mongodb.net/?retryWrites=true&w=majority')
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