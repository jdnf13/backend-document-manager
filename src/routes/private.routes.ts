import { Router } from "express";
import { createDocument, ping } from "../controllers/document.controller";
import { validationCreateDocument } from "../utils/requiredFields";
const router = Router();

import passport = require("passport");

router.get("/ping", passport.authenticate("jwt", { session: false }), ping);
router.post('/createDocument', passport.authenticate("jwt", { session: false }), validationCreateDocument, createDocument);

export default router;