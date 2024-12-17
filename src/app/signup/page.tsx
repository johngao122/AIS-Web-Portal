import React from "react";
import TopBarWithLogo from "@/components/TopBarWithLogo";
import Image from "next/image";
import {
    contactMap,
    I4,
    email,
    institution,
    location,
} from "@/resources/contact_page";
import "@/app/globals.css";

const Contact = () => {
    return (
        <div className="min-h-screen bg-white">
            <TopBarWithLogo />

            <div className="h-[calc(100vh-64px)] grid grid-cols-2">
                {/* Left Side */}
                <div className="relative h-full">
                    {/* Map with Gradient Overlay */}
                    <div className="absolute inset-0">
                        <div className="absolute bottom-0 left-0 right-0 h-2/5 overflow-hidden">
                            {/* I HATE CSS */}
                            <div
                                className="absolute inset-0 z-10"
                                style={{
                                    background:
                                        "linear-gradient(to bottom, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 100%)",
                                }}
                            />
                            <Image
                                src={contactMap}
                                alt="Location Map"
                                className="w-full h-full"
                                style={{ objectFit: "cover" }}
                            />
                        </div>
                    </div>

                    {/* Contact Information Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                        <div className="space-y-8 px-16">
                            <h1 className="text-6xl pb-12 font-bold text-[#4F46E5]">
                                Please contact us
                            </h1>

                            {/* Department Info */}
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 mt-1">
                                    <Image
                                        src={institution}
                                        alt="Institution Icon"
                                        className="w-10 h-10"
                                        width={24}
                                        height={24}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <p className="font-medium">
                                        Centre of Excellence in Modelling and
                                        Simulation for Next Generation Ports
                                        (C4NGP)
                                    </p>
                                    <p>College of Design and Engineering</p>
                                    <p>National University of Singapore</p>
                                </div>
                            </div>

                            {/* Address */}
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 mt-1">
                                    <Image
                                        src={location}
                                        alt="Location Icon"
                                        className="w-10 h-10"
                                        width={24}
                                        height={24}
                                    />
                                </div>
                                <div>
                                    <p>
                                        Innovation 4.0 Building, #03-01 3
                                        Research Link,
                                    </p>
                                    <p>Singapore 117602</p>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-center gap-4">
                                <div className="flex-shrink-0">
                                    <Image
                                        src={email}
                                        alt="Email Icon"
                                        className="w-10 h-10"
                                        width={24}
                                        height={24}
                                    />
                                </div>
                                <div className="centre">
                                    <p>c4ngp@nus.edu.sg</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side */}
                <div className="h-full">
                    <Image
                        src={I4}
                        alt="Innovation 4.0 Building"
                        className="w-full h-full"
                        style={{ objectFit: "cover" }}
                        priority
                    />
                </div>
            </div>
        </div>
    );
};

export default Contact;
