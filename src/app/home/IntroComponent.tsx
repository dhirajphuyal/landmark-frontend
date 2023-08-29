"use client";

import React, { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
        <div className="flex h-[85vh]  circularAnimation ">
          <Image
            src="/images/bluredColor.jpg"
            alt="quotes"
            width={700}
            height={700}
          />
        </div>
        <div className="absolute bottom-20 left-20 w-full h-full flex flex-col gap-10 justify-center  ">
          <span className="text-6xl font-semibold">Learn & Grow</span>
          <span className="text-6xl font-semibold flex items-center gap-5">
            Financially
            <span className="text-8xl text-[#0075BC]">Free</span>
          </span>
          <span className="text-4xl flex items-center gap-5 font-semibold text-[gray]">
            with
            <span className="text-6xl text-[black]">Naasa Trading School</span>
          </span>
          <div className="flex gap-3">
            <button
              onClick={() => router.push("/courses")}
              className="rounded-[26px] py-[10px] px-[20px] bg-naasa-green text-[#fff]"
            >
              Start a Course
            </button>
            {!userInfo && (
              <button
                onClick={() => router.push("/login")}
                className="rounded-[26px] py-[10px] px-[20px] bg-naasa-yellow text-[black]"
              >
                Sign in
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="flex gap-5 pb-10 justify-center items-center w-[100%] bg-[#F7FCFB]">
        <Image src="/images/quotes.svg" alt="quotes" height={50} width={50} />
        <div className="flex h-[15vh] items-end">
          <span className="text-2xl text-center">
            Nepal’s First Open Learning Platform dedicated to Share <br />{" "}
            Trading Education
          </span>
        </div>
      </div>
    </div>
  );
};

export default IntroComponent;
