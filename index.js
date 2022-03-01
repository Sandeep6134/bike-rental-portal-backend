const express= require('express')
// const { MongoAPIError } = require('mongodb')
const mongo=require("./connect")
// const connect = require("./connect")
const app=express()
app.use(express.json())
const cors=require("cors");
app.use(cors())
const {userSignin,userSignup,get,userUpdateBooking} = require("./signin")


mongo.connect();

app.get("/bike",async(req,res,next)=>{
        res.send("server")
})
app.post("/adminsignin",userSignin)
app.post("/adminsignup",userSignup)
app.get("/users",get)
app.post("/update/booking",userUpdateBooking)
app.get("/bike/list",async(req,res,next)=>{

    try {
        var data = await mongo.db.collection("Bikes").find({booking:1}).toArray();
        res.send(data);
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
})
const port = process.env.PORT || 3001
app.listen(port, function(){
    console.log("connected")
})