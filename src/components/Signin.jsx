import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_API_URL;

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [statusCode, setStatusCode] = useState(null);
  const navigate = useNavigate();

  const authenticate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/user/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const res = await response.json();
      setStatusCode(response.status);
      if (response.ok) {
        localStorage.setItem('token', res.token);
        alert('Logged in successfully');
        navigate('/homepage');
      } else {
        alert('Incorrect username or password');
      }
    } catch (err) {
      console.error('Error occurred', err);
      setStatusCode(500);
    }
  };

  const renderError = () => {
    console.log('error called');
    switch (statusCode) {
      case 400:
        return <div className="text-red-500">Bad Request</div>;
      case 401:
        return <div className="text-red-500">Unauthorized</div>;
      case 404:
        return <div className="text-red-500">Not Found</div>;
      case 500:
        return <div className="text-red-500">Internal Server Error</div>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {statusCode ? (
          renderError()
        ) : (
          <form onSubmit={authenticate} className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-8 sm:p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-extrabold text-gray-900">Welcome back</h2>
                <p className="mt-2 text-sm text-gray-600">Sign in to your account</p>
              </div>
              <div className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <Link to="/forgot-password" className="font-medium text-purple-600 hover:text-purple-500">
                      Forgot your password?
                    </Link>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    Sign in
                  </button>
                </div>
              </div>
            </div>
            <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 sm:px-12">
              <p className="text-xs leading-5 text-gray-500">
                Don't have an account?{' '}
                <Link to="/signup" className="font-medium text-purple-600 hover:text-purple-500">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}