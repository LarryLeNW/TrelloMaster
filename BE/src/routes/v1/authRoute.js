const express = require("express");
const { StatusCodes } = require("http-status-codes");
const Router = express.Router();
const UserValidation = require("../../validations/UserValidation");
const {
    createNew,
    checkLogin,
    getInfo,
} = require("../../controllers/AuthController");

Router.route("/").get((req, res) => {
    res.status(StatusCodes.OK).json({
        message: "Auth router APIs v1 get...",
    });
});

Router.route("/login").post(UserValidation.checkLogin, checkLogin);
Router.route("/register").post(UserValidation.createNew, createNew);
Router.route("/getInfo").post(getInfo);

module.exports = Router;
