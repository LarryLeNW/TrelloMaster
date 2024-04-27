const express = require("express");
const { StatusCodes } = require("http-status-codes");
const Router = express.Router();
const BoardValidation = require("../../validations/BoardValidation");
const {
    createNew,
    getDetails,
    update,
    moveCardDifferentCol,
} = require("../../controllers/BoardController");

Router.route("/")
    .get((req, res) => {
        res.status(StatusCodes.OK).json({
            message: "Board router APIs v1 get...",
        });
    })
    .post(BoardValidation.createNew, createNew);

Router.route("/:id").put(BoardValidation.update, update).get(getDetails);

Router.route("/supports/moving_card").put(
    BoardValidation.moveCardDifferentCol,
    moveCardDifferentCol
);
module.exports = Router;
