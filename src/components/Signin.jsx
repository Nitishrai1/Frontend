import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ForgetPassword from './ForgetPassword'; 
import { useNavigate } from 'react-router-dom';


const apiUrl = import.meta.env.VITE_API_URL;

export default function Signin({ setAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [statusCode, setStatusCode] = useState(null);
  const [showForgetPassword, setShowForgetPassword] = useState(false);
  const navigate=useNavigate();

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
        setAuthenticated(true);
        navigate('/homepage')
      } else {
        alert('Incorrect username or password');
      }
    } catch (err) {
      console.error('Error occurred', err);
      setStatusCode(500);
    }
  };

  const renderError = () => {
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

  return showForgetPassword ? (
    <ForgetPassword setShowForgetPassword={setShowForgetPassword} />
  ) : (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {statusCode ? (
          renderError()
        ) : (
          <form
            onSubmit={authenticate}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-green-700">
                  Welcome back
                </h2>
                <p className="mt-2 text-sm text-blue-600">
                  Sign in to your Tasky account
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
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-green-700"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-green-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
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
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-green-700"
                    >
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <button
                      type="button"
                      onClick={() => setShowForgetPassword(true)}
                      className="font-medium text-blue-600 hover:text-blue-500"
                    >
                      Forgot your password?
                    </button>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300"
                  >
                    Sign in
                  </button>
                </div>
              </div>
            </div>
            <div className="px-8 py-4 bg-green-50 border-t border-green-100">
              <p className="text-xs leading-5 text-green-700">
                Don't have an account?{' '}
                <Link
                  to="/signup"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
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
