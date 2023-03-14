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
exports.documentUpdate = exports.documentDelete = exports.documentsAll = exports.documentById = exports.documentByCode = exports.documentCreate = exports.ping = void 0;
const express_validator_1 = require("express-validator");
const document_1 = __importDefault(require("../../models/document"));
const utils_1 = require("../../utils/utils");
const ping = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).json({ status: 200, message: "service ready to requests", data: { res: "service listening" } });
});
exports.ping = ping;
const documentCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    const date = utils_1.utils.dateFormat(new Date);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
    const { code, name, version, owner, state } = req.body;
    try {
        const documentExist = yield document_1.default.findOne({ code });
        if (documentExist)
            return res.status(409).json('Este documento ya fue creado');
        const document = new document_1.default({ code, name, version, creationDate: date, lastUpdateDate: date, owner, state });
        yield document.save();
        return res.status(200).json({ response: 200, message: 'Documento creado con éxito', data: document });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json('Error interno del servidor');
    }
});
exports.documentCreate = documentCreate;
const documentByCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
    try {
        const { code } = req.query;
        const documentExist = yield document_1.default.findOne({ code });
        if (documentExist)
            return res.status(200).json({ response: 200, message: 'Success', data: documentExist });
        return res.status(400).json({ response: 400, message: 'Error', data: { res: 'El documento no existe' } });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json('Error interno del servidor');
    }
});
exports.documentByCode = documentByCode;
const documentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
    try {
        const { _id } = req.query;
        const documentExist = yield document_1.default.findOne({ _id });
        if (documentExist)
            return res.status(200).json({ response: 200, message: 'Success', data: documentExist });
        return res.status(400).json({ response: 400, message: 'Error', data: { res: 'El documento no existe' } });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json('Error interno del servidor');
    }
});
exports.documentById = documentById;
const documentsAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const documentExist = yield document_1.default.find();
        if (documentExist && documentExist.length)
            return res.status(200).json({ response: 200, message: 'Success', data: documentExist });
        return res.status(400).json({ response: 400, message: 'Error', data: { res: 'No hay documentos para mostrar' } });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json('Error interno del servidor');
    }
});
exports.documentsAll = documentsAll;
const documentDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
    try {
        const { _id } = req.body;
        const documentExist = yield document_1.default.findOne({ _id });
        if (!documentExist)
            return res.status(409).json('El documento no existe');
        const response = yield document_1.default.remove({ _id });
        if ((response === null || response === void 0 ? void 0 : response.deletedCount) !== 1)
            return res.status(200).json({ response: 200, message: 'No fue posible eliminar el documento', data: response });
        return res.status(200).json({ response: 200, message: 'Documento eliminado con éxito', data: documentExist });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json('Error interno del servidor');
    }
});
exports.documentDelete = documentDelete;
const documentUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    const date = utils_1.utils.dateFormat(new Date);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
    const { _id, name, version, state } = req.body;
    try {
        const documentExist = yield document_1.default.findOne({ _id });
        if (!documentExist)
            return res.status(409).json('El documento no existe');
        const document = new document_1.default({ _id: documentExist._id, code: documentExist.code, name, version, creationDate: documentExist.creationDate, lastUpdateDate: date, owner: documentExist.owner, state });
        yield document_1.default.findByIdAndUpdate({ _id }, document);
        return res.status(200).json({ response: 200, message: 'Documento actualizado con éxito', data: document });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json('Error interno del servidor');
    }
});
exports.documentUpdate = documentUpdate;
