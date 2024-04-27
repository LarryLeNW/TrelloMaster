const express = require("express");
const { connectDB, closeDB } = require("./config/mongodb");
const AsyncExitHook = require("async-exit-hook");
const ENV_VAR = require("./config/environment");
const APIv1 = require("./routes/v1/index");
const cors = require("cors");
const errorHandlingMiddleWare = require("./middlewares/errorHandlingMiddleware");
const corsOptions = require("./config/cros");
const port = ENV_VAR.APP_PORT;
// require("./config/passport");

const startServer = () => {
    const app = express();
    app.use(express.json());
    app.use(cors(corsOptions));
    app.use("/v1", APIv1);

    app.get("/", (req, res) => {
        res.send("<h1>Helloo api</h1>");
    });

    // Centralized error handling middleware
    app.use(errorHandlingMiddleWare);

    app.listen(port, () => {
        console.log(`run server successfully at port: ${port}`);
    });

    AsyncExitHook(() => {
        console.log("exit app");
        closeDB();
    });
};

connectDB()
    .then(() => console.log("Connected to database mongodb successfully..."))
    .then(() => startServer())
    .catch((err) => {
        console.log(err);
        process.exit();
    });
