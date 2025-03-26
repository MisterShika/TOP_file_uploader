const { Router } = require("express");
const { PrismaClient } = require("@prisma/client");
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

// mainRouter.get("/debug-session", (req, res) => {
//     res.json({
//       sessionID: req.sessionID,
//       user: req.user || null,
//       authenticated: req.isAuthenticated(),
//     });
//   });

module.exports = mainRouter;