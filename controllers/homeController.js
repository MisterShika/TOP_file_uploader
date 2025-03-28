const db = require("../db/queries");

async function getHome (req, res) {
    const userId = req.user?.id || null;
    let folder;
    if(userId){
        folder = await db.getFoldersByUserId(userId) || null;
    }

    res.render("index",{
        userId,
        email: req.user?.email || null,
        authenticated: req.isAuthenticated(),
        folder
    });
}

module.exports = {
    getHome
}