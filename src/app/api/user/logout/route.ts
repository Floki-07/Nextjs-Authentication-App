import { NextResponse } from "next/server";


export async function GET(){
    try {
        const response =await NextResponse.json({
            message:"Logout Successfull",
            success:true
        })
        response.cookies.set('token',"",{expires:Date.now(),httpOnly:true})
        return response
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}
