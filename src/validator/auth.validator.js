import {body, validationResult} from 'express-validator'

 export const registerValidator = [
    body('email')
       .exists().withMessage("Email is required").bail()
       .trim()
       .isEmail().withMessage("Enter the valid email address"),
    body('name')
       .exists().withMessage("Name is required").bail()
       .isString().withMessage("Name must be a String")
       .trim()
       .isLength({min : 2, max: 50}).withMessage("Name lenght must be between 2 to 50 character!"),
    body('password')
       .exists().withMessage("Password is required").bail()
       .isString().withMessage("Password must be a String")
       .trim()
       .isLength({min : 6}).withMessage("password must be a minimum 6 character longest"),


       (req, res, next) => {
        const errors = validationResult(req)

         if(!errors.isEmpty()) {
            return res.status(400).json({
                message : "Invalid Request",
                errors: errors.array()
            })
         }
        next()
        } 


]

export const loginValidator = [
   body('email')
       .exists().withMessage("Email is required").bail()
       .trim()
       .isEmail().withMessage("Enter the valid email address"),

   body('password')
       .exists().withMessage("Password is required").bail()
       .isString().withMessage("Password must be a String")
       .trim()
       .isLength({min : 6}).withMessage("password must be a minimum 6 character longest"),

       (req, res, next) => {
         if(!errors.isEmpty()){
            return res.status(400).json({
               message : "Invalid data",
               errors: errors.array()
            })
         }
         next()
       }
]

