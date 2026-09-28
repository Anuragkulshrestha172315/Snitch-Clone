import { Router } from "express";
import { authenticate } from "../Middleware/auth.middleware.js";
import { createProduct } from "../controller/product.controller.js";
import multer from "multer";

const upload = multer({storage: multer.memoryStorage()})

const router = Router()

router.post('/', authenticate, (req, res, next) => {
    if(req.user.role !==  "seller"){
        return res.status(403).json({
            message : "User is not authorize to create a products"
            
        })
    }
    next()
}, upload.array("image"), (req, res, next) => {

    console.log("BODY:", req.body)
    console.log("PRICE:", req.body.price)
    console.log("SIZES:", req.body.sizes)

    req.body.price = JSON.parse(req.body.price)
    req.body.sizes = JSON.parse(req.body.sizes)

    next()

}, createProduct)

export default router