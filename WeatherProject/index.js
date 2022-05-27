const express = require("express");

const https= require("https");


const app = express();


app.get("/",function(req,res){
    const url ="https://api.openweathermap.org/data/2.5/forecast?id=524901&appid=8540560b0d13912db6ef32a2cca4458f";

    https.get(url,function(resp){
        console.log(resp.statusCode);


        resp.on("date",function(data){
            console.log(data);
       }) 
    })
    res.send("Server is up and running");
})

app.listen(3000,function(){
    console.log("Server is running on port 3000");
})