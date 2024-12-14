"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TopBarWithUser from "@/components/TopBarWithUser";
import Map from "@/components/Map";
import SearchBar from "@/components/Searchbar";
import "@/app/globals.css";
import MapWithSearchBar from "@/components/MapWithSearchbar";

export default function DashboardPage() {
    const router = useRouter();
    const [username, setUsername] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        const sessionUser = sessionStorage.getItem('User');
        const localUser = localStorage.getItem('User');
        const userData = sessionUser || localUser;
        if (!userData) {
            router.push('/login');
            return;
        }

        try {
            const { username } = JSON.parse(userData);
            setUsername(username);
        } catch (error) {
            router.push('/login');
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('User');
        sessionStorage.removeItem('User');
        router.push('/login');
    };

    const handleSearch = (searchTerm: string) => {
        setSearchQuery(searchTerm);
        console.log('Searching for:', searchTerm);
    };

    if (!username) {
        return null;
    }

    return (
    <div className="h-screen">
        <div className="relative w-full h-full">
            <TopBarWithUser username={username} onLogout={handleLogout} />
            <div className="absolute inset-0 z-0">
                <MapWithSearchBar />
            </div>
        </div>
    </div>
);
}