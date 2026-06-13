//Import express -> import dotenv-> declare port -> middleware(JSON) -> mount("/api/v1") -> database -> start server -> default route



const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());

const blog = require("./routes/blog");
//mount
app.use("/api/v1", blog);

//Connect Database
const dbConnect = require("./config/database");
dbConnect();

//Start the server
app.listen(PORT, () => {
    console.log(`App is started at Port no ${PORT}`)
})

//Default route
app.get("/", (req, res) => {
    res.send(`<h1>This is my Homepage</h1>`)
})
