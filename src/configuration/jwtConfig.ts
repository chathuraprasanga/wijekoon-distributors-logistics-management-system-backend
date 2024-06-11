import crypto from "crypto";

const accessTokenSecret = crypto.randomBytes(32).toString("hex");
const refreshTokenSecret = crypto.randomBytes(32).toString("hex");

// const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
// const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

export {accessTokenSecret, refreshTokenSecret};