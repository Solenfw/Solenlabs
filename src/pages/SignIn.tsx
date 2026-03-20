import React from 'react';
import { Link } from 'react-router-dom';

const SignIn: React.FC = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 font-mono">
      {/* Container for the Sign In layout */}
      <div className="w-full max-w-[1920px] min-h-[1080px] bg-[#0d0d0d] flex flex-col md:flex-row rounded-3xl overflow-hidden shadow-2xl border border-gray-800">
        
        {/* Left Side: Login Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-24 py-12 bg-gradient-to-b from-black to-[#1a1a1a]">
          <div className="max-w-md w-full mx-auto">
            <h1 className="text-white text-6xl font-bold mb-16 tracking-tight">Sign in</h1>
            
            <form className="space-y-8">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-gray-400 text-lg block" htmlFor="email">
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-[#d9d9d9] text-black h-14 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-gray-400 text-lg block" htmlFor="password">
                    Password
                  </label>
                  <Link to="#" className="text-gray-400 text-lg hover:text-white transition-colors">
                    Forget password?
                  </Link>
                </div>
                <input
                  type="password"
                  id="password"
                  className="w-full bg-[#d9d9d9] text-black h-14 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                className="w-full bg-[#4a6d7c] hover:bg-[#5a7d8c] text-white text-3xl font-bold h-16 rounded-xl mt-8 transition-all transform active:scale-95 shadow-lg"
              >
                Sign in
              </button>
            </form>

            {/* Footer Text */}
            <div className="mt-24 text-center md:text-left text-gray-400 text-lg">
              Don't have an account?{' '}
              <Link to="/signup" className="text-white font-bold hover:underline">
                Sign up
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side: Image Section */}
        <div className="hidden md:flex md:w-1/2 p-6">
          <div className="w-full h-full rounded-[40px] overflow-hidden relative group">
            <img
              src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="Earth from space"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Overlay for a more cinematic look */}
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
