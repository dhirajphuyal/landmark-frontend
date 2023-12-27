"use client";

import React, { useRef } from "react";
import CourserAccordion from "./CourserAccordion";

const CoursesPage = () => {
  const playerRef = useRef(null);
  return (
    <div className="flex flex-col gap-10">
      <span className="text-3xl font-black text-center">Events</span>
      <CourserAccordion />
    </div>
  );
};

export default CoursesPage;
