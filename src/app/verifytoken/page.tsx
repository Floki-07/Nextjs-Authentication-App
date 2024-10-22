"use client"

import axios from 'axios'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'

const Verify = () => {
    const [token, setToken] = useState<string>("")
    const [message, setMessage] = useState<string>("")
    const [verified, setVerified] = useState<boolean>(false)
    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    const verifyToken = async () => {
        setLoading(true);  // Start loading before making the request
        try {
            await axios.post('/api/user/verifytoken', { token })
            setVerified(true)
            setError("")  // Clear any errors
        } catch (error: any) {
            setMessage(error.response.data.error || "Verification failed")
        } finally {
            setLoading(false);  // End loading after the verification process
        }
    }

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const tokenFromUrl: string = params.get('token') || "";
        console.log(tokenFromUrl);
        setToken(tokenFromUrl);
    }, [])

    useEffect(() => {
        if (token.length > 0) {
            verifyToken()
        }
    }, [token])

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : verified ? (
                <div className='bg-green-300 absolute top-[40vh] right-[40vw] text-2xl px-3 py-2 rounded-md text-center'>
                    You have been verified!
                    <br />
                    <Link href="/login" className='underline font-bold text-blue-600 text-center'>Login</Link>
                </div>
            ) : message ? (
                <div className='bg-red-400 absolute top-[40vh] right-[35vw] text-2xl px-3 py-2 rounded-md text-center'>
                    {/* {message} */}
                    You may be verified already please                     <Link href="/login" className='underline font-bold text-blue-600 text-center'>Login</Link> <br />or 
                    <br />
                    Please click on the link given in the email.
                </div>
            ) : token.length === 0 && (
                <div>
                    Some error occurred.
                    <br />
                    Please click on the link given in the email.
                </div>
            )}
        </>
    )
}

export default Verify;
