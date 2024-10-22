import { JsonWebTokenError } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export function getDataFromToken(request: NextRequest) {
    try {
        const encodedToken: any = request.cookies.get('token')?.value;
        const decodedToken: any = jwt.verify(encodedToken, process.env.JWT_SECRET_KEY!);
        return decodedToken.id;
    }catch (error) {
        throw new Error;
    }
}

