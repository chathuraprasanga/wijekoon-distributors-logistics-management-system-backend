import mongoose, {ConnectOptions} from "mongoose";
import {log} from "../util/logger";

export const initDatabase = async () => {
    try {
        log.info(`Connecting to MongoDB...`);
        const username = encodeURIComponent(process.env.DB_USERNAME);
        const password = encodeURIComponent(process.env.DB_PASSWORD);
        const name = encodeURIComponent(process.env.DB_NAME);
        const uri = `mongodb+srv://${username}:${password}@xcorpion.joewdpf.mongodb.net/${name}?tls=true&retryWrites=false&w=majority&appName=Xcorpion`;
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectOptions);
        log.info(`Connected to Xcorpion database.`);
        log.info(`${name} server up...!`);
    } catch (e) {
        log.error(`Database connection failed - ${JSON.stringify(e)}`);
    }
};