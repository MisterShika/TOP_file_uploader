const db = require("./db");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcryptjs");

passport.use(
    new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, async (username, password, done) => {
        console.log("Hey");
        try {
            const { rows } = await db.query('SELECT * FROM "User" WHERE email = $1', [username]);
            const user = rows[0];
            if (!user) {
                console.log("No user");
                return done(null, false, { message: "Incorrect username" });
            }
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                console.log("Wrong password");
                return done(null, false, { message: "Incorrect password" })
            }
            console.log("Success");
            return done(null, user);
        } catch(err) {
            return done(err);
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});
  
passport.deserializeUser(async (id, done) => {
    try {
        const { rows } = await db.query('SELECT * FROM "User" WHERE id = $1', [id]);
        const user = rows[0];
        done(null, user);
    } catch(err) {
        done(err);
    }
});