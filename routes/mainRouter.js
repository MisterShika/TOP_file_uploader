const { Router } = require("express");
const passport = require("passport");
const mainRouter = Router();

mainRouter.get("/", (req, res) => {
    res.render("index");
});

module.exports = mainRouter;