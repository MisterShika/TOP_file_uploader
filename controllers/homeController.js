const fs = require('fs');
const path = require('path');

async function getHome (req, res) {
    let folderExists = false;
    let userId;

    if(req.user){
        userId = req.user?.id || null;
        const uploadsDir = path.join(__dirname, '..', 'uploads', userId);
        folderExists = userId ? fs.existsSync(uploadsDir) : false;
    }
 
    res.render("index",{
        userId,
        email: req.user?.email || null,
        authenticated: req.isAuthenticated(),
        folderExists
    });
}

module.exports = {
    getHome
}