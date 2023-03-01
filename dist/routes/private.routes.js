"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const document_controller_1 = require("../controllers/document.controller");
const router = (0, express_1.Router)();
const passport = require("passport");
router.get("/ping", passport.authenticate("jwt", { session: false }), document_controller_1.ping);
exports.default = router;
