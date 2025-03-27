const db = require("../db/queries");

async function getAddFile (req, res) {
    res.render("addFile");
}

module.exports = {
    getAddFile,
}