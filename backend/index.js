import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fs from "node:fs";

import connectDB from "./src/config/db.js";
dotenv.config();

connectDB();




const port=process.env.PORT||8000;
const app=new express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


const routesFiles=fs.readdirSync("./src/routes");
routesFiles.forEach((file)=>{
    import(`./src/routes/${file}`)
    .then((route)=>app.use("/api",route.default))
    .catch((error)=>console.log(`Error occurred: ${error.message}`)); 
}) 

app.get("/",(req,res)=>{
    res.send("Hello")
})

const server=async ()=>{
    try {
    app.listen(port, () => {
        console.log(`Listening on port ${port}`)
    });
} catch (error) {
    console.log(`Error occurred: ${error.message}`);
}
}

server();

