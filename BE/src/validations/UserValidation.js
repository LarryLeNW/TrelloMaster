const Joi = require("joi");
const { StatusCodes } = require("http-status-codes");
const ApiError = require("../utils/apiErr");
const { BOARD_TYPES } = require("../utils/constants");
const { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } = require("./validators");

exports.createNew = async (req, res, next) => {
    const correctCondition = Joi.object({
        email: Joi.string().required().min(10).max(50).trim().strict(),
        username: Joi.string().required().min(3).max(50).trim().strict(),
        password: Joi.string().required().min(3).max(50).trim().strict(),
        typeAccount: Joi.string()
            .min(3)
            .max(50)
            .trim()
            .strict()
            .default("root"),
    });
    try {
        await correctCondition.validateAsync(req.body, { abortEarly: false });
        next();
    } catch (error) {
        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error)));
    }
};

exports.checkLogin = async (req, res, next) => {
    const correctCondition = Joi.object({
        username: Joi.string().required().min(3).max(50).trim().strict(),
        password: Joi.string().required().min(3).max(50).trim().strict(),
    });
    try {
        await correctCondition.validateAsync(req.body, { abortEarly: false });
        next();
    } catch (error) {
        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error)));
    }
};
