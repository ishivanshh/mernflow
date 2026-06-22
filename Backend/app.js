const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const connectDb = require("./db/db.js");
connectDb();
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes.js");
const captainRoutes = require("./routes/captain.routes.js");
const mapsRoutes = require("./routes/maps.routes.js");
const rideRoutes = require('./routes/ride.routes.js');

//only for development phase we are accepting request from every website but at after it we will add domain of that website and will accept only that.
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.get("/" , (req , res) => {
    res.send("Hello World");
});

app.use("/users" , userRoutes);
app.use("/captains" , captainRoutes);
app.use("/maps", mapsRoutes);
app.use("/rides", rideRoutes);

module.exports = app;

