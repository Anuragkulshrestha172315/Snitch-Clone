import { Router } from "express";
import { loginValidator, registerValidator } from "../validator/auth.validator.js";
import { login, refresh, register } from "../controller/auth.contrroller.js";

const router = Router();

router.post('/register', registerValidator, register)
router.post('/login', loginValidator, login)
router.post('/refresh', refresh)

export default router