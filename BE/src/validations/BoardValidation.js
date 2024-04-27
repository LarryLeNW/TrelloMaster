const Joi = require("joi");
const { StatusCodes } = require("http-status-codes");
const ApiError = require("../utils/apiErr");
const { BOARD_TYPES } = require("../utils/constants");
const { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } = require("./validators");

exports.createNew = async (req, res, next) => {
    const correctCondition = Joi.object({
        title: Joi.string().required().min(3).max(50).trim().strict(),
        description: Joi.string().required().min(3).max(255).trim().strict(),
        userId: Joi.string()
            .required()
            .pattern(OBJECT_ID_RULE)
            .message(OBJECT_ID_RULE_MESSAGE),
        type: Joi.string()
            .valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE)
            .required(),
    });
    try {
        await correctCondition.validateAsync(req.body, { abortEarly: false });
        next();
    } catch (error) {
        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error)));
    }
};

exports.update = async (req, res, next) => {
    const correctCondition = Joi.object({
        title: Joi.string().min(3).max(50).trim().strict(),
        description: Joi.string().min(3).max(255).trim().strict(),
        type: Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE),
        columnOrderIds: Joi.array().items(
            Joi.string()
                .required()
                .pattern(OBJECT_ID_RULE)
                .message(OBJECT_ID_RULE_MESSAGE)
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
exports.moveCardDifferentCol = async (req, res, next) => {
    console.log("moveCardDifferentCol");
    const correctCondition = Joi.object({
        currentCardId: Joi.string()
            .required()
            .pattern(OBJECT_ID_RULE)
            .message(OBJECT_ID_RULE_MESSAGE),
        prevColumnId: Joi.string()
            .required()
            .pattern(OBJECT_ID_RULE)
            .message(OBJECT_ID_RULE_MESSAGE),
        prevCardOrderIds: Joi.array()
            .required()
            .items(
                Joi.string()
                    .pattern(OBJECT_ID_RULE)
                    .message(OBJECT_ID_RULE_MESSAGE)
            ),
        nextColumnId: Joi.string()
            .required()
            .pattern(OBJECT_ID_RULE)
            .message(OBJECT_ID_RULE_MESSAGE),
        nextCardOrderIds: Joi.array()
            .required()
            .items(
                Joi.string()
                    .pattern(OBJECT_ID_RULE)
                    .message(OBJECT_ID_RULE_MESSAGE)
            ),
    });

    try {
        // set abortEarly is false to return all error
        await correctCondition.validateAsync(req.body, {
            abortEarly: false,
        });
        next();
    } catch (error) {
        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error)));
    }
};
