import { Router } from "express";
import { addToCartValidator } from "../validator/cart.validator.js";
import { authenticate } from "../Middleware/auth.middleware.js";
import { addToCart } from "../controller/cart.controller.js";

const router = Router();

router.post("/",authenticate, addToCartValidator, addToCart)
export default router