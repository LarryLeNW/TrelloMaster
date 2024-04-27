const { StatusCodes } = require("http-status-codes");
const AuthServices = require("../services/authService");
const ApiError = require("../utils/apiErr");

exports.createNew = async (req, res, next) => {
    try {
        const result = await AuthServices.create(req.body);
        res.status(StatusCodes.CREATED).json(result);
    } catch (error) {
        return next(error);
    }
};

exports.checkLogin = async (req, res, next) => {
    try {
        const result = await AuthServices.checkLogin(req.body);
        res.status(StatusCodes.OK).json(result);
    } catch (error) {
        return next(error);
    }
};

exports.getInfo = async (req, res, next) => {
    try {
        const { id } = req.body;
        if (!id)
            throw new ApiError(StatusCodes.NOT_ACCEPTABLE, "Missing params...");

        const result = await AuthServices.getInfo(id);
        res.status(StatusCodes.OK).json(result);
    } catch (error) {
        return next(error);
    }
};
