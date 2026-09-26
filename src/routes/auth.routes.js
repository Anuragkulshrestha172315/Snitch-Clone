import { Router } from "express";
import { loginValidator, registerValidator } from "../validator/auth.validator.js";
import { login, register } from "../controller/auth.contrroller.js";

const router = Router();

router.post('/register', registerValidator, register)
router.post('/login', loginValidator, login)

export default router