/*eslint-disable */

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TopBarWithLogo from "@/components/TopBarWithLogo";
import Image from "next/image";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { AISLogo, loginPicture } from "@/resources/login_page";
import AutoLoginNotification from "@/components/AutoLoginNotification";
import "@/app/globals.css";
import { setupTokenRefresh } from "@/utils/auth";

/**
 * Login Page
 *
 * User authentication interface that provides secure login functionality.
 * Handles user credentials validation and session management.
 *
 * Features:
 * - Secure credential input
 * - Error handling and validation
 * - Remember me functionality
 * - Password reset options
 * - Redirect to dashboard on success
 *
 * @page
 * @route /log-in
 */
export default function Login() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        rememberMe: false,
    });
    const [showAutoLogin, setShowAutoLogin] = useState(false);
    const [autoLoginUser, setAutoLoginUser] = useState("");

    useEffect(() => {
        const user = localStorage.getItem("User");
        if (user) {
            try {
                sessionStorage.setItem("User", user);
                const userData = JSON.parse(user);
                setAutoLoginUser(userData.username);
                setShowAutoLogin(true);

                const timer = setTimeout(() => {
                    router.push("/dashboard");
                }, 1500); //adjust accordingly

                return () => clearTimeout(timer);
            } catch (error) {
                console.error("Error parsing user data:", error);
                localStorage.removeItem("User");
            }
        }
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const API = process.env.NEXT_PUBLIC_API;

            const response = await fetch(`${API}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password,
                }),
            });

            const data = await response.json();

            if (response.ok && data.access_token) {
                const userData = {
                    username: formData.username,
                    token: data.access_token,
                    refreshToken: data.refresh_token,
                };

                if (formData.rememberMe) {
                    localStorage.setItem("User", JSON.stringify(userData));
                }
                sessionStorage.setItem("User", JSON.stringify(userData));

                // Set up persistent token refresh
                setupTokenRefresh();
                router.push("/dashboard");
            } else {
                setError(data.detail || "Invalid username or password");
            }
        } catch (err) {
            setError("An error occurred. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <TopBarWithLogo />
            {showAutoLogin && (
                <AutoLoginNotification username={autoLoginUser} />
            )}

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
                    <form
                        onSubmit={handleSubmit}
                        className="w-full max-w-lg space-y-6"
                    >
                        {/* Username Input */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Enter Your Username"
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                                value={formData.username}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        username: e.target.value,
                                    })
                                }
                                disabled={isLoading}
                            />
                            <div className="absolute inset-y-0 left-3 flex items-center">
                                <svg
                                    className="h-5 w-5 text-gray-400"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                >
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
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        password: e.target.value,
                                    })
                                }
                                disabled={isLoading}
                            />
                            <div className="absolute inset-y-0 left-3 flex items-center">
                                <svg
                                    className="h-5 w-5 text-gray-400"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <rect
                                        x="3"
                                        y="11"
                                        width="18"
                                        height="11"
                                        rx="2"
                                        ry="2"
                                    />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                            </div>
                            <button
                                type="button"
                                className="absolute inset-y-0 right-3 flex items-center"
                                onClick={() => setShowPassword(!showPassword)}
                                disabled={isLoading}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5 text-gray-400" />
                                ) : (
                                    <Eye className="h-5 w-5 text-gray-400" />
                                )}
                            </button>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="text-red-600 text-sm text-center">
                                {error}
                            </div>
                        )}

                        {/* Remember Me and Forgot Password */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-4 w-4 text-indigo-600 rounded"
                                    checked={formData.rememberMe}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            rememberMe: e.target.checked,
                                        })
                                    }
                                    disabled={isLoading}
                                />
                                <span className="ml-2 text-sm text-gray-600">
                                    Remember me
                                </span>
                            </label>
                            <button
                                type="button"
                                className="text-sm text-indigo-600 hover:text-indigo-500 hover:underline"
                                disabled={isLoading}
                            >
                                Forgot Password?
                            </button>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Connecting...
                                </>
                            ) : (
                                "Log In"
                            )}
                        </button>

                        {/* Server notice */}
                        <div className="text-sm text-gray-500 text-center">
                            Note: Portal only works in NUS network.
                        </div>
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
