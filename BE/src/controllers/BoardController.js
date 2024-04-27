const { StatusCodes } = require("http-status-codes");
const ApiError = require("../utils/apiErr");
const BoardServices = require("../services/boardService");

exports.createNew = async (req, res, next) => {
    try {
        const result = await BoardServices.create(req.body);
        res.status(StatusCodes.CREATED).json(result);
    } catch (error) {
        return next(error);
    }
};

exports.update = async (req, res, next) => {
    try {
        const result = await BoardServices.update(req.params.id, req.body);
        res.status(StatusCodes.OK).json(result);
    } catch (error) {
        // here will go to concentration error middleware
        return next(error);
    }
};

exports.moveCardDifferentCol = async (req, res, next) => {
    try {
        const result = await BoardServices.moveCardDifferentCol(req.body);
        res.status(StatusCodes.OK).json(result);
    } catch (error) {
        // here will go to concentration error middleware
        return next(error);
    }
};

exports.getDetails = async (req, res, next) => {
    try {
        const { id: boardId } = req.params;
        const result = await BoardServices.getDetails(boardId);
        res.status(StatusCodes.OK).json(result);
    } catch (error) {
        return next(error);
    }
};
