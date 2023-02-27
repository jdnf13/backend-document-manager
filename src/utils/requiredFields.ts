import { check } from "express-validator";

export const validationNewUser = [
    check('email', 'El correo electrónico es obligatorio').notEmpty(),
    check('email', 'El correo electrónico no es válido').isEmail(),
    check('password', 'La contraseña es obligatoria').notEmpty(),
    check('name', 'El nombre es obligatorio').notEmpty(),
    check('lastname', 'El apellido es obligatorio').notEmpty(),
];

export const validationLogin = [
    check('email', 'El correo electrónico es obligatorio').notEmpty(),
    check('password', 'La contraseña es obligatoria').notEmpty(),
];
