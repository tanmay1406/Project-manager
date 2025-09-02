import {User} from "../models/user-model.js"
import APIResponse from "../utils/api-response.js"
import asyncHandler from "../utils/async-handler.js"
import ApiError from "../utils/api-error.js"
import { emailVerificationMailgenContent, sendEmail } from "../utils/mail.js"


const generateAccessAndRfreshToken=async (userID)=>{
    try {
        const user=await User.findById(userID)
        const accessToken=user.generateAccessToken()
        const refreshToken=user.enerateRefreshToken()

        user.refreshToken=refreshToken
        await user.save({validateBeforeSave:false})
        return {accessToken,refreshToken}
    } catch (error) {
        throw new ApiError(
            5000,
            "Something went wrong while generating tokens"
        )
    }
}


const registerUser=asyncHandler(async (req,res)=>{
    const{email,username,password,role}=req.body
    const ExistingUser=await User.findOne({
        $or:[{username},{email}]
    })
    if(ExistingUser){
        throw new ApiError(409,"User with email or username already exists",[])
    }

    const user = await User.create({
        email,
        password,
        username,
        isEmailVerified:false,

    })


    const {unhasehdToken,hashedToken,tokenExpiry}=user.generateTempToken()

    user.emailVerficationTokes=hashedToken
    user.emailVerficationExpiry=tokenExpiry

    await user.save({validateBeforeSave:false})
    await sendEmail(
        {
            email:user?.email,
            subject:"Please verify your email",
            mailgenContent:emailVerificationMailgenContent(
                user.username,
                `${req.protocol}://${req.get("host")}/api/v1/users/verify-email/${unhasehdToken}`
            )
        }
    )

    //Now we dont need to send evey data to avoid this we make another backend call
    const createdUser=await User.findById(user._id).select(
        "-password -refresHToken -emailVerificationToken -emailVerificationExpiry" 
    )

    if(!createdUser){
        throw new ApiError(500,"Something went wrong during the registeration process")
    }
    

    return res
        .status(201)
        .json(
            new APIResponse(
                200,
                {user:createdUser},
                "User registered successfully and verifucation email is sent to you"
            )
        )

})

export {registerUser}