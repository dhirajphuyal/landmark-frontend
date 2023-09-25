"use client";

import React, { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ReactTyped from "react-typed";

interface UserInfo {
  firstname: string;
  lastname: string;
  exp: number;
}

const IntroComponent = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const userToken =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (userToken) {
      try {
        const user = jwt.decode(userToken) as UserInfo;
        if (user) {
          user && setUserInfo(user);
        }
      } catch (error) {
        console.error("Error decoding JWT:", error);
      }
    }
  }, [userToken]);

  return (
    <div className="flex flex-col">
      <div className="overflow-hidden relative">
        <div className="flex h-[65vh] md:h-[80vh] circularAnimation">
          {/* Mobile view */}
          <Image
            src="/images/blurredColor.jpg"
            alt="quotes"
            width={1200} // Adjust the mobile width as needed
            height={1200} // Adjust the mobile height as needed
            className="md:hidden" // Hide the image on larger screens
          />

          {/* Desktop view */}
          <Image
            src="/images/blurredColor.jpg"
            alt="quotes"
            width={700}
            height={700}
            className="hidden md:block" // Hide the image on mobile screens
          />
        </div>
        <div className="absolute bottom-10 md:bottom-20 left-5 md:left-20 w-full h-full flex flex-col gap-5 md:gap-10 justify-center">
          <span className="text-4xl md:text-6xl font-semibold">
            Learn & Grow
          </span>
          <span className="text-2xl md:text-6xl font-semibold flex items-center md:gap-5">
            Financially
            <span className="ml-2 text-2xl md:text-8xl">
              <ReactTyped
                strings={[
                  "<span style='color: #0075BC;'>Free</span>",
                  "<span style='color: #F15632;'>Independent</span>",
                  "<span style='color: #FFCC32;'>Strong</span>",
                  "<span style='color: #20B78A;'>Empowered</span>",
                  "<span style='color: #F06D26;'>Enlightened</span>",
                ]}
                typeSpeed={100}
                loop
                backSpeed={20}
                cursorChar="|"
                showCursor={true}
              />
            </span>
          </span>
          <span className="text-2xl md:text-4xl flex items-center md:gap-5 font-semibold text-gray-600">
            with
            <span className="text-3xl ml-2 md:text-6xl text-black">
              Naasa Trading School
            </span>
          </span>
          <div className="flex mt-5 md:mt-0 gap-2 md:gap-3">
            <button
              onClick={() => router.push("/courses")}
              className="rounded-[26px] py-[8px] px-[16px] bg-naasa-green text-white text-sm md:text-base"
            >
              Start a Course
            </button>
            {!userInfo && (
              <button
                onClick={() => router.push("/login")}
                className="rounded-[26px] py-[8px] px-[16px] bg-naasa-yellow text-black text-sm md:text-base"
              >
                Sign in
              </button>
            )}
          </div>
        </div>
      </div>
      <div
        id="about-us-section"
        className="flex gap-2 md:gap-5 pb-5 md:pb-10 justify-center items-center w-full bg-gray-100 md:bg-[#F7FCFB]"
      >
        <Image src="/images/quotes.svg" alt="quotes" height={40} width={40} />
        <div className="flex h-[10vh] items-end">
          <span className="text-sm md:text-lg text-center">
            Nepal’s First Open Learning Platform dedicated to Share Trading
            Education
          </span>
        </div>
      </div>
    </div>
  );
};

export default IntroComponent;
