"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";

import { AccessTime, MenuBook, PlayArrow } from "@mui/icons-material";
import Image from "next/image";
import { instance } from "../../../../../config/axios";
import LoadingSkeleton from "../loadingSkeleton";
import ReactHlsPlayer from "react-hls-player";

interface GetCourseDetails {
  isLoading: boolean;
  data: any;
  error: any;
}

interface IndividualCourse {
  // course_id:string,
  // id:string,
  lessonsCount: number;
  lessons: any[];
  title: string;
  duration: string;
}

const LecturePage = () => {
  const params = useParams();
  const [getCourse, setGetCourse] = useState<GetCourseDetails>({
    isLoading: false,
    data: null,
    error: null,
  });

  const [individualCourse, setIndividualCourse] = useState<IndividualCourse>({
    lessonsCount: 0,
    lessons: [],
    title: "",
    duration: "",
  });

  const [activeLesson, setActiveLesson] = useState<string | string[]>(
    params?.lectureId
  );

  const [videoLink, setVideoLink] = useState<string | null>(null);

  const playerRef = useRef(null);

  // api to fetch all courses
  const getCourseDetails = async () => {
    setGetCourse({
      ...getCourse,
      isLoading: true,
    });
    try {
      const res = await instance.post("MeroSchool", {
        courseId: 94,
      });
      if (res) {
        setGetCourse({
          ...getCourse,
          data: res?.data,
          isLoading: false,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        setGetCourse({
          ...getCourse,
          error: error.message
            ? error.message
            : "An error occurred while loading courses",
          isLoading: false,
        });
      } else {
        setGetCourse({
          ...getCourse,
          error: "An error occurred while loading courses",
          isLoading: false,
        });
      }
      console.log(error);
    }
  };

  const handleLessonClick = (id: string, videoLink: string) => {
    setActiveLesson(id);
    setVideoLink(videoLink);
  };

  useEffect(() => {
    getCourseDetails();
  }, []);

  useEffect(() => {
    if (getCourse.data) {
      const individualCourse = getCourse?.data?.sections?.find(
        (course: any) => course.id === params.courseId
      );
      const activeVideoLink = individualCourse?.lessons?.find(
        (lesson: any) => lesson.id == params.lectureId
      );
      setVideoLink(activeVideoLink?.video_url);
      setIndividualCourse({
        lessonsCount: individualCourse?.lesson_counter_ends,
        lessons: individualCourse?.lessons,
        title: individualCourse?.title,
        duration: individualCourse?.total_duration,
      });
    }
  }, [getCourse.data]);

  return (
    <>
      {getCourse.isLoading && <LoadingSkeleton />}
      {getCourse.error && (
        <div className="flex flex-col gap-5 justify-center items-center">
          <Image
            src={"/images/error.jpg"}
            height={500}
            width={500}
            alt="error"
          />
          <span className="text-5xl font-bold">Ooops,</span>
          <span>{getCourse.error}</span>
        </div>
      )}
      {getCourse.data && (
        <div className="flex flex-col gap-10">
          <div className="flex">
            <div className="w-[40%]">
              <Image
                width={200}
                height={200}
                style={{ height: 200, width: "100%", objectFit: "contain" }}
                alt="lesson"
                src={"/images/courses/fundamentalAnalysis.png"}
              />
            </div>
            <div className="flex flex-col w-[60%] gap-7">
              <span className="text-2xl font-bold">
                {individualCourse.title}
              </span>
              <div className="flex justify-between w-[100%]">
                <div className="flex items-center gap-2">
                  <AccessTime style={{ color: "gray" }} />
                  <span className="font-thin text-sm">
                    {individualCourse?.duration}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MenuBook style={{ color: "gray" }} />
                  <span className="font-thin text-sm">
                    {individualCourse?.lessonsCount} Lessons
                  </span>
                </div>
              </div>
              <span className="text-sm ">
                Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis....
              </span>
            </div>
          </div>
          <div className="">
            {videoLink && (
              <ReactHlsPlayer
                src={videoLink}
                autoPlay={false}
                controls={true}
                width="100%"
                height="auto"
                style={{ borderRadius: "20px" }}
                playerRef={playerRef}
              />
            )}
          </div>
          <div className="flex flex-col">
            {individualCourse?.lessons?.map((lesson, index) => (
              <div
                className={`${
                  lesson.id == activeLesson && "bg-gray-200"
                }  px-5 py-2 flex gap-5 items-center hover:cursor-pointer hover:bg-gray-200`}
                key={index}
                onClick={() => handleLessonClick(lesson.id, lesson.video_url)}
              >
                <div className="bg-[#FFCC32]/20 p-2 rounded-full">
                  <PlayArrow style={{ color: "gray" }} />
                </div>
                <div className="flex flex-col w-[100%]">
                  <div className="flex justify-between">
                    <span>{lesson.title}</span>
                    <div className="flex items-center gap-2">
                      <AccessTime style={{ color: "gray" }} />
                      <span className="font-thin text-sm">
                        {lesson?.duration}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default LecturePage;
