require('dotenv').config();

const express = require('express');
const app = express();
const session = require("express-session");
// const passport = require("passport");

const mainRouter = require("./routes/mainRouter");

// require ("./passportConfig");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
// app.use(passport.initialize());
// app.use(passport.session());

app.use("/", mainRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});