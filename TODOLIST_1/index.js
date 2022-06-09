const express = require("express");
const bodyParser = require("body-parser");
// const { use } = require("express/lib/application");
const _ = require("lodash");

const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");
// var items = ["Buy Food","Cook Food","Get Food"];

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todoListDb", {
  useNewUrlParser: true
});

const itemsSchema = new mongoose.Schema({
  name: String
});

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "Welcome to your todolist"
});

const item2 = new Item({
  name: "Hit the + button to add a new item"
});

const item3 = new Item({
  name: "Welcome to Web Development"
});
const item4 = new Item({
  name: "Welcome  your todolist"
});

const defaultItems = [item1, item2, item3, item4];

const listSchema = {
  name: String,
  items: [itemsSchema]
};
const List = mongoose.model("List", listSchema);

app.get("/", function (req, res) {
  /* 
 res.sendFile(__dirname+"/index.html");
 javascript object :-
 var today  = new Date();
 var currentDay = today.getDate();
 var day ="";

 if(currentDay==0 || currentDay==6){
     day = "weekend";
     // res.send("<h1>Its working day</h1>");
 }else {
     day = "weekday"
     // res.send("It's holiday");
 }
 var options ={
   weekday : "long",
   day:"numeric",
   month:"long"
 };
 */
  Item.find({}, function (err, foundItems) {
    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, function (err) {
        if (err) {
          console.log(err);
        } else {
          // console.log("Successfully Saved Default items to database ");
        }
      });
      res.redirect("/");
    } else {
      res.render("list", { listTitle: "Today", newListItems: foundItems });
      // console.log(foundItems);
      // console.log(foundItems.length);
    }
  });
});

app.get("/:customListName", function (req, res) {
  console.log(req.params.customListName);
  const customListName = _.capitalize(req.params.customListName);

  List.findOne({ name: customListName }, function (err, foundList) {
    if (!err) {
      if (!foundList) {
        // console.log("Doesn't exist!");
        const list = new List({
          name: customListName,
          items: defaultItems
        });
        list.save();
        res.redirect("/" + customListName);
      } else {
        // console.log("Exists");
        res.render("list", { listTitle: foundList.name, newListItems: foundList.items });
      }
    }
  });
});

app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({
    name: itemName
  });

  if (listName === "Today"){
    item.save();
    res.redirect("/");
  } else {
    List.findOne({name: listName}, function(err, foundList){
      foundList.items.push(item);
      foundList.save();
      res.redirect("/" + listName);
    });
  }
});


app.post("/delete", function (req, res) {
  console.log(req.body);
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if (listName === "Today") {
    Item.findByIdAndRemove(checkedItemId, function (err) {
      if (!err) {
        // console.log("Successfully Deleted checked item.");
        res.redirect("/");
      }
    });
  } else {
    List.findOneAndUpdate(
      { name: listName },
      { $pull: { items: { _id: checkedItemId } } },
      function (err, foundList) {
        if (!err) {
          res.redirect("/" + listName);
        }
      }
    );
  }
});




app.listen(3000, function () {
  console.log("server is running on port 3000");
});
