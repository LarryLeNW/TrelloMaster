const Joi = require("joi");
const { getDB } = require("../config/mongodb");
const {
    OBJECT_ID_RULE,
    OBJECT_ID_RULE_MESSAGE,
} = require("../validations/validators");
const { ObjectId } = require("mongodb");

// Define Collection (name & schema)
exports.CARD_COLLECTION_NAME = "cards";
exports.CARD_COLLECTION_SCHEMA = Joi.object({
    boardId: Joi.string()
        .required()
        .pattern(OBJECT_ID_RULE)
        .message(OBJECT_ID_RULE_MESSAGE),
    columnId: Joi.string()
        .required()
        .pattern(OBJECT_ID_RULE)
        .message(OBJECT_ID_RULE_MESSAGE),

    title: Joi.string().required().min(3).max(50).trim().strict(),

    description: Joi.string().optional(),

    createdAt: Joi.date().timestamp("javascript").default(Date.now),
    updatedAt: Joi.date().timestamp("javascript").default(null),
    _destroy: Joi.boolean().default(false),
});

const INVALID_UPDATE_FIELDS = ["_id", "createAt", "boardId"];

exports.create = async (data) => {
    try {
        // validate before create
        const validData = await exports.CARD_COLLECTION_SCHEMA.validateAsync(
            data,
            {
                abortEarly: false,
            }
        );

        return await getDB()
            .collection(exports.CARD_COLLECTION_NAME)
            .insertOne({
                ...validData,
                boardId: new ObjectId(validData.boardId),
                columnId: new ObjectId(validData.columnId),
            });
    } catch (error) {
        throw new Error(error);
    }
};

exports.findById = async (id) => {
    try {
        let result = await getDB()
            .collection(exports.CARD_COLLECTION_NAME)
            .findOne({ _id: new ObjectId(id) });
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

exports.update = async (cardId, updateData) => {
    try {
        //Filter properties that do not allow updates
        Object.keys(updateData).forEach((fieldName) => {
            if (INVALID_UPDATE_FIELDS.includes(fieldName)) {
                delete updateData.fieldName;
            }
        });

        if (updateData.columnId)
            updateData.columnId = new ObjectId(updateData.columnId);

        const result = await getDB()
            .collection(exports.CARD_COLLECTION_NAME)
            .findOneAndUpdate(
                { _id: new ObjectId(cardId) },
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

exports.getDetails = async (id) => {
    console.log("🚀 ~ exports.getDetails= ~ id:", id);
    try {
        let result = await getDB()
            .collection(exports.CARD_COLLECTION_NAME)
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
                        from: exports.CARD_COLLECTION_NAME,
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

exports.deleteManyByColumnId = async (columnId) => {
    try {
        let result = await getDB()
            .collection(exports.CARD_COLLECTION_NAME)
            .deleteMany({ columnId: new ObjectId(columnId) });
        return result;
    } catch (error) {
        throw new Error(error);
    }
};
