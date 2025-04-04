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
        const {currentPath} = req.body;
        console.log("Post Delete");
        console.log(`Current Path ${currentPath}`);

        fs.rm(currentPath, { recursive: true, force: true }, (err) => {
            if (err) {
                console.error('Error removing directory:', err);
            } else {
                let parts = req.headers.referer.split('/');
                parts = parts.slice(0, -1);
                const updatedPath = parts.join('/');
                res.redirect(updatedPath);
            }
        });
    }
}

async function postAddFile (req, res) {
    if(req.user){
        console.log("Post Add File");
        const upload = multer().single('theFile');
        upload(req, res, (err) => {
            const {currentPath} = req.body;
            const file = req.file;
            const targetPath = path.join(currentPath, file.originalname);
            fs.writeFile(targetPath, file.buffer, (err) => {
                if (err) {
                    console.error('Error Adding File:', err);
                }else{
                    res.redirect(req.headers.referer);
                }
            })
        });
    }
}

async function postDeleteFile (req, res) {
    const {fileName, currentPath} = req.body;
    console.log(`Deleting: ${fileName}`);
    console.log(`Path: ${currentPath}`);
    fs.unlink(fileName, (err) => {
        if (err) {
            console.error('Error deleting file:', err);
        }
        console.log('File deleted successfully');
        res.redirect(req.headers.referer);
    });
}

module.exports = {
    postAddFolder,
    postRenameFolder,
    postDeleteFolder,
    postAddFile,
    postDeleteFile
}