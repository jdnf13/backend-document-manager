"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const document_controller_1 = require("../controllers/document/document.controller");
const requiredFields_1 = require("../utils/requiredFields");
const router = (0, express_1.Router)();
const passport = require("passport");
const user_admin_controller_1 = require("../controllers/user/user.admin.controller");
//Documents
router.get("/ping", passport.authenticate("jwt", { session: false }), document_controller_1.ping);
router.get('/documentFindByCode', passport.authenticate("jwt", { session: false }), requiredFields_1.validationFindByCode, document_controller_1.documentByCode);
router.get('/documentFindById', passport.authenticate("jwt", { session: false }), requiredFields_1.validationFindById, document_controller_1.documentById);
router.get('/documentsFindAll', passport.authenticate("jwt", { session: false }), document_controller_1.documentsAll);
router.delete('/documentDelete', passport.authenticate("jwt", { session: false }), requiredFields_1.validationFindById, document_controller_1.documentDelete);
router.put('/documentUpdate', passport.authenticate("jwt", { session: false }), requiredFields_1.validationUpdateDocument, document_controller_1.documentUpdate);
router.post('/documentCreate', passport.authenticate("jwt", { session: false }), requiredFields_1.validationCreateDocument, document_controller_1.documentCreate);
//Admin Users
router.put('/updateInfoUser', passport.authenticate("jwt", { session: false }), requiredFields_1.validationUpdateInfoUser, user_admin_controller_1.updateInfoUser);
router.put('/updateStateUser', passport.authenticate("jwt", { session: false }), requiredFields_1.validationStateUser, user_admin_controller_1.updateStateUser);
exports.default = router;
