import { Router } from "express";
import { authenticate } from "../Middleware/auth.middleware.js";
import { createProduct } from "../controller/product.controller.js";
import multer from "multer";
import { createProductValidator } from "../validator/product.validator.js";

const upload = multer({storage: multer.memoryStorage(),
    limits : {
        files : 5,
        fileSize : 1 * 1024 * 1024 //1MB (Single photo 1mb se choti honi chiye)
    }
      
})

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

    req.body?.price && (req.body.price = JSON.parse(req.body.price))
    req.body?.sizes && (req.body.sizes = JSON.parse(req.body.sizes))

    next()

}, createProductValidator, createProduct)

export default router