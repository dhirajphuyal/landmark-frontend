"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { AccessTime, KeyboardArrowRight, MenuBook } from "@mui/icons-material";

const courses = [
  {
    title: "Fundamental Analysis",
    duration: "7h 0m",
    count: "40",
    image: "/images/courses/fundamentalAnalysis.png",
    description:
      "Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis....",
  },
  {
    title: "Introduction to Stock Market",
    duration: "7h 0m",
    count: "40",
    image: "/images/courses/introductionToStockMarket.png",
    description:
      "Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis....",
  },
  {
    title: "Risk Management & Trading",
    duration: "7h 0m",
    count: "40",
    image: "/images/courses/riskManagmentandTrading.png",
    description:
      "Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis....",
  },
];

const CoursesSlider = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-5">
      <div className="flex relative  items-center justify-center">
        <span className="text-3xl font-black">Our Courses</span>
        <button
          onClick={() => router.push("/courses")}
          className="absolute right-0 rounded-[26px] py-[5px] px-[20px] bg-[#fff] bg-opacity-50 border border-naasa-green md:rounded-[26px]  md:py-[5px] md:px-[20px]"
        >
          Explore all
          <KeyboardArrowRight />
        </button>
      </div>
      <div className="flex justify-between gap-8">
        {courses.map((course, index) => (
          <div
            key={index}
            className="flex flex-col gap-5 cursor-pointer p-5 items-center justify-between rounded-[40px] shadow-md"
          >
            <div className="h-[30%]">
              <Image
                src={course.image}
                height={index == 1 ? "250" : "150"}
                width={index == 1 ? "250" : "150"}
                alt={course.title}
              />
            </div>
            <span className="text-lg mt-5 font-bold">{course.title}</span>
            <div className="flex justify-between w-[100%]">
              <div className="flex items-center gap-2">
                <AccessTime />
                <span className="font-light text-sm">{course.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <MenuBook />
                <span className="font-light text-sm">
                  {course.count} Lessons
                </span>
              </div>
            </div>
            <span className="text-sm">{course.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesSlider;
