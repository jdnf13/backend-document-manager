"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_jwt_1 = require("passport-jwt");
const config_1 = __importDefault(require("../config/config"));
const user_1 = __importDefault(require("../models/user"));
const options = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config_1.default.jwtSecret
};
exports.default = new passport_jwt_1.Strategy(options, (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findOne(payload.email);
        const expDate = new Date(0); // crea una nueva fecha en el Epoch Time
        expDate.setUTCSeconds(payload.exp);
        console.log(`La fecha de expiración del token es: ${expDate.toLocaleString()}`);
        if (payload.exp < new Date().getTime() / 1000) {
            return done(null, false);
        }
        if (user && user.state && user.state === 1)
            return done(null, user);
        return done(null, false);
    }
    catch (error) {
        console.log("Error decrypting token", error);
        return done(null, false);
    }
}));
