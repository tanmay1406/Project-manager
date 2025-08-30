import { Router } from "express";//importing the object router from the express
import healthCheck from "../controllers/healthCheck.controller.js";
const router=Router()//creating an instance to use further in the code 

router.route("/").get(healthCheck)

export default router