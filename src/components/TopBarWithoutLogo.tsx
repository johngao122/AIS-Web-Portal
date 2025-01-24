import React from "react";
import Image from "next/image";
import logoLight from "@/resources/logos/logo_light.png";

interface TopBarProps {
    classname?: string;
}

/**
 * A top bar component that displays the AIS logo without any other content.
 * Intended for use on pages that are not part of the main app.
 *
 * @param {TopBarProps} props
 * @prop {string} [classname] Additional CSS classes to apply to the top bar
 * @returns The top bar component
 */
const TopBarWithoutLogo: React.FC<TopBarProps> = ({ classname }) => {
    return (
        <div className="w-full">
            <div
                className={`w-full bg-gradient-to-r from-indigo-600 to-teal-500 p-3 flex items-center rounded-b-lg ${
                    classname ?? ""
                }`}
            >
                <div className="flex items-center">
                    <div className="transition-opacity duration-300 hover:opacity-50">
                        <Image
                            src={logoLight}
                            alt="AIS Logo"
                            width={150}
                            height={50}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopBarWithoutLogo;
