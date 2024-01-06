const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const app = express();
var cors = require("cors");
require("dotenv").config();
let port = process.env.PORT || 5544;
let DBURI = process.env.DBURI;
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/sounds", express.static(path.join(__dirname, "sounds")));
mongoose
  .connect(`${DBURI}`)
  .then(() => {
    console.log("database connected ");
  })
  .catch((err) => {
    console.log(err);
    console.log("can't connect to database");
  });

app.use("/api/user", require("./routes/user"));

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`server is running on  ${port}`);
});
