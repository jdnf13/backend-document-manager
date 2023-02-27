"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config/config"));
const user = 'cafezen_admin';
const password = 'Daryin231508';
const bdatos = 'WorkManager';
//setting options DB
const DBOption = {
    autoIndex: true,
    maxPoolSize: 100,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    //family: 4 // Use IPv4, skip trying IPv6
};
mongoose_1.default.set('strictQuery', false);
mongoose_1.default.connect(config_1.default.DB.MONGO_URI, DBOption);
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log('connected database');
});
connection.on('error', err => {
    console.log('there was an error connecting to MongoDB');
    process.exit(0);
});
