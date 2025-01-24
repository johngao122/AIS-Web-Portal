import React from "react";
import Image from "next/image";
import Link from "next/link";
import { logoLight, NUSLogoLight } from "@/resources/logos";

interface TopBarProps {
    classname?: string;
}

/**
 * TopBarWithLogo is a React functional component that renders a top bar
 * containing the AIS and NUS logos. It spans the full width and features
 * a gradient background. The component accepts an optional classname prop
 * to apply additional styles. The AIS logo is clickable and links to the
 * homepage.
 *
 * @param {string} classname - Optional additional CSS classnames for styling.
 */

const TopBarWithLogo: React.FC<TopBarProps> = ({ classname }) => {
    return (
        <div className="w-full">
            <div
                className={`w-full bg-gradient-to-r from-[#4338CA] via-[#3B82F6] to-[#10B981] flex items-center p-3 ${
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
            </div>
        </div>
    );
};

export default TopBarWithLogo;
