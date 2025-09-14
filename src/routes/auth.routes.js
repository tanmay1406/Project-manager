import { Router } from "express";//importing the object router from the express
import { login, registerUser } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validator.middlewares.js";
import { userRegisterValidator,userLoginValidator } from "../validators/index.js";



const authRouter=Router()//creating an instance to use further in the code 

authRouter.route("/register").post(userRegisterValidator(),validate,registerUser)
authRouter.route("/login").post(userRegisterValidator(),validate,login)


export default authRouter