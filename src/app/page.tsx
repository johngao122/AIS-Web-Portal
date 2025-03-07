"use client";

import React from "react";
import { useRouter } from "next/navigation";
import TopBarWithoutLogo from "../components/TopBarWithoutLogo";
import Image from "next/image";
import LandingSlideshow from "@/components/Slideshow";
import { StaticImageData } from "next/image";
import {
    landingPageInfo,
    landingPagePicture,
    landingPageInfo2,
    landingPagePicture2,
    landingPageInfo3,
    landingPagePicture3,
    landingPageInfo4,
    landingPagePicture4,
} from "@/resources/landing_page";
import { NUSLogo } from "@/resources/logos";
import "./globals.css";

/**
 * The landing page of the application, containing a slideshow
 * and a brief overview of the application.
 *
 * @returns The landing page component.
 */
export default function Home() {
    const router = useRouter();

    const pictures: StaticImageData[] = [
        landingPagePicture,
        landingPagePicture2,
        landingPagePicture3,
        landingPagePicture4,
    ];

    const infoImages: StaticImageData[] = [
        landingPageInfo,
        landingPageInfo2,
        landingPageInfo3,
        landingPageInfo4,
    ];

    const handleLogin = (): void => {
        router.push("/log-in");
    };

    const handleSignup = (): void => {
        router.push("/signup");
    };

    return (
        <main className="min-h-screen bg-white">
            <TopBarWithoutLogo />

            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-col md:flex-row items-start gap-16">
                    {/* Left column - Slideshow */}
                    <div className="w-full md:w-1/2">
                        <LandingSlideshow
                            pictures={pictures}
                            infoImages={infoImages}
                            interval={5000}
                        />
                    </div>

                    {/* Right column */}
                    <div className="w-full md:w-1/2 md:pl-8">
                        <h1 className="text-[40px] font-bold text-black mb-2">
                            Welcome to
                        </h1>
                        <h2 className="text-[40px] font-semibold text-[#4F46E5] mb-12">
                            Our AIS Data Analysis Platform
                        </h2>

                        <div className="bg-gray-50 rounded-lg p-8 mb-12">
                            <h3 className="text-xl text-gray-800 mb-6">
                                Dive deeper with insights into key port service
                                KPIs:
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-3">
                                    <svg
                                        className="w-5 h-5 text-[#10B981]"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                    <span className="text-gray-600">
                                        Vessel arrivals and berthings
                                    </span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <svg
                                        className="w-5 h-5 text-[#10B981]"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                    <span className="text-gray-600">
                                        Just-In-Time (JIT) performance
                                    </span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <svg
                                        className="w-5 h-5 text-[#10B981]"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                    <span className="text-gray-600">
                                        Wharf utilization rates
                                    </span>
                                </li>
                            </ul>
                        </div>

                        <p className="text-gray-600 text-lg mb-8">
                            Please log in to explore the data and analysis.
                        </p>

                        <div className="grid grid-cols-2 gap-4 mb-20">
                            <button
                                onClick={handleLogin}
                                className="w-full py-4 bg-[#4F46E5] text-white rounded-lg hover:bg-[#4338CA] transition-colors text-lg font-medium"
                            >
                                Log in
                            </button>
                            <button
                                onClick={handleSignup}
                                className="w-full py-4 bg-[#4F46E5] text-white rounded-lg hover:bg-[#4338CA] transition-colors text-lg font-medium"
                            >
                                Sign up
                            </button>
                        </div>

                        <div className="w-full flex justify-end">
                            <Image
                                src={NUSLogo}
                                alt="NUS Logo"
                                width={700}
                                height={140}
                                className="w-full max-w-[700px]"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
