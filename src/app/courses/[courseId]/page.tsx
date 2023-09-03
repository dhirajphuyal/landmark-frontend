"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";

import { AccessTime, MenuBook } from "@mui/icons-material";
import { dummyLessons } from "../../../../raw-data/dummyCourses";
import { instance } from "../../../../config/axios";
import LoadingSkeleton from "./loadingSkeleton";

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

const IndividualCoursePage = () => {
  const params = useParams();
  const router = useRouter();
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

  useEffect(() => {
    getCourseDetails();
  }, []);

  useEffect(() => {
    if (getCourse.data) {
      const individualCourse = getCourse?.data?.sections?.find(
        (course: any) => course.id === params.courseId
      );
      setIndividualCourse({
        lessonsCount: individualCourse?.lesson_counter_ends,
        lessons: individualCourse?.lessons,
        title: individualCourse?.title,
        duration: individualCourse?.total_duration,
      });
    }
  }, [getCourse.data]);

  console.log(getCourse);

  return (
    <div className="flex flex-col gap-10">
      <span className="text-3xl font-black text-center">Courses</span>
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
        <>
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
          <div className="flex flex-wrap">
            {individualCourse?.lessons?.map((lesson, index) => (
              <div
                key={index}
                className="w-1/3 flex flex-col items-center p-2 cursor-pointer hover:shadow-lg"
                onClick={() =>
                  router.push(`/courses/${params.courseId}/${lesson.id}`)
                }
              >
                <Image
                  src={"/images/lessons/lesson1.png"}
                  width={300}
                  height={200}
                  style={{ height: 200, width: "100%" }}
                  alt="lesson"
                />
                <div className="flex flex-col justify-between w-[100%] gap-2 p-2 ">
                  <div className="flex items-center justify-between w-[100%]">
                    <span className="text-base font-bold">{lesson.title}</span>
                    <div className="flex gap-2 items-center">
                      <AccessTime style={{ color: "gray" }} />
                      <span className="font-thin text-xs">
                        {lesson.duration}
                      </span>
                    </div>
                  </div>
                  <span className="text-sm">{lesson.description}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default IndividualCoursePage;