const express = require("express");
const { StatusCodes } = require("http-status-codes");
const Router = express.Router();
const { getOneUserById } = require("../../controllers/UserController");

Router.route("/")
    .get((req, res) => {
        res.status(StatusCodes.OK).json({
            message: "User router APIs v1 get...",
        });
    })
    .post(getOneUserById);

module.exports = Router;
