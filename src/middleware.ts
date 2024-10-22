import { redirect } from 'next/dist/server/api-utils'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

    //check if on login or sign up
    const path = request.nextUrl.pathname
    const isPublicpath = path === '/login' || path  === '/signup' || path === '/verifytoken'

    const token = request.cookies.get('token')?.value || ''
    
    if (isPublicpath && token) {
        return NextResponse.redirect(new URL('/profile', request.nextUrl))
    } 
    // check if authenticated and on profile page
    if (!isPublicpath && !token) {
        //not authenticated
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/',
        '/login',
        '/signup',
        '/profile',
        '/profile/:path*',
        '/verifytoken'
    ],
}   