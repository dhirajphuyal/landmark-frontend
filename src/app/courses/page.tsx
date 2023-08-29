"use client";

import React, { useRef } from "react";
import ReactHlsPlayer from "react-hls-player";
import ReactPlayer from "react-player";
import CourserAccordion from "./CourserAccordion";

const CoursesPage = () => {
  const playerRef = useRef(null);
  return (
    // <div className="player-wrapper">
    //   <ReactPlayer
    //     url="https://youtu.be/YUuSdrCojPE?si=7t5c7TGotobX_eCw"
    //     controls={true} // Show video controls (play, pause, etc.)
    //     config={{
    //       youtube: {
    //         playerVars: {
    //           modestbranding: 1, // Hide YouTube logo
    //           rel: 0, // Don't show related videos at the end
    //         },
    //       },
    //     }}
    //   />
    //   <ReactHlsPlayer
    //     src={
    //       "https://originvideo.mero.school/stock%20marketing%20course/1.%20Introduction%20to%20Stock%20Market%7C1.%20Why%20Should%20We%20Invest-uEiH5/master.m3u8"
    //     }
    //     autoPlay={false}
    //     controls={true}
    //     width="100%"
    //     height="auto"
    //     playerRef={playerRef}
    //   />

    // </div>
    <div className="flex flex-col gap-10">
      <span className="text-3xl font-black text-center">Courses</span>
      <CourserAccordion />
    </div>
  );
};

export default CoursesPage;
