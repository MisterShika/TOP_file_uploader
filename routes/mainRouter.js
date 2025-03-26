const { Router } = require("express");
const passport = require("passport");
const mainRouter = Router();
const homeController = require("../controllers/homeController");
const accountController = require("../controllers/accountController");

mainRouter.get("/", homeController.getHome);

mainRouter.get("/sign-in", accountController.getSignIn);
mainRouter.post("/sign-in",
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/"
    })
);

mainRouter.get("/sign-up", accountController.getSignUp);
mainRouter.post("/sign-up", accountController.postSignUp);

module.exports = mainRouter;