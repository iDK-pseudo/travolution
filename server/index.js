const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const localStrategy = require("./utils/passportStrategy");

const port = process.env.PORT;
const baseApiUrl = "/api/v1";

const app = express();

app.use(
  session({
    secret: "AhasbcASBASDjnakjnk",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(
  new LocalStrategy(
    { usernameField: "emailId", passwordField: "password" },
    localStrategy
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("DB Connected");
});

app.use(`${baseApiUrl}/user`, userRoutes);
app.use(`${baseApiUrl}/payment`, paymentRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
