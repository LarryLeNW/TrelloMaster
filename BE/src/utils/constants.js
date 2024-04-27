const ENV_VAR = require("../config/environment");

exports.WHITELIST_DOMAINS = [ENV_VAR.CLIENT_DOMAIN];
exports.BOARD_TYPES = {
    PUBLIC: "public",
    PRIVATE: "private",
};
