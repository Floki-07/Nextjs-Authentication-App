import mongoose from "mongoose";
import { type } from "os";

const userSchema=await mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    isVerified:{
        type:Boolean,
        default :false
    },
    isAdmin:{
        type:Boolean,
        default :false
    },
    verifytoken:String,
    verifytokenexpiry:Date,
    forgotpaswordtoken:String,
    forgotpaswordtokenexpiry:Date,
})

const userModel = mongoose.models.user || mongoose.model('user', userSchema);
export default userModel