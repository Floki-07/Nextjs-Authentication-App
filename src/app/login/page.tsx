"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
const page = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({
    email: "",
    password: "",
  })
  const [buttondisabled, setButtondisabled] = useState(false)
  const [errors, seterrors] = useState()
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtondisabled(false)
    } else {
      setButtondisabled(true)
    }
  }, [user])

  const onlogin = async () => {
    try {
      setLoading(true)
      setButtondisabled(true)
      const response = await axios.post('api/user/login', user)
      if (response.status === 200) {
        router.push('/profile')
      }

    } catch (error: any) {
      seterrors(error.response.data.error || 'An unexpected error occurred');
    }
    finally {
      setLoading(false)
      setButtondisabled(false)
    }
  }
  return (
    <div className="absolute top-16 right-[30vw] box h-[60vh] w-[40vw] bg-violet-400 flex flex-col justify-center items-center p-6 rounded-lg shadow-lg">
      <div className="text-blue-900 text-4xl font-bold mb-6">{loading ? 'Processing..' : 'Login Page'}</div>
      <div className="form flex flex-col w-full items-center space-y-4">

        <input
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className="p-3 w-[90%] rounded-lg  text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          className="p-3 w-[90%] rounded-lg text-black  border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required />

        <button
          onClick={onlogin}
          className={`px-3 py-2 font-bold text-lg text-white rounded-md  ${buttondisabled ? 'bg-gray-600' : 'bg-blue-600'}`}
          disabled={buttondisabled || loading}
        >Log in</button>

        <div>{errors && <div className="text-red-600 text-lg">{errors}</div>}</div>
        <Link href="/signup">New user? <span className="text-blue-800 font-bold underline">Sign Up</span></Link>
      </div>
    </div>
  )
}

export default page