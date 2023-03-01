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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ping = void 0;
// import { validationResult } from "express-validator";
// import jwt from "jsonwebtoken";
// import User, { IUser } from "../models/user";
// import config from "../config/config";
const ping = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).json({ status: 200, message: "service ready to requests", data: { res: "service listening" } });
});
exports.ping = ping;
