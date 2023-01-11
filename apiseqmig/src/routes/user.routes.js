const express = require("express");
const usersRouter = express.Router();
const userController = require("../controllers/user.controller.js");

usersRouter.get("/",userController.usersFetcher);

module.exports = usersRouter;


