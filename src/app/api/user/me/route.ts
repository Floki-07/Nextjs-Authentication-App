import { getDataFromToken } from "@/helper/getDataFromToken";
import userModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const userId = await getDataFromToken(req);
        const user = await userModel.findOne({ _id: userId }).select('-password');
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        const response = NextResponse.json({
            message: 'Success',
            user: user
        });
        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}