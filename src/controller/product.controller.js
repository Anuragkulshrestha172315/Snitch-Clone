import productModel from "../models/product.model.js";
import { uploadFile } from "../services/storage.services.js";


export async function createProduct(req, res, next){

    const fileUrls = []

    for(let i = 0; i < req.files.length; i++){
        const response = await uploadFile({
            buffer : req.files[i].buffer,
            fileName : req.files[i].originalname
        })
        
        fileUrls.push(response.url)
    }
    console.log(fileUrls);


    const product = await productModel.create({
        title  : req.body.title,
        description : req.body.description,
        price: {
            amount : req.body.price.amount,
            currency : req.body.price.currency
        },
        sizes : req.body.sizes,
        images : fileUrls,
        seller : req.user.userId
    })
    

    res.status(201).json({
        message : "Product created successfully",
        data : {
            product
        }
    })
    

    res.status(200).json({
        message : "Dammy Data"
    })
    
}

export async function getAllProduct(req,res) {
    const allproduct = await productModel.find({
        published : true
    });

    res.status(201).json({
        message : "All product featch successfully",
        data : {
            allproduct
        }
    })
}
export async function listAllProductToSeller(req,res) {
    const allproduct = await productModel.find();

    res.status(201).json({
        message : "All product featch successfully",
        data : {
            allproduct
        }
    })
}

export async function unlistProduct(req,res) {
    const {id} = req.body

    const product = await productModel.findById(id);

    if(!product){
        return res.status(404).json({
            message : "Product not found by Id"
        })
    }
    
    await productModel.findByIdAndUpadate(id, {
        published : false
    })

    return res.status(200).json({
            message : "Product unpublished successfully"
    })
} 

export async function listProduct(req,res) {
    const {id} = req.body

    const product = await productModel.findById(id);

    if(!product){
        return res.status(404).json({
            message : "Product not found by Id"
        })
    }
    
    await productModel.findByIdAndUpadate(id, {
        published : true
    })

    return res.status(200).json({
            message : "Product published successfully"
    })
} 

