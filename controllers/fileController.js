const db = require("../db/queries");
const fs = require('fs');
const path = require('path');
const multer  = require('multer');

async function getAddFile (req, res) {
    let folderExists = false;
    let userId;

    if(req.user){
        userId = req.user?.id || null;
        const uploadsDir = path.join(__dirname, '..', 'uploads', userId);
        folderExists = userId ? fs.existsSync(uploadsDir) : false;
    }

    res.render("addFile", {
        userId,
        folderExists,
        authenticated: req.isAuthenticated()
    });
}

async function postAddFile (req, res) {
    const userId = req.user?.id || null;
    if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
    }
    const uploadPath = `uploads/${userId}`;
    fs.mkdirSync(uploadPath, { recursive: true });
    const upload = multer({ dest: uploadPath }).single("theFile");
    upload(req, res, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!req.file) return res.status(400).json({ error: "No file uploaded" });
        res.redirect("/");
    });
}

module.exports = {
    getAddFile,
    postAddFile
}