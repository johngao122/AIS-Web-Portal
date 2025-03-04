"use client";

import { useEffect } from "react";
import { setupTokenRefresh } from "@/utils/auth";
import "./globals.css";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    useEffect(() => {
        // Check if user is logged in
        const user = sessionStorage.getItem("User");
        if (user) {
            setupTokenRefresh();
        }
    }, []);

    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
