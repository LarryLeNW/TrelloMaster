const Joi = require("joi");
const {
    OBJECT_ID_RULE,
    OBJECT_ID_RULE_MESSAGE,
} = require("../validations/validators");
const { getDB } = require("../config/mongodb");
const { ObjectId } = require("mongodb");

// Define Collection (name & schema)
exports.COLUMN_COLLECTION_NAME = "columns";
exports.COLUMN_COLLECTION_SCHEMA = Joi.object({
    boardId: Joi.string()
        .required()
        .pattern(OBJECT_ID_RULE)
        .message(OBJECT_ID_RULE_MESSAGE),
    title: Joi.string().required().min(3).max(50).trim().strict(),

    // Lưu ý các item trong mảng cardOrderIds là ObjectId nên cần thêm pattern cho chuẩn nhé, (lúc quay video số 57 mình quên nhưng sang đầu video số 58 sẽ có nhắc lại về cái này.)
    cardOrderIds: Joi.array()
        .items(
            Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
        )
        .default([]),

    createdAt: Joi.date().timestamp("javascript").default(Date.now),
    updatedAt: Joi.date().timestamp("javascript").default(null),
    _destroy: Joi.boolean().default(false),
});

//Specifies properties that cannot be updated
const INVALID_UPDATE_FIELDS = ["_id", "createAt", "boardId"];

exports.create = async (data) => {
    try {
        // validate before create
        const validData = await exports.COLUMN_COLLECTION_SCHEMA.validateAsync(
            data,
            {
                abortEarly: false,
            }
        );

        return await getDB()
            .collection(exports.COLUMN_COLLECTION_NAME)
            .insertOne({
                ...validData,
                boardId: new ObjectId(validData.boardId),
            });
    } catch (error) {
        throw new Error(error);
    }
};

exports.update = async (columnId, updateData) => {
    try {
        //Filter properties that do not allow updates
        Object.keys(updateData).forEach((fieldName) => {
            if (INVALID_UPDATE_FIELDS.includes(fieldName)) {
                delete updateData.fieldName;
            }
        });

        if (updateData.cardOrderIds)
            updateData.cardOrderIds = updateData.cardOrderIds.map(
                (id) => new ObjectId(id)
            );

        const result = await getDB()
            .collection(exports.COLUMN_COLLECTION_NAME)
            .findOneAndUpdate(
                { _id: new ObjectId(columnId) },
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

exports.findById = async (id) => {
    try {
        let result = await getDB()
            .collection(exports.COLUMN_COLLECTION_NAME)
            .findOne({ _id: new ObjectId(id) });
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

exports.getDetails = async (id) => {
    console.log("🚀 ~ exports.getDetails= ~ id:", id);
    try {
        let result = await getDB()
            .collection(exports.COLUMN_COLLECTION_NAME)
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
                        from: exports.COLUMN_COLLECTION_NAME,
                        localField: "_id",
                        foreignField: "boardId",
                        as: "columns",
                    },
                },
                {
                    $lookup: {
                        from: exports.COLUMN_COLLECTION_NAME,
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

exports.deleteOneById = async (columnId) => {
    try {
        let result = await getDB()
            .collection(exports.COLUMN_COLLECTION_NAME)
            .deleteOne({ _id: new ObjectId(columnId) });
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

exports.pushCardOrderIds = async (card) => {
    try {
        const result = await getDB()
            .collection(exports.COLUMN_COLLECTION_NAME)
            .findOneAndUpdate(
                { _id: new ObjectId(card.columnId) },
                {
                    $push: { cardOrderIds: new ObjectId(card._id) },
                },
                { $returnDocument: "after" }
            );
        return result.value;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};
