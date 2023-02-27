"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationLogin = exports.validationNewUser = void 0;
const express_validator_1 = require("express-validator");
exports.validationNewUser = [
    (0, express_validator_1.check)('email', 'El correo electrónico es obligatorio').notEmpty(),
    (0, express_validator_1.check)('email', 'El correo electrónico no es válido').isEmail(),
    (0, express_validator_1.check)('password', 'La contraseña es obligatoria').notEmpty(),
    (0, express_validator_1.check)('name', 'El nombre es obligatorio').notEmpty(),
    (0, express_validator_1.check)('lastname', 'El apellido es obligatorio').notEmpty(),
];
exports.validationLogin = [
    (0, express_validator_1.check)('email', 'El correo electrónico es obligatorio').notEmpty(),
    (0, express_validator_1.check)('password', 'La contraseña es obligatoria').notEmpty(),
];
