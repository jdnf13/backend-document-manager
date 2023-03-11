"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const documentSchema = new mongoose_1.Schema({
    code: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    version: {
        type: String,
        required: true,
    },
    creationDate: {
        type: String,
        required: true,
    },
    lastUpdateDate: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
        required: true,
    },
    state: {
        type: Number,
        required: true
    },
});
const Document = (0, mongoose_1.model)('Document', documentSchema);
exports.default = Document;
