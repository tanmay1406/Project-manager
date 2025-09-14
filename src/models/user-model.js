import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import crypto from "crypto"

const userSchema = new Schema(
    {
        avatar:{
            type:{
                url:String,
                localPath:String
            },
            default:{
                url:`https://placehold.co/200*200`,
                localPath:" "
            }
        },
        userName:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true
        },
        email_id:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true
        },
        fullName:{
            type:String,
            trim:true
        },
        password:{
            type:String,
            required:[true,"password is requires"]
        },
        isEmailVerified:{
            type:Boolean,
            default:false
        },
        refreshToken:{
            type:String
        },
        forgotPasswordTaken:{
            type:String
        },
        forgotPasswordExpiry:{
            type:Date
        },
        emailVerficationTokes:{
            type:String
        },
        emailVerficationExpiry:{
            type:Date
        }  
    },
    {
        timestamps:true
    }
)

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next()
    this.password=await bcrypt.hash(this.password,10)//this is overwriting the already existing password in the data base
    next()
})

userSchema.methods.isPasswordCorrect =async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken=function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            userName:this.userName,
        },//This is the payload of the token
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:process.env.ACCESS_TOKEN_EXPIRY}
    )
}//this is your access token to be used 


userSchema.methods.generateRefreshToken=function(){
    return jwt.sign(
        {
            _id:this._id,
            
        },//This is the payload of the token
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:process.env.REFRESH_TOKEN_EXPIRY}
    )
//this creates your refresh token 
}

userSchema.methods.generateTempToken=function(){
    const unhasehdToken=crypto.randomBytes(20).toString("hex")
    //we can leave them like this bec these are very shortlived 
    const hashedToken=crypto
        .createHash("sha256")
        .update(unhasehdToken)
        .digest('hex')

    const tokenExpiry=Date.now()+(20*60*1000)
    return {unhasehdToken,hashedToken,tokenExpiry}
}


export const User=mongoose.model("User",userSchema)

//use a service for the default avatar
