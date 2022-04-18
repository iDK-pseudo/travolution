const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
app.use(bodyParser.json());

const userRoutes = require("./routes/userRoutes");
const port = process.env.PORT;

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("DB Connected");
});

app.use("/api", userRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
