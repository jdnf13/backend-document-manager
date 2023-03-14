import { TokenExpiredError } from "jsonwebtoken";
import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import config from "../config/config";
import User from "../models/user";

const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret
}

export default new Strategy(options, async (payload, done) => {
    try {
        const user = await User.findOne(payload.email);
        const expDate = new Date(0); // crea una nueva fecha en el Epoch Time
        expDate.setUTCSeconds(payload.exp);
        console.log(`La fecha de expiración del token es: ${expDate.toLocaleString()}`);

        if (payload.exp < new Date().getTime() / 1000) {
            return done(null, false);
        }

        if (user && user.state && user.state === 1)
            return done(null, user);

        return done(null, false);
    } catch (error) {
        console.log("Error decrypting token", error);
        return done(null, false);
    }
});