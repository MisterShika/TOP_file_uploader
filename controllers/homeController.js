const db = require("../db/queries");
const fs = require("fs").promises;

async function getHome(req, res) {
    const userId = req.user?.id || null;
    let folders = [];
    let files;

    if (userId) {
        const folderPath = `uploads/${userId}/`;
        try {
            const files = await fs.readdir(folderPath, { withFileTypes: true });
            folders = files
                .filter(file => file.isDirectory())
                .map(dir => ({
                    name: dir.name,
                    path: `uploads/${userId}/${dir.name}`
                }));
        } catch (err) {
            console.error("Error reading directory:", err);
            return res.status(500).send("Error reading directory");
        }
        files = await db.getFoldersByUserId(userId) || null;
    }

    res.render("index", {
        userId,
        email: req.user?.email || null,
        authenticated: req.isAuthenticated(),
        files,
        folders
    });
}

module.exports = {
    getHome
}