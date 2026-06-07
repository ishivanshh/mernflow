const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");

//only for development phase we are accepting request from every website but at after it we will add domain of that website and will accept only that.
app.use(cors());


app.get("/" , (req , res) => {
    res.send("Hello World");
});

module.exports = app;

