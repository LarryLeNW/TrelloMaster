const { slugify } = require("../utils/fomarters");
const ApiError = require("../utils/apiErr");
const CardModel = require("../models/Card");
const { StatusCodes } = require("http-status-codes");
const { cloneDeep } = require("lodash");
const { pushCardOrderIds } = require("../models/Column");

exports.create = async (data) => {
    console.log("🚀 ~ exports.create= ~ data:", data);
    try {
        const newCard = {
            ...data,
        };
        console.log("🚀 ~ exports.create= ~ newCard:", newCard);

        const createdCard = await CardModel.create(newCard);
        const getNewCard = await CardModel.findById(createdCard.insertedId);

        if (getNewCard) {
            await pushCardOrderIds(getNewCard);
        }

        return getNewCard;
    } catch (error) {
        throw error;
    }
};

exports.getDetails = async (CardId) => {
    try {
        const result = await CardModel.getDetails(CardId);
        console.log("🚀 ~ exports.getDetails= ~ result:", result);

        if (!result)
            throw new ApiError(StatusCodes.NOT_FOUND, "Card not found");

        const resCard = cloneDeep(result);

        resCard.columns.forEach((col) => {
            col.cards = resCard.cards.filter((card) =>
                card.columnId.equals(col._id)
            );
        });

        delete resCard.cards;
        return resCard;
    } catch (error) {
        throw error;
    }
};
