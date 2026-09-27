import productModel from "../models/product.model.js";

export async function createProduct(req, res, next){
    console.log(req.body);

    res.status(200).json({
        message : "Dammy Data"
    })
    
}