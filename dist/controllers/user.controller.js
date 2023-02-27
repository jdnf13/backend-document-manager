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
exports.signIn = exports.signUp = void 0;
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const config_1 = __importDefault(require("../config/config"));
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
    const { email, password, name, lastname, phone, country, geographicZone, city, address, company } = req.body;
    try {
        const userExists = yield user_1.default.findOne({ email });
        if (userExists)
            return res.status(409).json('Este correo ya fue registrado');
        const user = new user_1.default({ email, password, name, lastname, phone, country, geographicZone, city, address, company });
        yield user.save();
        return res.status(200).json({ token: createToken(user) });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json('Error interno del servidor');
    }
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        const userExists = yield user_1.default.findOne({ email });
        if (!userExists)
            return res.status(500).json('Usuario incorrecto');
        const compare = yield userExists.comparePassword(password);
        if (compare)
            return res.status(200).json({ token: createToken(userExists) });
        return res.status(500).json('Contraseña incorrecta');
    }
    catch (error) {
        console.error(error);
        return res.status(500).json('Error interno del servidor 1');
    }
});
exports.signIn = signIn;
const createToken = (user) => {
    return jsonwebtoken_1.default.sign({ userId: user._id, mailUser: user.email }, config_1.default.jwtSecret, { expiresIn: 86400 });
};
