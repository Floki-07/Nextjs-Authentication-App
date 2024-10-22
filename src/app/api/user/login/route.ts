// "use client"
import { connect } from "@/dbConfig/dbConfig"
import userModel from "@/models/userModel"
import { error } from "console";
import { NextRequest,NextResponse } from "next/server"
import bcryptjs from 'bcryptjs'; 
import jwt from 'jsonwebtoken';

connect();


export async function POST(request:NextRequest) {

    //step 1:Remove data from body
    const reqBody=await request.json();
    const { email,password}=reqBody
    //step 2:Find the email if not present give error
    let user=await userModel.findOne({email})
    if(!user){
        return NextResponse.json({error:"User not found"},{status:404} )
    } 
    //step 3: Decrypt the password and check
    //check the password    
    const isMatch = await bcryptjs.compare(password, user.password);
    if(isMatch){
        //step 4: If password match then generate token
        let tokendata={
            id:user._id,
            username:user.username,
            email:user.email
        }
        let token=await jwt.sign( tokendata , process.env.JWT_SECRET_KEY! ,{expiresIn:"1h"})
        //Tip:   #! means it will be available always never null
        
        const response= NextResponse.json({
            success:true,
            message:"Login successful",
        })
        response.cookies.set('token', token)
        return response;
    }else{
        //Step &: Return 401 if not password dont match
        return NextResponse.json({error:"Invalid credentials"},{status:401} )
    }




}