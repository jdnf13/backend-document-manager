import { model, Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
    email: string,
    password: string,
    name: string,
    lastname: string,
    phone: string,
    country: string,
    geographicZone: string,
    city: string,
    address: string,
    company: string,
    comparePassword: (password: string) => Promise<boolean>
}

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    geographicZone: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    }
});

userSchema.pre<IUser>('save', async function (next) {
    const user = this;
    if (!user.isModified('password'))
        return next();

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();

    /*     
    //this code is another way of use
    bcrypt.genSalt(10, (error, salt) => {
            if (error) {
                return next(error);
            }
            bcrypt.hash(user.password, salt, (error, hash) => {
                if (error) {
                    return next(error);
                }
                user.password = hash;
                next();
            });
        }); */
});

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};

const User = model<IUser>('User', userSchema);

export default User;