import { Router } from "express";
import { loginValidator, registerValidator } from "../validator/auth.validator.js";
import { login, refresh, register, getMe } from "../controller/auth.contrroller.js";
import { authenticate } from "../Middleware/auth.middleware.js";

const router = Router();

router.post('/register', registerValidator, register)
router.post('/login', loginValidator, login)
router.post('/refresh', refresh)
router.get('/me', authenticate, getMe)

export default router