import { getDataFromToken } from "@/helper/getDataFromToken";
import { sendEmail } from "@/helper/mailer";
import userModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export default async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json(); // Assuming request.json() returns a Promise.
        // Retrieve the encrypted token from the request body
        console.log(reqBody);
        
        const userId = await getDataFromToken(reqBody);

        console.log(userId);
               
    
        // if (!userId) {
        //     return NextResponse.json({ error: "Encrypted token is required." }, { status: 400 });
        // }

        // Find user by ID
        const user = await userModel.findById(userId);
        console.log(user);
        if (!user) {
            return NextResponse.json({ error: "User not found." }, { status: 404 });
        }

        // Send verification email
        await sendEmail(user.email, 'VERIFY', userId);

        return NextResponse.json({ message: "Verification email sent successfully." }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
