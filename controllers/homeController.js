const db = require("../db/queries");
const fs = require("fs").promises;
const path = require('path');

async function getHome(req, res) {
    const userId = req.user?.id || null;
    let folders = [];
    let files;
    let currentPath;

    if (userId) {
        currentPath = `uploads/${userId}/`;
        try {
            files = await fs.readdir(currentPath, { withFileTypes: true });
            folders = files
                .filter(file => file.isDirectory())
                .map(dir => ({
                    name: dir.name,
                    path: `uploads/${userId}/${dir.name}`
                }));
            files = files
                .filter(file => !file.isDirectory())
                .map(file => ({
                    name: file.name,
                    path: path.join(currentPath, file.name).replace(/\\/g, '/'),
                }));
        } catch (err) {
            console.error("Error reading directory:", err);
            return res.status(500).send("Error reading directory");
        }
    }

    res.render("index", {
        userId,
        email: req.user?.email || null,
        authenticated: req.isAuthenticated(),
        folders,
        files,
        currentPath
    });
}

async function uploadNav (req, res) {
    const userId = req.user?.id || null;
    const allDirectory = req.path.split('/');
    const workingDirectory = allDirectory[allDirectory.length - 1];
    let currentPath;
    let files;
    let folders = [];

    if (userId) {
        currentPath = req.originalUrl.replace(/^\/+/, "");
        try {
            files = await fs.readdir(currentPath, { withFileTypes: true });
            folders = files
                .filter(file => file.isDirectory())
                .map(dir => ({
                    name: dir.name,
                }));
            files = files
                .filter(file => !file.isDirectory())
                .map(file => ({
                    name: file.name,
                    path: path.join(currentPath, file.name).replace(/\\/g, '/'),
                }));
        } catch (err) {
            console.error("Error reading directory:", err);
            return res.status(500).send("Error reading directory");
        }
    }

    res.render("directory", {
        userId,
        email: req.user?.email || null,
        authenticated: req.isAuthenticated(),
        currentPath,
        folders,
        files,
        workingDirectory
    });
}

module.exports = {
    getHome,
    uploadNav
}