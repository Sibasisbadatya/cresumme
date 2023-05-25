const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
// const __dirname1 = path.resolve();

const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require('cors');
app.use(cors({
    origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}));

// 4lkF1EytcYjKjTCE
const port = process.env.PORT || 8000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
require("./DB/connection");
app.use(require("./router/router"));
dotenv.config()
app.use(cookieParser());
// app.use(express.static(path.join(__dirname1, "/frontend/build")));

// app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"));
// });


app.listen(port, () => {
    console.log("connected to port 8000");
})