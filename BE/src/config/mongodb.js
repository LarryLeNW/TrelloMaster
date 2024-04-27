const { MongoClient, ServerApiVersion } = require("mongodb");
const ENV_VAR = require("./environment");

const MONGODB_URI = ENV_VAR.MONGODB_URI;

const NAME_DB = ENV_VAR.DATABASE_NAME;

let trelloDataBaseInstance = null;

// init instance client mongodb
const mongoClientInstance = new MongoClient(MONGODB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

// connect to mongodb
exports.connectDB = async () => {
    console.log("connecting to mongodb ...");
    await mongoClientInstance.connect();
    trelloDataBaseInstance = mongoClientInstance.db(NAME_DB);
};

exports.closeDB = () => {
    console.log("disconnecting mongodb");
    mongoClientInstance.close();
    console.log("close mongodb successfully...");
};

exports.getDB = () => {
    if (!trelloDataBaseInstance)
        throw new Error("Must connect to database first...");
    return trelloDataBaseInstance;
};
