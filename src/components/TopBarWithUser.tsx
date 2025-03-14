import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { logoLight, NUSLogoLight } from "@/resources/logos";
import { User, LogOut } from "lucide-react";

/**
 * Props for the TopBarWithUser component
 * @interface TopBarProps
 */
interface TopBarProps {
    /** The username to display in the user button */
    username: string;
    /** Optional additional CSS class names */
    classname?: string;
    /** Callback function triggered when the user clicks the logout button */
    onLogout?: () => void;
}

/**
 * TopBarWithUser Component
 *
 * A navigation bar that displays the AIS and NUS logos along with user information.
 * Features a dropdown menu for logout functionality that appears on hover.
 *
 * @component
 * @param {TopBarProps} props - Component props
 * @param {string} props.username - The user's name to display in the user button
 * @param {string} [props.classname] - Optional CSS class names to apply to the container
 * @param {() => void} [props.onLogout] - Callback function triggered when logout is clicked
 * @returns {React.ReactElement} The rendered TopBarWithUser component
 */
const TopBarWithUser: React.FC<TopBarProps> = ({
    username,
    classname,
    onLogout,
}) => {
    // State to control the visibility of the logout dropdown
    const [showLogout, setShowLogout] = useState<boolean>(false);

    // Ref to store timeout ID for delayed hiding of the logout dropdown
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    /**
     * Shows the logout dropdown when mouse enters the user button area
     * Clears any existing timeout to prevent the dropdown from hiding
     */
    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setShowLogout(true);
    };

    /**
     * Sets a timeout to hide the logout dropdown when mouse leaves the area
     * Uses a delay to improve user experience when moving between elements
     */
    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setShowLogout(false);
        }, 500);
    };

    return (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-10 px-4 w-full max-w-[90%] md:max-w-[80%]">
            {/* z-10 is required for proper layering with other UI elements */}
            <div className="w-full flex justify-center bg-gradient-to-r from-[#4338CA] via-[#3B82F6] to-[#10B981] rounded-lg shadow-lg">
                <div
                    className={`w-full flex items-center justify-between p-3 ${
                        classname ?? ""
                    }`}
                >
                    <div className="flex items-center gap-3">
                        {/* AIS Logo with homepage link */}
                        <Link href="/" className="flex items-center">
                            <div className="flex items-center transition-opacity duration-300 hover:opacity-50">
                                <Image
                                    src={logoLight}
                                    alt="AIS Logo"
                                    width={150}
                                    height={40}
                                    className="object-contain"
                                />
                            </div>
                        </Link>

                        {/* NUS Logo (non-clickable) */}
                        <div className="flex items-center">
                            <Image
                                src={NUSLogoLight}
                                alt="NUS Logo"
                                width={400}
                                height={40}
                                className="object-contain"
                            />
                        </div>
                    </div>

                    {/* User section with dropdown logout menu */}
                    <div
                        className="relative"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        {/* Invisible element to improve hover detection between button and dropdown */}
                        {showLogout && (
                            <div className="absolute w-full h-4 bottom-0 translate-y-full" />
                        )}

                        <button className="flex items-center gap-2 text-white py-2 px-4 w-32 justify-center rounded-full bg-teal-600 hover:bg-teal-700 transition-colors duration-300">
                            <User size={20} />
                            <span>{username}</span>
                        </button>

                        {/* Logout dropdown menu with animation */}
                        <div
                            className={`absolute right-0 mt-2 py-1 w-32 bg-teal-600 rounded-lg shadow-lg transform transition-all duration-200 ${
                                showLogout
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 -translate-y-1 pointer-events-none"
                            }`}
                        >
                            <button
                                onClick={onLogout}
                                className="w-full flex items-center gap-2 text-white px-4 py-2 hover:bg-teal-700 transition-colors duration-300"
                            >
                                <LogOut size={16} />
                                <span>log out</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopBarWithUser;
