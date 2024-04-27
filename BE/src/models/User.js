const Joi = require("joi");
const {
    OBJECT_ID_RULE,
    OBJECT_ID_RULE_MESSAGE,
} = require("../validations/validators");
const { getDB } = require("../config/mongodb");
const { ObjectId } = require("mongodb");

const USER_COLLECTION_NAME = "users";

const USER_COLLECTION_SCHEMA = Joi.object({
    email: Joi.string().required().min(10).max(50).trim().strict(),
    username: Joi.string().required().min(3).max(50).trim().strict(),
    password: Joi.string().min(3).max(50).trim().strict(),
    boardList: Joi.array()
        .items(
            Joi.object({
                _id: Joi.string()
                    .pattern(OBJECT_ID_RULE)
                    .message(OBJECT_ID_RULE_MESSAGE),
                title: Joi.string().required().min(1).max(100).trim().strict(),
            })
        )
        .default([]),
    roleId: Joi.string().min(4).max(50).trim().strict().default("user"),
    typeLogin: Joi.string().min(4).max(50).trim().strict().default("root"),
    tokenLogin: Joi.string().min(4).max(50).trim().strict().default(null),
    createAt: Joi.date().timestamp("javascript").default(Date.now),
    updatedAt: Joi.date().timestamp("javascript").default(null),
    _lock: Joi.boolean().default(false),
});

//Specifies properties that cannot be updated
const INVALID_UPDATE_FIELDS = ["_id", "createAt"];

exports.create = async (data) => {
    try {
        // validate before create
        const validData = await USER_COLLECTION_SCHEMA.validateAsync(data, {
            abortEarly: false,
        });

        return await getDB()
            .collection(USER_COLLECTION_NAME)
            .insertOne(validData);
    } catch (error) {
        throw new Error(error);
    }
};

exports.update = async (updateData) => {
    try {
        Object.keys(updateData).forEach((fieldName) => {
            if (INVALID_UPDATE_FIELDS.includes(fieldName)) {
                delete updateData.fieldName;
            }
        });

        const result = await getDB()
            .collection(USER_COLLECTION_NAME)
            .findOneAndUpdate(
                { _id: new ObjectId(updateData._id) },
                {
                    $set: updateData,
                },
                { $returnDocument: "after" }
            );
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

exports.findOneById = async (id) => {
    try {
        let result = await getDB()
            .collection(USER_COLLECTION_NAME)
            .findOne({ _id: new ObjectId(id) });
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

exports.findOneByMultipleKeys = async (key) => {
    try {
        if (key._id) {
            key._id = new ObjectId(key._id);
        }
        let result = await getDB()
            .collection(USER_COLLECTION_NAME)
            .findOne(key);
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

exports.findOneByEmailAndTypeLogin = async (email, typeLogin) => {
    try {
        let result = await getDB()
            .collection(USER_COLLECTION_NAME)
            .findOne({ email, typeLogin });
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

exports.checkLogin = async (username, password) => {
    try {
        let result = await getDB()
            .collection(USER_COLLECTION_NAME)
            .findOne({ username, password });
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

exports.pushBoardToUser = async (userId, board) => {
    try {
        const result = await getDB()
            .collection(USER_COLLECTION_NAME)
            .findOneAndUpdate(
                { _id: new ObjectId(userId) },
                {
                    $push: { boardList: { ...board } },
                },
                { $returnDocument: "after" }
            );
        return result;
    } catch (error) {
        throw new Error(error);
    }
};
