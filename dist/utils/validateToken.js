"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.token = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
function createToken(user) {
    return jsonwebtoken_1.default.sign({ userId: user._id, mailUser: user.email, userState: user.state, userCompany: user.company }, config_1.default.jwtSecret, { expiresIn: config_1.default.ApiEnv.SESSION /* '20s' */ });
}
const refreshToken = (user) => {
    return createToken(user);
};
exports.token = {
    createToken,
    refreshToken
};
