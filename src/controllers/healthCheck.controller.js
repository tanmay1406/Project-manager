import APIResponse from "../utils/api-response.js"
import asyncHandler from "../utils/async-handler.js"
//const healthCheck = (req,res)=>{
//    try {
//            res.status(200).json(
//            new APIResponse (200,{message:"Server is running"})
//            )
//    } catch (error) {
//        
//    }
//}
//it id not important to write these try and catch everytime you can do this with higher order function


const healthCheck = asyncHandler(async(req,res)=>{
    res.status(200).json(new APIResponse (200,{message:"server is running"}))
})
export default healthCheck