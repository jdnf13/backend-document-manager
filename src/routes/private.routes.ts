import { Router } from "express";
import { ping } from "../controllers/document.controller";
const router = Router();

import passport = require("passport");

router.get("/ping", passport.authenticate("jwt", { session: false }), ping);

export default router;