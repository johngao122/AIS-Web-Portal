import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { logoLight, NUSLogoLight } from "@/resources/logos";
import { User, LogOut } from "lucide-react";

interface TopBarProps {
    username: string;
    classname?: string;
    onLogout?: () => void;
}

/**
 * A top bar with the AIS logo, NUS logo, and the user's name.
 * The user's name is clickable and will show a logout button on hover.
 *
 * @param {string} username - The user's name.
 * @param {string} [classname] - A class name to apply to the root element.
 * @param {() => void} [onLogout] - A function to call when the user clicks the logout button.
 */
const TopBarWithUser: React.FC<TopBarProps> = ({
    username,
    classname,
    onLogout,
}) => {
    const [showLogout, setShowLogout] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setShowLogout(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setShowLogout(false);
        }, 500);
    };

    return (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-10 px-4 w-full max-w-[90%] md:max-w-[80%]">
            {/*Dont change the z-10 */}
            <div className="w-full flex justify-center bg-gradient-to-r from-[#4338CA] via-[#3B82F6] to-[#10B981] rounded-lg shadow-lg">
                <div
                    className={`w-full flex items-center justify-between p-3 ${
                        classname ?? ""
                    }`}
                >
                    <div className="flex items-center gap-3">
                        {/* AIS Logo on the left */}
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

                        {/* NUS Logo */}
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

                    {/* User section */}
                    <div
                        className="relative"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        {/* Invisible bridge to help with mouse movement */}
                        {showLogout && (
                            <div className="absolute w-full h-4 bottom-0 translate-y-full" />
                        )}

                        <button className="flex items-center gap-2 text-white py-2 px-4 w-32 justify-center rounded-full bg-teal-600 hover:bg-teal-700 transition-colors duration-300">
                            <User size={20} />
                            <span>{username}</span>
                        </button>

                        {/* Logout popup */}
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
