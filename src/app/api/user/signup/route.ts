import { connect } from "@/dbConfig/dbConfig"
import userModel from "@/models/userModel"
import { error } from "console";
import { NextRequest,NextResponse } from "next/server"
import bcryptjs from 'bcryptjs'; 
import { sendEmail } from "@/helper/mailer";
// import { useRouter } from "next/router";
import jwt from 'jsonwebtoken';
connect()


export async function  POST(request:NextRequest) {
    // const router = useRouter();
    const reqBody=await request.json();
    const { username,password,email}=reqBody
    console.log( username,password,email);
    const user=await userModel.findOne({email})

    if(user){
        return NextResponse.json({error:"User already exists"},{status:400} )   
    }

    //hash password
    const salt=await bcryptjs.genSalt(10)
    
    const hashedpassword=await  bcryptjs.hash(password,salt);
 
    const newUser=new userModel({username,password:hashedpassword,email});
 
    await newUser.save();
    let tokendata={
        id:newUser._id,
        username:newUser.username,
        email:newUser.email
    }
    // let token=await jwt.sign( tokendata , process.env.JWT_SECRET_KEY! ,{expiresIn:"1h"})
    
    await sendEmail(newUser,'VERIFY',newUser._id);
    
    const response=NextResponse.json({
        message: "User created successfully",
        success:true,
        user: newUser
    }) 
    // response.cookies.set('token', token);

    return response

}