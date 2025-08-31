import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt"

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
            type:boolean,
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

userSchema.methods.isPassword=async function(password){
    return await bcrypt.compare(password,this.password)
}

export const user=mongoose.model("User",userSchema)

//use a service for the default avatar
