const express = require("express");
const { StatusCodes } = require("http-status-codes");
const BoardRouter = require("./boardRoute");
const CardRouter = require("./cardRoute");
const ColumnRouter = require("./columnRoute");
const AuthRouter = require("./authRoute");
const UserRouter = require("./userRoute");
const Router = express.Router();

Router.get("/status", (req, res) => {
    res.status(StatusCodes.OK).json({
        message: "APIs v1 are ready to use...",
    });
});

Router.use("/boards", BoardRouter);
Router.use("/columns", ColumnRouter);
Router.use("/cards", CardRouter);
Router.use("/auth", AuthRouter);
Router.use("/users", UserRouter);

module.exports = Router;
