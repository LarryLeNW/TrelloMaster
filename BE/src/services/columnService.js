const { slugify } = require("../utils/fomarters");
const ApiError = require("../utils/apiErr");
const ColumnModel = require("../models/Column");
const CardModel = require("../models/Card");
const BoardModel = require("../models/Board");
const { StatusCodes } = require("http-status-codes");
const { cloneDeep } = require("lodash");
const { pushColumnOrderIds } = require("../models/Board");

exports.create = async (data) => {
    console.log("🚀 ~ exports.create= ~ data:", data);
    try {
        const newColumn = {
            ...data,
        };
        console.log("🚀 ~ exports.create= ~ newColumn:", newColumn);

        const createdColumn = await ColumnModel.create(newColumn);

        const getNewCol = await ColumnModel.findById(createdColumn.insertedId);

        if (getNewCol) {
            console.log("🚀 ~ exports.create= ~ getNewCol:", getNewCol);
            getNewCol.cards = [];
            await pushColumnOrderIds(getNewCol);
        }

        return getNewCol;
    } catch (error) {
        throw error;
    }
};

exports.update = async (columnId, data) => {
    try {
        const updateData = { ...data, updateAt: Date.now() };

        const updateBoard = await ColumnModel.update(columnId, updateData);

        return updateBoard;
    } catch (error) {
        throw error;
    }
};

exports.delete = async (columnId) => {
    try {
        const targetColumn = await ColumnModel.findById(columnId);

        if (!targetColumn) {
            throw new ApiError(StatusCodes.NOT_FOUND, "Column not found");
        }

        await ColumnModel.deleteOneById(columnId);
        await CardModel.deleteManyByColumnId(columnId);
        await BoardModel.pullColumnOrderIds(targetColumn);
        return { deleteResult: "Column and its Cards deleted successfully" };
    } catch (error) {
        throw error;
    }
};

exports.getDetails = async (ColumnId) => {
    try {
        const result = await ColumnModel.getDetails(ColumnId);
        console.log("🚀 ~ exports.getDetails= ~ result:", result);

        if (!result)
            throw new ApiError(StatusCodes.NOT_FOUND, "Column not found");

        const resColumn = cloneDeep(result);

        resColumn.columns.forEach((col) => {
            col.cards = resColumn.cards.filter((card) =>
                card.columnId.equals(col._id)
            );
        });

        delete resColumn.cards;

        return resColumn;
    } catch (error) {
        throw error;
    }
};
