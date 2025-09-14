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
    const{email_id,userName,password,role}=req.body
    const ExistingUser=await User.findOne({
        $or:[{userName},{email_id}]
    })
    if(ExistingUser){
        throw new ApiError(409,"User with email or username already exists",[])
    }

    const user = await User.create({
        email_id,
        password,
        userName,
        isEmailVerified:false,

    })


    const {unhasehdToken,hashedToken,tokenExpiry}=user.generateTempToken()

    user.emailVerficationTokes=hashedToken
    user.emailVerficationExpiry=tokenExpiry

    await user.save({validateBeforeSave:false})
    await sendEmail(
        {
            email_id:user?.email_id,
            subject:"Please verify your email",
            mailgenContent:emailVerificationMailgenContent(
                user.userName,
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

const login=asyncHandler(async(req,res)=>{
    const {email_id,password,userName}=req.body
    if(!userName || !email_id){
        throw new ApiError(400,"Username or email id already exists")
    }

    const user=await User.findOne({email_id})

    if(!user){
        throw new ApiError(400,"User does not exist")
    }


     const isPasswordValid=await user.isPasswordCorrect(password)

     if(!isPasswordCorrect){
        throw new ApiError(400,"Password is incorrect")
     }


     const {accessToken,refreshToken}=await generateAccessAndRfreshToken(user._id) 



     const loggedInUser=await User.findById(user._id).select(
        "-password -refresHToken -emailVerificationToken -emailVerificationExpiry" 
    )

    //cookies 
    const options={
        httpOnly:true,
        secure:true
    }

    return res
        .status(200)
        .cookie("Access Token",accessToken,options)
        .cookie("Refersh Token",refreshToken,options)
        .json(
            200,
            {
                user:loggedInUser,
                accessToken,
                refreshToken
            },
            "User logged in successfully"
        )

})

export {registerUser,login}