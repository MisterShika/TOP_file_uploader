const { Router } = require("express");
const { PrismaClient } = require("@prisma/client");
const passport = require("passport");
const fileRouter = Router();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const fileController = require("../controllers/fileController");


fileRouter.get("/add-file", fileController.getAddFile);



module.exports = fileRouter;