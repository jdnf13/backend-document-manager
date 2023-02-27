import { Router } from "express";
import { signIn, signUp } from "../controllers/user.controller";
import { validationNewUser, validationLogin} from "../utils/requiredFields";
const router = Router();


router.post('/signup', validationNewUser, signUp);
router.post('/login', validationLogin, signIn);


export default router;