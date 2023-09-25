"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { AccessTime, KeyboardArrowRight, MenuBook } from "@mui/icons-material";

const courses = [
  {
    id: 1764,
    title: "Introduction to Stock Market",
    duration: "2h 34m",
    count: "14",
    image: "/images/courses/fundamentalAnalysis.png",
    description:
      "Consider this module as your foundational stepping stone to grasp....",
  },
  {
    id: 1763,
    title: "Fundamental Analysis",
    duration: "2h 53m",
    count: "13",
    image: "/images/courses/introductionToStockMarket.png",
    description:
      "We will start on a journey of thoughtful financial understanding with our comprehensive....",
  },
  {
    id: 1808,
    title: "Risk Management & Trading",
    duration: "1h 11m",
    count: "9",
    image: "/images/courses/riskManagmentandTrading.png",
    description:
      "We explore our comprehensive module dedicated to personal finance. Gain insights....",
  },
];

const CoursesSlider = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-3 md:gap-5">
      <div className="flex flex-col relative items-center justify-center">
        <span className="text-2xl md:text-3xl font-black text-center">
          Our Courses
        </span>
        <button
          onClick={() => router.push("/courses")}
          className="md:absolute  flex items-center text-xs md:text-lg mt-2 md:mt-0 right-0 top-[10px] md:top-0 rounded-[26px] py-[5px] px-[16px] bg-[#fff] bg-opacity-50 border border-naasa-green md:rounded-[26px] md:py-[5px] md:px-[20px]"
        >
          Explore all
          <KeyboardArrowRight />
        </button>
      </div>
      <div className="grid mt-[2rem] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        {courses.map((course, index) => (
          <div
            key={index}
            className="flex flex-col gap-3 p-3 md:p-5 items-center justify-between rounded-[40px] cursor-pointer shadow-lg hover:shadow-2xl "
            // style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
            onClick={() => router.push(`course/${course.id}`)}
          >
            <div className="h-[30%] w-[100%] md:w-[80%] flex items-center justify-center mt-5">
              <Image
                src={course.image}
                height={index === 1 ? "250" : "150"}
                width={index === 1 ? "250" : "150"}
                alt={course.title}
              />
            </div>
            <span className="text-lg md:text-xl mt-3 md:mt-5 font-bold text-center">
              {course.title}
            </span>
            <div className="flex flex-col md:flex-row md:justify-between w-full">
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
            <span className="text-sm text-center">{course.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesSlider;
