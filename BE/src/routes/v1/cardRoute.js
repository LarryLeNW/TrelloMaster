const express = require("express");
const { StatusCodes } = require("http-status-codes");
const Router = express.Router();
const CardValidation = require("../../validations/CardValidation");
const { createNew, getDetails } = require("../../controllers/CardController");

Router.route("/")
    .get((req, res) => {
        res.status(StatusCodes.OK).json({
            message: "Card router APIs v1 get...",
        });
    })
    .post(CardValidation.createNew, createNew);

Router.route("/:id").put().get(getDetails);

module.exports = Router;
