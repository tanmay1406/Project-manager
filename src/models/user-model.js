import mongoose,{Schema} from "mongoose";

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



export const user=mongoose.model("User",userSchema)

//use a service for the default avatar
