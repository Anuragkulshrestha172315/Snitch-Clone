import { Router } from "express";
import { authenticate, authenticateSeller } from "../Middleware/auth.middleware.js";
import { createProduct, getAllProduct, listAllProductToSeller, listProduct, unlistProduct } from "../controller/product.controller.js";
import multer from "multer";
import { createProductValidator, listProductValidator, unlistProductValidator } from "../validator/product.validator.js";

const upload = multer({storage: multer.memoryStorage(),
    limits : {
        files : 5,
        fileSize : 1 * 1024 * 1024 //1MB (Single photo 1mb se choti honi chiye)
    }
      
})

const router = Router()

router.post('/', authenticate,authenticateSeller , upload.array("image"), (req, res, next) => {

    console.log("BODY:", req.body)
    console.log("PRICE:", req.body.price)
    console.log("SIZES:", req.body.sizes)

    req.body?.price && (req.body.price = JSON.parse(req.body.price))
    req.body?.sizes && (req.body.sizes = JSON.parse(req.body.sizes))

    next()

}, createProductValidator, createProduct)

router.get('/', authenticate, getAllProduct)
router.get('/seller', authenticate, authenticateSeller,listAllProductToSeller)


router.patch("/unlist/:id", authenticate, authenticateSeller, unlistProductValidator,unlistProduct)

router.patch("/unlist/:id", authenticate, authenticateSeller, listProductValidator, listProduct)

export default router