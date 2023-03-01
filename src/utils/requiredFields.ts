import { check } from "express-validator";

export const validationNewUser = [
    check('email', 'El correo electrónico (email) es obligatorio').notEmpty(),
    check('email', 'El correo electrónico (email) no es válido').isEmail(),
    check('password', 'La contraseña (password) es obligatoria').notEmpty(),
    check('name', 'El nombre (name) es obligatorio').notEmpty(),
    check('lastname', 'El apellido (lastname) es obligatorio').notEmpty(),
    check('phone', 'El teléfono (phone) es obligatorio').notEmpty(),
    check('country', 'El pais (country) es obligatorio').notEmpty(),
    check('geographicZone', 'El departamento (geographicZone) es obligatorio').notEmpty(),
    check('city', 'La ciudad (city) es obligatoria').notEmpty(),
    check('address', 'La dirección (address) es obligatoria').notEmpty(),
    check('company', 'La empresa (company) es obligatoria').notEmpty(),
    check('state', 'El estado (state) es obligatorio').notEmpty(),
    check('state', 'El estado (state) debe ser 1: activo, 0: inactivo').isIn([0,1]),
];

export const validationLogin = [
    check('email', 'El correo electrónico (email) es obligatorio').notEmpty(),
    check('email', 'El correo electrónico (email) no es válido').isEmail(),
    check('password', 'La contraseña (password) es obligatoria').notEmpty(),
];