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
        if (user && user.state && user.state === 1)
            return done(null, user);

        return done(null, false);
    } catch (error) {
        console.log("Error decrypting token", error);
        return done(null, false);
    }
});