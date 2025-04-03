const db = require("../db/queries");
const fs = require('fs');
const path = require('path');
const multer  = require('multer');

async function postAddFolder (req, res) {
    if(req.user){
        const userId = req.user?.id || null;
        const {folderName, currentPath} = req.body;
        const nestedPath = req.params[0] || "";
        const testPath = path.join(currentPath, folderName);

        fs.mkdir(testPath, { recursive: true }, (err) => {
            if (err) {
                return res.status(500).send("Error creating folder.");
            }
            res.redirect(req.headers.referer || `/uploads/${userId}/${nestedPath}`);
        });
    }
}

async function postRenameFolder (req, res) {
    if(req.user){
        const {folderName, currentPath} = req.body;

        const parentDir = path.dirname(currentPath);
        const newPath = path.join(parentDir, folderName);
        
        fs.rename(currentPath, newPath, (err) => {
            if (err) {
                console.error('Error renaming directory:', err);
            } else {
                console.log("Renaming...");
                const parts = req.headers.referer.split('/');
                parts[parts.length - 1] = folderName;
                const updatedNestedPath = parts.join('/');
                res.redirect(updatedNestedPath);
            }
        });
    }
}

async function postDeleteFolder (req, res) {
    if(req.user){
        console.log("Post Delete");
        res.redirect("/");
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
    postRenameFolder,
    postDeleteFolder,
    getAddFile,
    postAddFile
}