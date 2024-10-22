"use client";

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Profile = () => {
  const router = useRouter();

  const [data, setData] = useState<any>(null);  // Using `null` as initial state

  const handleLogout = async () => {
    try {
      await axios.get('/api/user/logout');
      router.push('/');
    } catch (error: any) {
      console.log(error);
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get('/api/user/me');
      setData(res.data.user);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className='bg-violet-600 p-4 shadow-lg'>
        <div className="flex justify-between items-center container mx-auto">
          <ul className='flex space-x-6 text-white font-bold'>
            <li><a href="#" className="hover:text-gray-200">Home</a></li>
            <li><a href="#" className="hover:text-gray-200">About</a></li>
            <li><a href="#" className="hover:text-gray-200">Contact</a></li>
            <li><a href="#" className="hover:text-gray-200">Profile</a></li>
          </ul>
          <button
            onClick={handleLogout}
            className='bg-red-600 px-4 py-2 rounded-lg text-white font-bold hover:bg-red-700 transition-all'>
            Logout
          </button>
        </div>
      </nav>

      {/* Profile Content */}
      <div className="container mx-auto p-6">
        {data ? (
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h1 className="text-2xl font-bold mb-4 text-violet-600">Profile</h1>
            <p className="text-lg">
              Username: <span className='font-bold text-gray-700'>{data?.username}</span>
            </p>
            <p className="text-lg mt-2">
              Email: <span className='font-bold text-gray-700'>{data?.email}</span>
            </p>
            <p className="text-lg mt-2">
              Verified: <span className={`font-bold ${data?.isVerified ? 'text-green-600' : 'text-red-600'}`}>
                {data?.isVerified ? 'The account is verified' : 'Not yet verified'}
              </span>
            </p>
          </div>
        ) : (
          <div className="text-center text-gray-600">Loading user data...</div>
        )}

        {/* Verification Reminder */}
        {data && !data?.isVerified && (
          <div className="text-center text-red-600 text-lg mt-6">
            Please verify your email to access your profile.
            <br />
            <Link href="https://mailtrap.io/inboxes/3219635/message" className='text-blue-600 underline'>
              Verify Email
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
