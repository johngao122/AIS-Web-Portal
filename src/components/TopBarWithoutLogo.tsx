import React from 'react';
import Image from 'next/image';
import logoLight from "@/resources/logos/logo_light.png";

interface TopBarProps {
    classname?: string;
}

const TopBarWithoutLogo: React.FC<TopBarProps> = ({ classname }) => {
    return (
        <div className="w-full">
            <div className={`w-full bg-gradient-to-r from-indigo-600 to-teal-500 p-3 flex items-center rounded-b-lg ${classname ?? ''}`}>
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