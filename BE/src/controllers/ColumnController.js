const { StatusCodes } = require("http-status-codes");
const ApiError = require("../utils/apiErr");
const ColumnServices = require("../services/columnService");

exports.createNew = async (req, res, next) => {
    try {
        const result = await ColumnServices.create(req.body);
        res.status(StatusCodes.CREATED).json(result);
    } catch (error) {
        return next(error);
    }
};

exports.update = async (req, res, next) => {
    try {
        const result = await ColumnServices.update(req.params.id, req.body);
        res.status(StatusCodes.CREATED).json(result);
    } catch (error) {
        return next(error);
    }
};

exports.deleteItem = async (req, res, next) => {
    try {
        const result = await ColumnServices.delete(req.params.id);
        res.status(StatusCodes.CREATED).json(result);
    } catch (error) {
        return next(error);
    }
};
exports.getDetails = async (req, res, next) => {
    try {
        const { id: columnId } = req.params;
        console.log("🚀 ~ exports.getDetails= ~ columnId:", columnId);

        const result = await ColumnServices.getDetails(columnId);
        res.status(StatusCodes.OK).json(result);
    } catch (error) {
        return next(error);
    }
};
