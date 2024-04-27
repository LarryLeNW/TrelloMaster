const express = require("express");
const { StatusCodes } = require("http-status-codes");
const Router = express.Router();
const ColumnValidation = require("../../validations/ColumnValidation");
const {
    createNew,
    getDetails,
    update,
    deleteItem,
} = require("../../controllers/ColumnController");

Router.route("/")
    .get((req, res) => {
        res.status(StatusCodes.OK).json({
            message: "Column router APIs v1 get...",
        });
    })
    .post(ColumnValidation.createNew, createNew);

Router.route("/:id")
    .put(ColumnValidation.update, update)
    .get(getDetails)
    .delete(ColumnValidation.delete, deleteItem);
module.exports = Router;
