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
exports.createDocument = exports.ping = void 0;
const express_validator_1 = require("express-validator");
const document_1 = __importDefault(require("../models/document"));
const ping = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).json({ status: 200, message: "service ready to requests", data: { res: "service listening" } });
});
exports.ping = ping;
const createDocument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    const fullDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    console.log('documento recibido ', fullDate);
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
    const { code, name, version, owner, state } = req.body;
    try {
        const documentExist = yield document_1.default.findOne({ code });
        if (documentExist)
            return res.status(409).json('Este documento ya fue creado');
        const document = new document_1.default({ code, name, version, creationDate: fullDate, lastUpdateDate: fullDate, owner, state });
        yield document.save();
        return res.status(200).json({ response: 200, message: 'Documento creado con éxito', data: document });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json('Error interno del servidor');
    }
});
exports.createDocument = createDocument;
