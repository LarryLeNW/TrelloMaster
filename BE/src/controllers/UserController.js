const ApiError = require("../utils/apiErr");
const UserServices = require("../services/userService");
const { StatusCodes } = require("http-status-codes");

exports.getOneUserById = async (req, res, next) => {
    try {
        const { id } = req.body;
        if (!id)
            throw new ApiError(StatusCodes.NOT_ACCEPTABLE, "Missing params...");

        const result = await UserServices.getOneUserById(id);
        res.status(StatusCodes.OK).json(result);
    } catch (error) {
        return next(error);
    }
};
