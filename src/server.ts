import {startup} from "./util/startup";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import fileUpload from "express-fileupload";
import { initDatabase } from "./data-access";
import { routes } from "./routes";
import { log } from "./util/logger";
import dotenv from "dotenv";

startup();

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Database initiation
initDatabase();

// Server configuration
app.use(bodyParser.urlencoded({ limit: "1mb", extended: true }));
app.use(bodyParser.json({ limit: "1mb" }));
app.use(cors());
app.use(fileUpload());

// Routes initialization
routes(app);

app.listen(port, () => {
    log.info(
        `Wijekoon Distributors API Server v${process.env.npm_package_version} started on PORT ${port} on ${process.env.NODE_ENV} mode`
    );
});
