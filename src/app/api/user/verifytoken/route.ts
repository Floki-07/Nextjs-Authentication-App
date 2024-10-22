import userModel from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";



export async function POST(req: NextRequest) {

    try {
        const reqBody = await req.json();
        const { token } = reqBody
        const user = await userModel.findOne( { verifytoken: token, verifytokenexpiry: { $gt: Date.now() } } )

        if (!user) {
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
        }

        user.isVerified = true
        user.verifytoken = undefined;
        user.verifytokenexpiry = undefined;
        await user.save();

        return NextResponse.json({ message: "Email verified successfully", success:true });

    } catch (error: any) {
        throw new Error(error.message);
    }

}
