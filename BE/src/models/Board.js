const Joi = require("joi");
const {
    OBJECT_ID_RULE,
    OBJECT_ID_RULE_MESSAGE,
} = require("../validations/validators");
const { getDB } = require("../config/mongodb");
const { ObjectId } = require("mongodb");
const { BOARD_TYPES } = require("../utils/constants");
const { COLUMN_COLLECTION_NAME } = require("../models/Column");
const { CARD_COLLECTION_NAME } = require("../models/Card");

exports.BOARD_COLLECTION_NAME = "boards";
exports.BOARD_COLLECTION_SCHEMA = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict(),
    description: Joi.string().required().min(3).max(255).trim().strict(),
    slug: Joi.string().required().min(3).trim().strict(),
    userId: Joi.string()
        .required()
        .pattern(OBJECT_ID_RULE)
        .message(OBJECT_ID_RULE_MESSAGE),
    // columnOrderIds defaults to an empty array, each element of which is a string
    columnOrderIds: Joi.array()
        .items(
            Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
        )
        .default([]),
    type: Joi.string()
        .valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE)
        .required(),
    createAt: Joi.date().timestamp("javascript").default(Date.now),
    createUp: Joi.date().timestamp("javascript").default(null),
    _destroy: Joi.boolean().default(false),
});

//Specifies properties that cannot be updated
const INVALID_UPDATE_FIELDS = ["_id", "createAt"];

exports.create = async (data) => {
    try {
        // validate before create
        const validData = await exports.BOARD_COLLECTION_SCHEMA.validateAsync(
            data,
            {
                abortEarly: false,
            }
        );

        return await getDB()
            .collection(exports.BOARD_COLLECTION_NAME)
            .insertOne(validData);
    } catch (error) {
        throw new Error(error);
    }
};

exports.findById = async (id) => {
    try {
        let result = await getDB()
            .collection(exports.BOARD_COLLECTION_NAME)
            .findOne({ _id: new ObjectId(id) });
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

exports.update = async (boardId, updateData) => {
    try {
        //Filter properties that do not allow updates
        Object.keys(updateData).forEach((fieldName) => {
            if (INVALID_UPDATE_FIELDS.includes(fieldName)) {
                delete updateData.fieldName;
            }
        });

        const result = await getDB()
            .collection(exports.BOARD_COLLECTION_NAME)
            .findOneAndUpdate(
                { _id: new ObjectId(boardId) },
                {
                    $set: updateData,
                },
                { $returnDocument: "after" }
            );
        return result;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

exports.pushColumnOrderIds = async (column) => {
    try {
        const result = await getDB()
            .collection(exports.BOARD_COLLECTION_NAME)
            .findOneAndUpdate(
                { _id: new ObjectId(column.boardId) },
                {
                    $push: { columnOrderIds: new ObjectId(column._id) },
                },
                { $returnDocument: "after" }
            );
        return result;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

exports.pullColumnOrderIds = async (column) => {
    console.log("🚀 ~ exports.pullColumnOrderIds= ~ column:", column);
    try {
        const result = await getDB()
            .collection(exports.BOARD_COLLECTION_NAME)
            .findOneAndUpdate(
                { _id: new ObjectId(column.boardId) },
                {
                    $pull: { columnOrderIds: new ObjectId(column._id) },
                },
                { $returnDocument: "after" }
            );
        return result;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

exports.getDetails = async (id) => {
    console.log("🚀 ~ exports.getDetails= ~ id:", id);
    try {
        let result = await getDB()
            .collection(exports.BOARD_COLLECTION_NAME)
            .aggregate([
                // match by key
                {
                    $match: {
                        _id: new ObjectId(id),
                        _destroy: false,
                    },
                },
                // look outside the collection
                {
                    $lookup: {
                        from: COLUMN_COLLECTION_NAME,
                        localField: "_id",
                        foreignField: "boardId",
                        as: "columns",
                    },
                },
                {
                    $lookup: {
                        from: CARD_COLLECTION_NAME,
                        localField: "_id",
                        foreignField: "boardId",
                        as: "cards",
                    },
                },
            ])
            .toArray();

        console.log("result : " + result);
        return result[0] || {};
    } catch (error) {
        throw new Error(error);
    }
};
