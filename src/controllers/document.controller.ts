import { Request, Response } from "express";
import { validationResult } from "express-validator";

import Document, { IDocument } from "../models/document";

export const ping = async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).json({ status: 200, message: "service ready to requests", data: { res: "service listening" } });
}

export const createDocument = async (req: Request, res: Response): Promise<Response> => {
    const date = new Date();
    const fullDate = `${date.getDate()}-${date.getMonth() + 1 }-${date.getFullYear()}`;
    console.log('documento recibido ', fullDate )
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

    const { code, name, version, owner, state } = req.body;

    try {
        const documentExist = await Document.findOne({ code });
        if (documentExist)
            return res.status(409).json('Este documento ya fue creado')

        const document = new Document({ code, name, version, creationDate: fullDate, lastUpdateDate: fullDate, owner, state });
        await document.save();

        return res.status(200).json({ response: 200, message: 'Documento creado con éxito', data: document });
    } catch (error) {
        console.error(error);
        return res.status(500).json('Error interno del servidor');
    }
}