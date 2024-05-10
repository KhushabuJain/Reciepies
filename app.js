const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");

mongoose.connect("mongodb://localhost:27017/recepiewebpage", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const contactSchema = {
  name: String,
  email: String,
  phone: String, // Change type to String
  message: String
};

const Contact = mongoose.model("Contact", contactSchema);

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.get("/contact", function (req, res) {
  res.render("contact");
});

app.post("/contact", function (req, res) {
  const contactData = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    message: req.body.message
  };
  const contact = new Contact(contactData);
  contact.save(function (err) {
    if (err) {
      console.error(err);
      res.status(500).send("Error occurred while saving contact.");
    } else {
      res.render("contact");
    }
  });
});

app.listen(3000, function () {
  console.log("App is running on Port 3000");
});
