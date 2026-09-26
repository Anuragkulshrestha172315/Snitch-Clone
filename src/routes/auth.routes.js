import { Router } from "express";
import { registerValidator } from "../validator/auth.validator.js";
import { register } from "../controller/auth.contrroller.js";

const router = Router();

router.post('/register', registerValidator, register)

export default router