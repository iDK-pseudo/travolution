const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
app.use(bodyParser.json());


const userRoutes = require("./routes/userRoutes");
const port = process.env.PORT;
const MONGO_URI = `mongodb://${process.env.MONGO_ID}:${process.env.MONGO_PW}@${process.env.MONGO_URI}`;

mongoose.connect(MONGO_URI).then(() => {
  console.log("DB Connected");
});

app.use("/api", userRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
