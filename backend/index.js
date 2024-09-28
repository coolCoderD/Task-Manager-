import express from "express";
const app=new express();

app.get("/",(req,res)=>{
    res.send("Hello")
})

app.listen(3000,()=>{
    console.log("Listening on port 3000")
})