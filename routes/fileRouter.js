const { Router } = require("express");
const { PrismaClient } = require("@prisma/client");
const passport = require("passport");
const fileRouter = Router();
const multer  = require('multer')
const fileController = require("../controllers/fileController");


fileRouter.get("/add-file", fileController.getAddFile);
fileRouter.post("/add-file", fileController.postAddFile);

fileRouter.post("/add-folder", fileController.postAddFolder);



module.exports = fileRouter;