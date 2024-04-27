require("dotenv/config");

module.exports = {
    MONGODB_URI: process.env.MONGODB_URI,
    DATABASE_NAME: process.env.DATABASE_NAME,
    APP_PORT: process.env.APP_PORT,
    BUILD_MODE: process.env.BUILD_MODE,
    CLIENT_DOMAIN: process.env.CLIENT_DOMAIN,
};
