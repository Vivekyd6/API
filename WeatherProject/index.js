const express = require("express");
const https= require("https");


const app = express();


app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");
//   const url = "https://api.openweathermap.org/data/2.5/weather?lat=90&lon=90&appid=8540560b0d13912db6ef32a2cca4458f"
//     https.get(url,function(resp){
//         console.log(resp.statusCode);

//         resp.on("data",function(data){
//        const weatherData = JSON.parse(data)
//         //    console.log(weatherData);
//         const temp = weatherData.main.temp
//         // console.log(temp);
//         res.send("The temperature of given place is   "+ temp);
//        }) 
    // })
    // res.send("Server is up and running");
});

app.post("/",function(req,res){
    console.log(res.body.cityName);
});

app.listen(3000,function(){
    console.log("Server is running on port 3000");
})