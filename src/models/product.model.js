import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title : {
        type : String,
        required  : true,
        minLength : 2,
        maxLength : 50,

    },
    description : {
        type : String,
        required : true,
        minLength : 20,
        maxLength : 500
    },

    images : {
        type : [{
                type : String
        }],
        validate : {
            validator : image => image.length <= 5,
            message : "A product have at most 5 images"
        }
    },
    price : {
        amount : {
            type : Number,
            required : true
        },
        currency : {
            type : String,
            enum :["INR", "USD"],
            default : "INR"
        }
    },
    sizes :{ 
        size :{
            type : String,
            enum : ["XS", "S", "M", "L", "XL", "XXL"],
            required : true
        },
        stock : {
            type : Number,
            min : 0,
            default : 0,
        }
    },

    seller : { // y product kon sa seller create kr rha h uska id
        type : mongoose.Types.ObjectId,
        ref : "users",
        required : true
    }
})


const productModel = new mongoose.model("product", productSchema);

export default productModel;