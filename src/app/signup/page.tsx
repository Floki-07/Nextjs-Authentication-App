"use client";
import axios from "axios";
import { tree } from "next/dist/build/templates/app-page";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: ""
    })
    const router = useRouter();
    const [buttondisabled, setButtondisabled] = useState(false)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtondisabled(false)
        } else {
            setButtondisabled(true)
        }
    }, [user])

    const onSignup = async () => {
        try {
            setLoading(true)
            const response = await axios.post('api/user/signup', user)
            console.log('Successfully signed up', response.data);
            router.push('/verifymessage',)
        }
        catch (error: any) {
            console.log(error.message);

        }
        finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className="absolute top-16 right-[30vw] box h-[60vh] w-[40vw] bg-violet-400 flex flex-col justify-center items-center p-6 rounded-lg shadow-lg">
                <div className="text-blue-900 text-4xl font-bold mb-6">{loading ? 'Processing..' : 'Signup Page'}</div>

                <div className="form flex flex-col w-full items-center space-y-4">
                    <input
                        type="text"
                        placeholder="Username"
                        value={user.username}
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                        className="p-3 w-[90%] rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        className="p-3 w-[90%] rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        className="p-3 w-[90%] rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        className={`px-3 py-2 font-bold text-lg text-white rounded-md  ${buttondisabled ? 'bg-gray-600' : 'bg-blue-600'}`}

                        onClick={onSignup}
                        disabled={buttondisabled}
                    >Sign Up</button>
                    <Link href="/login">Login</Link>
                </div>
            </div>
        </>
    )
}

export default page