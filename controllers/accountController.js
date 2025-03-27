const db = require("../db/queries");

async function getSignIn (req, res) {
    res.render("signIn");
}

async function getSignUp (req, res) {
    res.render("signUp");
}

async function postSignUp (req, res) {
    const {email, password} = req.body;
    db.addUser(email, password);
    res.redirect("/");
}

module.exports = {
    getSignIn,
    getSignUp,
    postSignUp
}