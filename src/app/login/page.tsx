"use client";

import React, { useState } from 'react';
import TopBarWithLogo from '@/components/TopBarWithLogo';
import Image from 'next/image';
import { Eye, EyeOff } from 'lucide-react';
import { AISLogo, loginPicture } from '@/resources/login_page';
import "@/app/globals.css"

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <TopBarWithLogo />
      
      <div className="flex-1 flex">
        {/* Left side - Login Form */}
        <div className="flex-1 flex flex-col items-center justify-center px-8">
          {/* Logo */}
          <div className="mb-12 flex justify-center w-full">
            <Image
              src={AISLogo}
              alt="AIS Logo"
              width={100}
              height={100}
              className="text-indigo-600"
            />
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-6">
            {/* Username Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Enter Your Username"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
              />
              <div className="absolute inset-y-0 left-3 flex items-center">
                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Your Password"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
              <div className="absolute inset-y-0 left-3 flex items-center">
                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>

            {/* Remember Me and Forgot Password */}
            {/* TODO: Implement Forgot Password here */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-indigo-600 rounded"
                  checked={formData.rememberMe}
                  onChange={(e) => setFormData({...formData, rememberMe: e.target.checked})}
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <button 
  type="button" 
  className="text-sm text-indigo-600 hover:text-indigo-500 hover:underline"
>
  Forgot Password ?
</button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
            >
              Log In
            </button>
          </form>
        </div>

        {/* Right side - Illustration */}
        <div className="flex-1 flex items-center justify-center p-8">
          <Image
            src={loginPicture}
            alt="Shipping Illustration"
            width={700}
            height={700}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}