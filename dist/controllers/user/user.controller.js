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
const user_1 = __importDefault(require("../../models/user"));
const utils_1 = require("../../utils/utils");
const validateToken_1 = require("../../utils/validateToken");
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
    const { email, password, name, lastname, phone, country, geographicZone, city, address, company, state } = req.body;
    try {
        const userExists = yield user_1.default.findOne({ email });
        if (userExists)
            return res.status(409).json('Este correo ya fue registrado');
        const user = new user_1.default({ email, password, name, lastname, phone, country, geographicZone, city, address, company, state, lastUpdateDate: utils_1.utils.dateFormat(new Date) });
        yield user.save();
        return res.status(200).json({ token: validateToken_1.token.createToken(user) });
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
            return res.status(409).json('Usuario incorrecto');
        if (!userExists.state || userExists.state === 0)
            return res.status(409).json('Usuario inactivo');
        const compare = (yield userExists.state) === 1 ? userExists.comparePassword(password) : false;
        if (yield compare)
            return res.status(200).json({ token: validateToken_1.token.createToken(userExists) });
        return res.status(409).json(userExists.state === 1 ? 'Contraseña incorrecta' : 'Usuario inactivo');
    }
    catch (error) {
        console.error(error);
        return res.status(500).json('Error interno del servidor 1');
    }
});
exports.signIn = signIn;
