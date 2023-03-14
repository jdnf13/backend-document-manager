import { Request, Response } from "express";
import { validationResult } from "express-validator";

import Document, { IDocument } from "../../models/document";
import { IRespose } from "../../models/responseModels/response";
import { utils } from "../../utils/utils";

export const ping = async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).json({ status: 200, message: "service ready to requests", data: { res: "service listening" } });
}

export const documentCreate = async (req: Request, res: Response): Promise<Response> => {
    const errors = validationResult(req);
    const date = utils.dateFormat(new Date);

    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

    const { code, name, version, owner, state } = req.body;

    try {
        const documentExist = await Document.findOne({ code });
        if (documentExist)
            return res.status(409).json('Este documento ya fue creado')

        const document = new Document({ code, name, version, creationDate: date, lastUpdateDate: date, owner, state });
        await document.save();


        return res.status(200).json({ response: 200, message: 'Documento creado con éxito', data: document });
    } catch (error) {
        console.error(error);
        return res.status(500).json('Error interno del servidor');
    }
}

export const documentByCode = async (req: Request, res: Response): Promise<Response | null> => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

    try {
        const { code } = req.query;
        const documentExist = await Document.findOne({ code });
        if (documentExist)
            return res.status(200).json({ response: 200, message: 'Success', data: documentExist });

        return res.status(400).json({ response: 400, message: 'Error', data: { res: 'El documento no existe' } });
    } catch (error) {
        console.error(error);
        return res.status(500).json('Error interno del servidor');
    }
}

export const documentById = async (req: Request, res: Response): Promise<Response | null> => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

    try {
        const { _id } = req.query;
        const documentExist = await Document.findOne({ _id });
        if (documentExist)
            return res.status(200).json({ response: 200, message: 'Success', data: documentExist });

        return res.status(400).json({ response: 400, message: 'Error', data: { res: 'El documento no existe' } });
    } catch (error) {
        console.error(error);
        return res.status(500).json('Error interno del servidor');
    }
}

export const documentsAll = async (req: Request, res: Response): Promise<Response | null> => {
    try {
        const documentExist = await Document.find();
        if (documentExist && documentExist.length)
            return res.status(200).json({ response: 200, message: 'Success', data: documentExist });

        return res.status(400).json({ response: 400, message: 'Error', data: { res: 'No hay documentos para mostrar' } });
    } catch (error) {
        console.error(error);
        return res.status(500).json('Error interno del servidor');
    }
}

export const documentDelete = async (req: Request, res: Response): Promise<Response> => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

    try {
        const { _id } = req.body;
        const documentExist = await Document.findOne({ _id });
        if (!documentExist)
            return res.status(409).json('El documento no existe');

        const response = await Document.remove({ _id });

        if (response?.deletedCount !== 1)
            return res.status(200).json({ response: 200, message: 'No fue posible eliminar el documento', data: response });

        return res.status(200).json({ response: 200, message: 'Documento eliminado con éxito', data: documentExist });
    } catch (error) {
        console.error(error);
        return res.status(500).json('Error interno del servidor');
    }
}

export const documentUpdate = async (req: Request, res: Response): Promise<Response> => {
    const errors = validationResult(req);
    const date = utils.dateFormat(new Date);

    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

    const { _id, name, version, state } = req.body;

    try {
        const documentExist = await Document.findOne({ _id });
        if (!documentExist)
            return res.status(409).json('El documento no existe')

        const document = new Document({ _id: documentExist._id, code: documentExist.code, name, version, creationDate: documentExist.creationDate, lastUpdateDate: date, owner: documentExist.owner, state });
        await Document.findByIdAndUpdate({ _id }, document);

        return res.status(200).json({ response: 200, message: 'Documento actualizado con éxito', data: document });
    } catch (error) {
        console.error(error);
        return res.status(500).json('Error interno del servidor');
    }
}