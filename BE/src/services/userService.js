const ApiError = require("../utils/apiErr");
const UserModel = require("../models/User");
const { StatusCodes } = require("http-status-codes");

exports.getOneUserById = async (id) => {
    try {
        const result = await UserModel.findOneById(id);
        if (!result)
            throw new ApiError(StatusCodes.NOT_FOUND, "User not found !!!");
        return result;
    } catch (error) {
        throw error;
    }
};
