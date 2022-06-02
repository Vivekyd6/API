const express = require("express");
const bodyParser = require("body-parser");
const { use } = require("express/lib/application");

const app = express();

app.set('view engine','ejs');
var items = ["Buy Food","Cook Food","Get Food"];

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));  

app.get("/",function(req,res){
    // res.sendFile(__dirname+"/index.html");
    // javascript object :-  
    var today  = new Date();
    // var currentDay = today.getDate();
    // var day ="";

    // if(currentDay==0 || currentDay==6){
    //     day = "weekend";
    //     // res.send("<h1>Its working day</h1>");
    // }else {
    //     day = "weekday"
    //     // res.send("It's holiday");
    // }
    var options ={
      weekday : "long",
      day:"numeric",
      month:"long"
    };

    var day = today.toLocaleDateString("en-Us",options);
    res.render("list",{kindOfDay:day, newListItems:items});

});

app.post("/",function(req,res){
   var item =  req.body.newItem;
   items.push(item);
   console.log(item);
   res.redirect("/");
})
  

app.listen(3001, function(){
  console.log("server is running on port 3001");
});