"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const config_1 = __importDefault(require("./config/config"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const private_routes_1 = __importDefault(require("./routes/private.routes"));
const passport_1 = __importDefault(require("./middlewares/passport"));
const passport_2 = __importDefault(require("passport"));
//initializations
const app = (0, express_1.default)();
//settings
app.set('port', config_1.default.ApiEnv.PORT);
//middlewares
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(passport_2.default.initialize());
passport_2.default.use(passport_1.default);
//routes
app.get('/', (req, res) => {
    res.send(`This api runs on the port ${app.get('port')}`);
});
app.use(auth_routes_1.default);
app.use(private_routes_1.default);
exports.default = app;
