import React, { useState } from 'react';

const apiUrl = import.meta.env.VITE_API_URL;

export default function ForgetPassword({ setShowForgetPassword }) {
  const [email, setEmail] = useState('');

  const sendResetPassword = async (email) => {
    try {
      const response = await fetch(`${apiUrl}/user/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Reset email sent successfully');
      } else {
        alert('Failed to send reset email');
      }
    } catch (err) {
      console.error('Error occurred in the frontend', err);
    }
  };

  const sendEmailToReset = async (event) => {
    event.preventDefault();
    await sendResetPassword(email);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <form
          className="bg-white rounded-lg shadow-md overflow-hidden"
          onSubmit={sendEmailToReset}
        >
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-green-700">
                Forgot Password
              </h2>
              <p className="mt-2 text-sm text-blue-600">
                Enter your email to reset your password
              </p>
            </div>
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-green-700"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-green-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300"
                >
                  Send Reset Link
                </button>
              </div>
              <div className="text-sm text-center">
                <button
                  type="button"
                  onClick={() => setShowForgetPassword(false)}
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Back to Sign in
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
