const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const port = 8080;

const app = express();

app.use(bodyParser.json());

const MONGO_URI = `mongodb://${process.env.MONGO_ID}:${process.env.MONGO_PW}@travolution-shard-00-00.tnre0.mongodb.net:27017,travolution-shard-00-01.tnre0.mongodb.net:27017,travolution-shard-00-02.tnre0.mongodb.net:27017/travolution_db?ssl=true&replicaSet=atlas-ex59qb-shard-0&authSource=admin&retryWrites=true&w=majority`;

mongoose.connect(MONGO_URI).then(() => {
  console.log("DB Connected");
});

app.use("/api", userRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
