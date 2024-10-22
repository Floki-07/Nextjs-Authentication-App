"use client";
import { useState } from "react";
import axios from "axios";

const CheckYourEmail = () => {
  const [resendStatus, setResendStatus] = useState<string | null>(null);
  const [isResending, setIsResending] = useState(false);

  // Function to handle resend verification email
  const handleResendEmail = async () => {
    setIsResending(true);
    setResendStatus(null);

    try {
      // Send POST request to resend verification email
      const response = await axios.post("/user/api/resendemail", {}); // No body needed since token is in cookies
      console.log(response);
      

      if (response.status === 200) {
        setResendStatus("Verification email has been resent. Please check your inbox.");
      } else {
        setResendStatus("Failed to resend verification email. Please try again later.");
      }
    } catch (error) {
      setResendStatus("An error occurred. Please try again.");
    }

    setIsResending(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Check Your Email</h1>
      <p className="text-lg text-center mb-4">
        Please verify your email to activate your account. We have sent a verification link to your email address.
      </p>
      {/* <p className="text-sm text-gray-600 mb-6">
        If you haven't received the email, you can request another one below.
      </p>

      {resendStatus && (
        <p className={`mb-4 ${resendStatus.includes("resent") ? "text-green-600" : "text-red-600"}`}>
          {resendStatus}
        </p>
      )}

      <button
        className={`px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 ${isResending && "cursor-not-allowed"}`}
        onClick={handleResendEmail}
        disabled={true}
      >
        {isResending ? "Resending..." : "Resend Verification Email"}
      </button> */}
    </div>
  );
};

export default CheckYourEmail;
