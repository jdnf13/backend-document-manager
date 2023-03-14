import jwt from "jsonwebtoken";
import User, { IUser } from "../models/user";
import config from "../config/config";

function createToken(user: IUser){
    return jwt.sign({ userId: user._id, mailUser: user.email, userState: user.state, userCompany: user.company }, config.jwtSecret, { expiresIn: config.ApiEnv.SESSION/* '20s' */ });
}

const refreshToken = (user: IUser): String => {
    return createToken(user);
}

export const token = {
    createToken,
    refreshToken
}