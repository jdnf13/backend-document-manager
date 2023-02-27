import { Request, Response } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

import User, { IUser } from "../models/user";
import config from "../config/config";

export const signUp = async (req: Request, res: Response): Promise<Response> => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });


    const { email, password, name, lastname, phone, country, geographicZone, city, address, company } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists)
            return res.status(409).json('Este correo ya fue registrado')

        const user = new User({ email, password, name, lastname, phone, country, geographicZone, city, address, company });
        await user.save();

        return res.status(200).json({ token: createToken(user) });
    } catch (error) {
        console.error(error);
        return res.status(500).json('Error interno del servidor');
    }
}

export const signIn = async (req: Request, res: Response): Promise<Response> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
        const userExists: IUser | null = await User.findOne({ email });
        if (!userExists)
            return res.status(500).json('Usuario incorrecto');
        
        const compare = await userExists.comparePassword(password);
        if (compare)
            return res.status(200).json({ token: createToken(userExists) })

        return res.status(500).json('Contraseña incorrecta');

    } catch (error) {
        console.error(error);
        return res.status(500).json('Error interno del servidor 1');
    }
}

const createToken = (user: IUser) => {
    return jwt.sign({ userId: user._id, mailUser: user.email }, config.jwtSecret, { expiresIn: 86400 });
}