import express  from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import errorHandling from "./middlewares/errorHandling.js";

const app=express();

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
dotenv.config();
app.use(bodyParser.json())


 

app.use(cors(
    {
        origin: 'http://localhost:3000', // Replace with your front-end's URL
        credentials: true, 
}));

//default limit of json is 2mb:

app.use(express.json({limit:"500kb"}));

app.use(express.urlencoded({extended:true,limit:"16kb"}));

// app.use(express.static("public"));

app.use(cookieParser());

app.use(errorHandling);
// app.get("/signup",(req,res)=>{


//     res.send("hello user")


// })

import { router } from "./routes/user.routes.js";
app.use("/users",router);
export {app};
