const { StatusCodes } = require("http-status-codes");
const ApiError = require("../utils/apiErr");
const CardServices = require("../services/cardService");

exports.createNew = async (req, res, next) => {
    try {
        const result = await CardServices.create(req.body);
        res.status(StatusCodes.CREATED).json(result);
    } catch (error) {
        return next(error);
    }
};

exports.getDetails = async (req, res, next) => {
    try {
        const { id: cardId } = req.params;
        console.log("🚀 ~ exports.getDetails= ~ cardId:", cardId);

        const result = await CardServices.getDetails(cardId);
        res.status(StatusCodes.OK).json(result);
    } catch (error) {
        return next(error);
    }
};
