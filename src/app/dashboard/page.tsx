/* eslint-disable */
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TopBarWithUser from "@/components/TopBarWithUser";
import "@/app/globals.css";
import MapWithSearchBar from "@/components/MapWithSearchbar";
import { AlertCircle } from "lucide-react";

export default function DashboardPage() {
    const router = useRouter();
    const [username, setUsername] = useState<string>("");
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const sessionUser = sessionStorage.getItem("User");
        const localUser = localStorage.getItem("User");
        const userData = sessionUser || localUser;

        if (!userData) {
            setIsAuthorized(false);
            setIsLoading(false);
            return;
        }

        try {
            const { username } = JSON.parse(userData);
            setUsername(username);
            setIsAuthorized(true);
        } catch {
            setIsAuthorized(false);
        } finally {
            setIsLoading(false);
        }
    }, []);

    if (isLoading) {
        return (
            <div className="h-screen w-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!isAuthorized) {
        return (
            <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-50">
                <div className="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-lg text-center">
                    <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">
                        Access Denied
                    </h1>
                    <p className="text-gray-600 mb-6">
                        You don't have permission to access this page. Please
                        log in to continue.
                    </p>
                    <button
                        onClick={() => router.push("/login")}
                        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                    >
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    const handleLogout = () => {
        localStorage.removeItem("User");
        sessionStorage.removeItem("User");
        router.push("/login");
    };
    if (!username) {
        return null;
    }

    return (
        <div className="h-screen overflow-hidden">
            <div className="relative w-full h-full">
                <TopBarWithUser username={username} onLogout={handleLogout} />
                <div className="absolute inset-0 z-0">
                    <MapWithSearchBar />
                </div>
            </div>
        </div>
    );
}
