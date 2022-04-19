const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const port = process.env.PORT;
const baseApiUrl = "/api/v1";

const app = express();

app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("DB Connected");
});

app.use(`${baseApiUrl}/user`, userRoutes);
app.use(`${baseApiUrl}/payment`, paymentRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
