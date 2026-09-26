import config from "../config/config.js";
import  jwt from 'jsonwebtoken'


export function createAccessToken({userId}, role){
    const  accessToken = jwt.sign({userId, role}, config.ACCESS_TOKEN_SECRET, {expireds})
}