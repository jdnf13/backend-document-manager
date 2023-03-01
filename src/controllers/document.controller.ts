import { Request, Response } from "express";
// import { validationResult } from "express-validator";
// import jwt from "jsonwebtoken";

// import User, { IUser } from "../models/user";
// import config from "../config/config";

export const ping = async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).json({ status:200, message: "service ready to requests", data: {res: "service listening"} });
}