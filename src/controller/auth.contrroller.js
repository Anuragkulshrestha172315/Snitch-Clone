import userModel from "../models/user.model.js";
import bcrypt from "bcrypt"
export async function register(req, res){
    try {
        const {name, email, password} = req.body;

        const isExist = await userModel.findOne({email});

        if(isExist){
            return res.status(400).json({
                message : "User already exist with this email address",
                errors : [
                    {
                        field : "email",
                        message : "User already exist with this email address"
                    }
                ]
            })
        }

        
        const user = await userModel.create({
            name,
            email,
            passwordHash: await bcrypt.hash(password, 10)
        })

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
        
    } catch (error) {
        return res.status(500).json({
            message: `Internal server error ${error}`
        });
    }
}