const Joi = require("joi");
const { StatusCodes } = require("http-status-codes");
const ApiError = require("../utils/apiErr");
const { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } = require("./validators");

exports.createNew = async (req, res, next) => {
    const correctCondition = Joi.object({
        boardId: Joi.string()
            .required()
            .pattern(OBJECT_ID_RULE)
            .message(OBJECT_ID_RULE_MESSAGE),
        title: Joi.string().required().min(3).max(50).trim().strict(),
        columnId: Joi.string().required().min(3).max(50).trim().strict(),
    });

    try {
        await correctCondition.validateAsync(req.body, { abortEarly: false });
        next();
    } catch (error) {
        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error)));
    }
};
