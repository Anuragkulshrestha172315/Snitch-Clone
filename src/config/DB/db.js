import mongoose  from "mongoose";
import config from "../config.js";

export async function connectDB(req, res) {
    try {
    await mongoose.connect(config.MONGO_URI)
    console.log(`DataBase connected successfully`);
    
    } catch (error) {
        console.log(`Error in database ${error}`);
    }    
}