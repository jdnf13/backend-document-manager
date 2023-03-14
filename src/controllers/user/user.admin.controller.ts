import { Request, Response } from "express";
import { validationResult } from "express-validator";

import User, { IUser } from "../../models/user";
import { utils } from "../../utils/utils";
import { token } from "../../utils/validateToken";

export const updateInfoUser = async (req: Request, res: Response): Promise<Response> => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

    const { _id, email, password, name, lastname, phone, country, geographicZone, city, address } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (!userExists)
            return res.status(409).json('El usuario no existe')

        const user: IUser = new User({ _id, email, password, name, lastname, phone, country, geographicZone, city, address, lastUpdateDate: utils.dateFormat(new Date) });
        await User.findByIdAndUpdate({ _id }, user);

        return res.status(200).json({ response: 200, message: 'Información actualizada con éxito', token: token.createToken(user)});
    } catch (error) {
        console.error(error);
        return res.status(500).json('Error interno del servidor');
    }
}

export const updateStateUser = async (req: Request, res: Response): Promise<Response> => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

    const { _id, state } = req.body;

    try {
        const userExists = await User.findOne({ _id });
        if (!userExists)
            return res.status(409).json('El usuario no existe')

        const user = new User({ _id, lastUpdateDate: utils.dateFormat(new Date), state });
        await User.findByIdAndUpdate({ _id }, user);

        return res.status(200).json({ response: 200, message: state === 1 ? 'Usuario activado con éxito' : 'Usuario inactivado con éxito', data: user });
    } catch (error) {
        console.error(error);
        return res.status(500).json('Error interno del servidor');
    }
}
