import { Router } from "express";//importing the object router from the express
import { registerUser } from "../controllers/auth.controller.js";

const authRouter=Router()//creating an instance to use further in the code 

authRouter.route("/register").post(registerUser)


export default authRouter