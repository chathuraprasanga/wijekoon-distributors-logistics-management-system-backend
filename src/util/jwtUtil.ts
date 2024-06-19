import jwt from "jsonwebtoken";
import { accessTokenSecret, refreshTokenSecret } from "../configuration/jwtConfig";

export const generateAccessToken = async (user) => {
    console.log(accessTokenSecret, refreshTokenSecret);
    const payload = {
        id: user._id,
        email: user.email,
        role: user?.role?.name || user?.role?.fullName,
    };
    return jwt.sign(payload, accessTokenSecret, { expiresIn: "24h" });
};

export const generateRefreshToken = async (user) => {
    const payload = {
        id: user._id,
        email: user.email,
        role: user?.role?.name ||  user?.role?.fullName,
    };
    return jwt.sign(payload, refreshTokenSecret, { expiresIn: "24h" });
};

export const verifyAccessToken = async (token) => {
    return jwt.verify(token, accessTokenSecret);
};

export const verifyRefreshToken = async (token) => {
    return jwt.verify(token, refreshTokenSecret);
};
