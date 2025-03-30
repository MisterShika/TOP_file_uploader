const db = require("../db/queries");
const fs = require('fs');
const path = require('path');
const multer  = require('multer');

async function postAddFolder (req, res) {
    console.log("Post Add Folder!");
    if(req.user){
        const userId = req.user?.id || null;
        const {folderName} = req.body;
        const folderPath = `uploads/${userId}/${folderName}`;
        fs.mkdir(folderPath, { recursive: true }, (err) => {
            if (err) {
                return res.status(500).send("Error creating folder.");
            }
            res.redirect("/");
        });
    }
}

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
        const fileName = req.file.filename;
        const fileExtension = path.extname(req.file.originalname);
        const filePath = `uploads/${userId}/${fileName}${fileExtension}`;

        fs.renameSync(
            path.join(uploadPath, fileName),
            path.join(uploadPath, fileName + fileExtension)
        );

        db.addFile(fileName, filePath, userId);
        console.log(`Uploaded file: ${fileName}`);
        console.log(`File extension: ${fileExtension}`);
        res.redirect("/");
    });
}

module.exports = {
    postAddFolder,
    getAddFile,
    postAddFile
}