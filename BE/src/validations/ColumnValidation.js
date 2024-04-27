const Joi = require("joi");
const { StatusCodes } = require("http-status-codes");
const ApiError = require("../utils/apiErr");
const {
    OBJECT_ID_RULE,
    OBJECT_ID_RULE_MESSAGE,
} = require("../validations/validators");

exports.createNew = async (req, res, next) => {
    const correctCondition = Joi.object({
        boardId: Joi.string()
            .required()
            .pattern(OBJECT_ID_RULE)
            .message(OBJECT_ID_RULE_MESSAGE),
        title: Joi.string().required().min(3).max(50).trim().strict(),
    });

    try {
        await correctCondition.validateAsync(req.body, { abortEarly: false });
        next();
    } catch (error) {
        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error)));
    }
};

exports.delete = async (req, res, next) => {
    const correctCondition = Joi.object({
        id: Joi.string()
            .required()
            .pattern(OBJECT_ID_RULE)
            .message(OBJECT_ID_RULE_MESSAGE),
    });
    try {
        await correctCondition.validateAsync(req.params);
        next();
    } catch (error) {
        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error)));
    }
};

exports.update = async (req, res, next) => {
    const correctCondition = Joi.object({
        boardId: Joi.string()
            .pattern(OBJECT_ID_RULE)
            .message(OBJECT_ID_RULE_MESSAGE),
        title: Joi.string().min(3).max(50).trim().strict(),
        cardOrderIds: Joi.array().items(
            Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
        ),
    });

    try {
        // set abortEarly is false to return all error
        await correctCondition.validateAsync(req.body, {
            abortEarly: false,
            allowUnknown: true,
        });
        next();
    } catch (error) {
        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error)));
    }
};
