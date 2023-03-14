import { Router } from "express";
import { documentCreate, documentsAll, documentByCode, documentById, ping, documentDelete, documentUpdate } from "../controllers/document/document.controller";
import { validationCreateDocument, validationFindByCode, validationFindById, validationStateUser, validationUpdateDocument, validationUpdateInfoUser } from "../utils/requiredFields";
const router = Router();

import passport = require("passport");
import { updateInfoUser, updateStateUser } from "../controllers/user/user.admin.controller";

//Documents
router.get("/ping", passport.authenticate("jwt", { session: false }), ping);
router.get('/documentFindByCode', passport.authenticate("jwt", { session: false }), validationFindByCode, documentByCode);
router.get('/documentFindById', passport.authenticate("jwt", { session: false }), validationFindById, documentById);
router.get('/documentsFindAll', passport.authenticate("jwt", { session: false }), documentsAll);

router.delete('/documentDelete', passport.authenticate("jwt", { session: false }), validationFindById, documentDelete);

router.put('/documentUpdate', passport.authenticate("jwt", { session: false }), validationUpdateDocument, documentUpdate);

router.post('/documentCreate', passport.authenticate("jwt", { session: false }), validationCreateDocument, documentCreate);

//Admin Users
router.put('/updateInfoUser', passport.authenticate("jwt", { session: false }), validationUpdateInfoUser, updateInfoUser);
router.put('/updateStateUser', passport.authenticate("jwt", { session: false }), validationStateUser, updateStateUser);

export default router;