const ApiError = require("../utils/apiErr");
const UserModel = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { v4: uuidv4 } = require("uuid");

exports.create = async (data) => {
    try {
        const createdUser = await UserModel.create(data);
        return await UserModel.findOneById(createdUser.insertedId);
    } catch (error) {
        throw error;
    }
};

exports.checkLogin = async (data) => {
    try {
        const { username, password } = data;
        const result = await UserModel.checkLogin(username, password);
        console.log("🚀 ~ result:", result);

        if (!result)
            throw new ApiError(StatusCodes.NOT_FOUND, "User not found !!!");
        return result;
    } catch (error) {
        throw error;
    }
};

exports.getInfo = async (id) => {
    try {
        const result = await UserModel.findOneById(id);
        if (!result)
            throw new ApiError(StatusCodes.NOT_FOUND, "User not found !!!");
        return result;
    } catch (error) {
        throw error;
    }
};
