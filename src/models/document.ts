import { model, Schema, Document as Doc } from "mongoose";

export interface IDocument extends Doc {
    code: string,
    name: string,
    version: string,
    creationDate: string,
    lastUpdateDate: string,
    owner: string,
    state: number
    permission: (password: string) => Promise<boolean>
}

const documentSchema = new Schema({
    code: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    version: {
        type: String,
        required: true,
    },
    creationDate: {
        type: String,
        required: true,
    },
    lastUpdateDate: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
        required: true,
    },
    state: {
        type: Number,
        required: true
    },
});

const Document = model<IDocument>('Document', documentSchema);

export default Document;