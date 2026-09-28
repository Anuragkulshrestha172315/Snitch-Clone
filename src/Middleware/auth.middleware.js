import { readAccessToken } from "../utils/auth.utils.js"


export async function authenticate(req, res, next){
    const accessToken = req.headers.authorization?.split(" ")[1]
    if(!accessToken){
        return res.status(400).json({
            message : "Access Token is not found in header"
        })
    }


    try {
        const decoded = readAccessToken(accessToken);

        req.user = decoded // request m ek property create ki h "user name s" usme save ki h decoded

        next()

    } catch (error) {
        return res.status(401).json({
            message :  `Invalid or expired access token ${error}`
        })
    }

}  


export async function authenticateSeller(req, res, next){
    if(req.user.role !==  "seller"){
        return res.status(403).json({
            message : "User is not authorize to create a products"
            
        })
    }
    next()
}
