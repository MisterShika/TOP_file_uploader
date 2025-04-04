const { Router } = require("express");
const fileRouter = Router();
const fileController = require("../controllers/fileController");

fileRouter.post("/add-file", fileController.postAddFile);

fileRouter.post("/add-folder", fileController.postAddFolder);

fileRouter.post("/rename-folder", fileController.postRenameFolder);

fileRouter.post("/delete-folder", fileController.postDeleteFolder);

module.exports = fileRouter;