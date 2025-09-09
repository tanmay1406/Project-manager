import { body } from "express-validator";


const userRegisterValidator=()=>{
    return[
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Email is invalid"),

        body("username")
            .trim()
            .notEmpty()
            .withMessage("Username is required")
            .toLowerCase()
            .withMessage("Username must be in lower case")
            .isLength({min:3})
            .withMessage("The username must be atleast 3 charater long"),
        body("password")
            .trim()
            .notEmpty()
            .withMessage("Password is required"),
        body("fullname")    
            .trim()
            .optional()     
    ]
}

export{
    userRegisterValidator
}