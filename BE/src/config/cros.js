const { WHITELIST_DOMAINS } = require("../utils/constants");
const env = require("../config/environment");
const { StatusCodes } = require("http-status-codes");
const ApiError = require("../utils/apiErr");

// Define the corsOptions object
const corsOptions = {
    origin: function (origin, callback) {
        // Allow API calls using Postman in the dev environment
        if (!origin && env.BUILD_MODE === "dev") {
            return callback(null, true);
        }

        // Check if the origin is in the whitelist
        if (WHITELIST_DOMAINS.includes(origin)) {
            return callback(null, true);
        }

        // If the domain is not allowed, return an error
        return callback(
            new ApiError(
                StatusCodes.FORBIDDEN,
                `${origin} not allowed by our CORS Policy.`
            )
        );
    },

    // Some legacy browsers (IE11, various SmartTVs) choke on 204
    optionsSuccessStatus: 200,

    // CORS allows receiving cookies from the request
    credentials: true,
};

// Export the corsOptions object with a specific name
module.exports = corsOptions;
