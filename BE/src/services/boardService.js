const { slugify } = require("../utils/fomarters");
const ApiError = require("../utils/apiErr");
const BoardModel = require("../models/Board");
const { StatusCodes } = require("http-status-codes");
const { cloneDeep } = require("lodash");
const ColumnModel = require("../models/Column");
const CardModel = require("../models/Card");
const UserModel = require("../models/User");
exports.create = async (data) => {
    try {
        const { title, description, userId, type } = data;

        let userCreateBoard = await UserModel.findOneById(userId);
        if (!userCreateBoard)
            throw new ApiError(
                StatusCodes.NOT_FOUND,
                `This User with Id ${userId} no exit`
            );

        const newBoard = {
            ...data,
            slug: slugify(data.title),
        };

        const createdBoard = await BoardModel.create(newBoard);

        await UserModel.pushBoardToUser(userId, {
            _id: createdBoard.insertedId,
            title,
            description,
            type,
            createAt: Date.now(),
        });

        return await BoardModel.findById(createdBoard.insertedId);
    } catch (error) {
        throw error;
    }
};

exports.getDetails = async (boardId) => {
    try {
        const result = await BoardModel.getDetails(boardId);

        if (!result)
            throw new ApiError(StatusCodes.NOT_FOUND, "Board not found");

        const resBoard = cloneDeep(result);

        resBoard.columns.forEach((col) => {
            col.cards = resBoard.cards.filter((card) =>
                card.columnId.equals(col._id)
            );
        });

        delete resBoard.cards;
        return resBoard;
    } catch (error) {
        throw error;
    }
};

exports.update = async (boardId, data) => {
    try {
        const updateData = { ...data, updateAt: Date.now() };

        const updateBoard = await BoardModel.update(boardId, updateData);

        return updateBoard;
    } catch (error) {
        throw error;
    }
};

exports.moveCardDifferentCol = async (reqBody) => {
    try {
        await ColumnModel.update(reqBody.prevColumnId, {
            cardOrderIds: reqBody.prevCardOrderIds,
            updateAt: Date.now(),
        });

        await ColumnModel.update(reqBody.nextColumnId, {
            cardOrderIds: reqBody.nextCardOrderIds,
            updateAt: Date.now(),
        });
        await CardModel.update(reqBody.currentCardId, {
            columnId: reqBody.nextColumnId,
        });
        return { updateResult: "Oke!!" };
    } catch (error) {
        throw error;
    }
};
