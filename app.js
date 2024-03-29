const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const port = process.env.PORT || 8080;
mongoose.set("strictQuery", false);
const signRoute = require("./Routes/sign");
const login = require("./Routes/loginRoute");
const auth = require("./Middleware/auth");
const basicAdminRoute = require("./Routes/basicAdminRoute");
const adminRoute = require("./Routes/adminRoute");
const bookRoute = require("./Routes/bookRoute");
const bookOperationRoute = require("./Routes/bookOperationRoute");
const employeeRoute = require("./Routes/employeeRoute");
const memberRoute = require("./Routes/memberRoute");
const reportRoute = require("./Routes/reportsRoute");
const fs = require("fs");

let str1 =
    "mongodb+srv://aymancloudways:sUIG6BvWzri04u4M@cluster0.0e3ot6n.mongodb.net/?retryWrites=true&w=majority";
// mongoose.connect("mongodb://127.0.0.1:27017/library")
// mongoose.connect("mongodb://127.0.0.1:2666/library?directConnection=true")
// mongoose.connect('mongodb+srv://nodejs:q7GOqqPWdQlbkaHH@librarynodejs.ym4zs66.mongodb.net/?retryWrites=true&w=majority')
// mongoose.connect("mongodb://127.0.0.1:27017/Library")
mongoose
    .connect(str1)
    .then(() => {
        console.log("database connected");
        app.listen(port, () => {
            console.log("server connected....");
        });
    })
    .catch((error) => console.log(`DB connection error ${error}`));

app.use(
    cors({
        origin: "http://localhost:4200",
    })
);

app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use(express.json());

app.use(login); // Auth After Log in
app.use(auth);
app.use("/temp", signRoute); // AYMAN Added this
app.use(basicAdminRoute);
app.use(adminRoute);
app.use(bookRoute);
app.use(bookOperationRoute);
app.use(employeeRoute);
app.use(memberRoute);
app.use(reportRoute);

app.use((request, response) => {
    response.status(404).json({ message: "Not Found" });
});

//Middlewre 3--- Error ----
app.use((error, request, response, next) => {
    response.status(500).json({ message: error + "" });
    if (request.file && request.file.path) fs.unlinkSync(request.file.path);
});

app.use((error, request, response, next) => {
    response.status(500).json({ message: error + "" });
    if (request.file && request.file.path) fs.unlinkSync(request.file.path);
});
