"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationCreateDocument = exports.validationLogin = exports.validationNewUser = void 0;
const express_validator_1 = require("express-validator");
exports.validationNewUser = [
    (0, express_validator_1.check)('email', 'El correo electrónico (email) es obligatorio').notEmpty(),
    (0, express_validator_1.check)('email', 'El correo electrónico (email) no es válido').isEmail(),
    (0, express_validator_1.check)('password', 'La contraseña (password) es obligatoria').notEmpty(),
    (0, express_validator_1.check)('name', 'El nombre (name) es obligatorio').notEmpty(),
    (0, express_validator_1.check)('lastname', 'El apellido (lastname) es obligatorio').notEmpty(),
    (0, express_validator_1.check)('phone', 'El teléfono (phone) es obligatorio').notEmpty(),
    (0, express_validator_1.check)('country', 'El pais (country) es obligatorio').notEmpty(),
    (0, express_validator_1.check)('geographicZone', 'El departamento (geographicZone) es obligatorio').notEmpty(),
    (0, express_validator_1.check)('city', 'La ciudad (city) es obligatoria').notEmpty(),
    (0, express_validator_1.check)('address', 'La dirección (address) es obligatoria').notEmpty(),
    (0, express_validator_1.check)('company', 'La empresa (company) es obligatoria').notEmpty(),
    (0, express_validator_1.check)('state', 'El estado (state) es obligatorio').notEmpty(),
    (0, express_validator_1.check)('state', 'El estado (state) debe ser 1: activo, 0: inactivo').isIn([0, 1]),
];
exports.validationLogin = [
    (0, express_validator_1.check)('email', 'El correo electrónico (email) es obligatorio').notEmpty(),
    (0, express_validator_1.check)('email', 'El correo electrónico (email) no es válido').isEmail(),
    (0, express_validator_1.check)('password', 'La contraseña (password) es obligatoria').notEmpty(),
];
exports.validationCreateDocument = [
    (0, express_validator_1.check)('code', 'El codigo (code) es obligatorio').notEmpty(),
    (0, express_validator_1.check)('name', 'El correo nombre (name) es obligatorio').notEmpty(),
    (0, express_validator_1.check)('version', 'La versión (version) es obligatoria').notEmpty(),
    (0, express_validator_1.check)('owner', 'El propietario (owner) es obligatorio').notEmpty(),
    (0, express_validator_1.check)('state', 'El estado (state) es obligatorio').notEmpty(),
];
