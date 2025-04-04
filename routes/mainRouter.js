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

mainRouter.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.session.destroy(() => {
            res.clearCookie("connect.sid");
            res.redirect("/");
        });
    });
});

const path = require('path');
const fs = require('fs');

mainRouter.get('/uploads/:userId/*.:ext', (req, res) => {
    const filePath = path.join(__dirname, '..', 'uploads', req.params.userId, req.params[0]) + '.' + req.params.ext;
    console.log(filePath);
    res.sendFile(filePath);
});

mainRouter.get('/uploads/:userId/*', homeController.uploadNav);


module.exports = mainRouter;