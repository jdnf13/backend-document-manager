"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user/user.controller");
const requiredFields_1 = require("../utils/requiredFields");
const router = (0, express_1.Router)();
router.post('/signup', requiredFields_1.validationNewUser, user_controller_1.signUp);
router.post('/login', requiredFields_1.validationLogin, user_controller_1.signIn);
exports.default = router;
