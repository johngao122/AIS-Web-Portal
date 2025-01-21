import React, { useState, useEffect } from "react";
import Image from "next/image";
import { StaticImageData } from "next/image";

interface LandingSlideshowProps {
    pictures: StaticImageData[];
    infoImages: StaticImageData[];
    interval?: number;
}

const LandingSlideshow: React.FC<LandingSlideshowProps> = ({
    pictures,
    infoImages,
    interval = 5000,
}) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentIndex(
                    (prevIndex) => (prevIndex + 1) % pictures.length
                );
                setIsTransitioning(false);
            }, 500); // Half of transition duration
        }, interval);

        return () => clearInterval(timer);
    }, [pictures.length, interval]);

    const handleDotClick = (index: number): void => {
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentIndex(index);
            setIsTransitioning(false);
        }, 500);
    };

    return (
        <div className="w-full space-y-12">
            {/* Main picture */}
            <div className="relative w-full overflow-hidden">
                <div
                    className={`transform transition-opacity duration-1000 ${
                        isTransitioning ? "opacity-0" : "opacity-100"
                    }`}
                >
                    <Image
                        src={pictures[currentIndex]}
                        alt={`Slide ${currentIndex + 1}`}
                        width={600}
                        height={400}
                        className="w-full h-auto"
                        priority={currentIndex === 0}
                    />
                </div>
            </div>

            {/* Navigation dots */}
            <div className="flex justify-center gap-2">
                {pictures.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handleDotClick(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            currentIndex === index
                                ? "bg-[#4F46E5] w-6"
                                : "bg-gray-300 hover:bg-gray-400"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Info image */}
            <div className="flex items-center gap-4">
                <div
                    className={`transform transition-opacity duration-1000 ${
                        isTransitioning ? "opacity-0" : "opacity-100"
                    }`}
                >
                    <Image
                        src={infoImages[currentIndex]}
                        alt={`Info ${currentIndex + 1}`}
                        width={450}
                        height={450}
                        className="object-contain"
                        priority={currentIndex === 0}
                    />
                </div>
            </div>
        </div>
    );
};

export default LandingSlideshow;
