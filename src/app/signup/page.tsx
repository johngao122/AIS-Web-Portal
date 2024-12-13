import React from 'react';
import TopBarWithLogo from '@/components/TopBarWithLogo';
import Image from 'next/image';
import { contactMap, I4 } from '@/resources/contact_page';
import "@/app/globals.css";

const Contact = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <TopBarWithLogo />
      
      {/* Main Content */}
      <div className="container mx-auto px-16 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column - Contact Information & Map */}
          <div>
            {/* Contact Info Section */}
            <div className="space-y-10 mb-16">
              <h1 className="text-6xl font-bold text-[#4F46E5]">
                Please contact us
              </h1>
              
              {/* Department Info */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <svg className="w-6 h-6 text-[#4F46E5]" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3zm0 3.3L18 12v6h-2v-6h-6v6H6v-6l6-5.7z"/>
                  </svg>
                </div>
                <div className="space-y-1">
                  <p className="font-medium">
                    Centre of Excellence in Modelling and Simulation for Next Generation Ports (C4NGP)
                  </p>
                  <p>College of Design and Engineering</p>
                  <p>National University of Singapore</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <svg className="w-6 h-6 text-[#4F46E5]" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <div>
                  <p>Innovation 4.0 Building, #03-01 3 Research Link,</p>
                  <p>Singapore 117602</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <svg className="w-6 h-6 text-[#4F46E5]" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <div>
                  <p>c4ngp@nus.edu.sg</p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div>
              <Image
                src={contactMap}
                alt="Location Map"
                className="w-full"
                width={600}
                height={300}
                style={{ 
                  aspectRatio: '16/9',
                  objectFit: 'cover'
                }}
              />
            </div>
          </div>

          {/* Right Column - Building Image */}
          <div>
            <Image
              src={I4}
              alt="Innovation 4.0 Building"
              className="w-full h-full"
              width={600}
              height={800}
              priority
              style={{ 
                objectFit: 'cover'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;