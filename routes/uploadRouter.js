const { Router } = require("express");
const { PrismaClient } = require("@prisma/client");
const passport = require("passport");
const mainRouter = Router();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })



module.exports = mainRouter;