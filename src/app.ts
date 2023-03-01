import cors from "cors";
import express from "express";
import morgan from "morgan";

import config from "./config/config";
import authRoutes from "./routes/auth.routes";
import privateRoutes from "./routes/private.routes";
import passportMiddelware from "./middlewares/passport";
import passport from "passport";

//initializations
const app = express();


//settings
app.set('port', config.ApiEnv.PORT);


//middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended:false}))
app.use(express.json());
app.use(passport.initialize());
passport.use(passportMiddelware);

//routes
app.get('/', (req, res) => {
    res.send(`This api runs on the port ${app.get('port')}`);
});

app.use(authRoutes);
app.use(privateRoutes);

export default app;