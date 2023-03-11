import jwt from "jsonwebtoken";
import User, { IUser } from "../models/user";
import config from "../config/config";

function createToken(user: IUser){
    return jwt.sign({ userId: user._id, mailUser: user.email, userState: user.state, userCompany: user.company }, config.jwtSecret, { expiresIn: 86400 });
}

export const token = {
    createToken
}