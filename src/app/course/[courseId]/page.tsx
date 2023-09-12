"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";

import { AccessTime, MenuBook } from "@mui/icons-material";
import {
  courses,
  dummyLessons,
  module1Details,
  module2Details,
  module3Details,
  module4Details,
} from "../../../../raw-data/dummyCourses";
import { instance } from "../../../../config/axios";
import LoadingSkeleton from "./loadingSkeleton";

interface GetCourseDetails {
  isLoading: boolean;
  data: any;
  error: any;
}

interface Lessons {
  id: string;
  title: string;
  lesson_title: string;
  duration: string;
  course_id: string;
  section_id: string;
  video_type: string;
  is_lesson_free: string;
  video_url: string;
  attachment_type: string;
  attachment_url: string;
  attachment: string;
  is_completed: number;
  user_validity: boolean;
  is_preview: null | any; // Adjust the type of is_preview as needed
  lesson_type: string;
  summary: string;
  // Add 'image' and 'description' properties if you want to include them
  image?: string;
  description?: string;
}

interface IndividualCourse {
  // course_id:string,
  // id:string,
  lessonsCount: number;
  lessons: Lessons[];
  title: string;
  duration: string;
  description: string | undefined;
  image: string | undefined;
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
    description: "",
    image: "",
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
      const dummyCourses = courses.find(
        (course: any) => course.id == params.courseId
      );
      const moduleDetails =
        params.courseId == "1764"
          ? module1Details
          : params.courseId == "1808"
          ? module3Details
          : params.courseId == "1825"
          ? module4Details
          : module2Details;
      const updatedLessons: Lessons[] = individualCourse.lessons?.map(
        (lesson: any) => {
          const updatedLesson = moduleDetails.find(
            (details: any) => details.id == lesson.id
          );
          if (updatedLesson) {
            return {
              ...lesson,
              image: updatedLesson.image,
              description: updatedLesson.description,
            };
          }
          return lesson;
        }
      );

      setIndividualCourse({
        lessonsCount: individualCourse?.lesson_counter_ends,
        lessons: updatedLessons,
        title: individualCourse?.title,
        duration: individualCourse?.total_duration,
        description: dummyCourses?.description,
        image: dummyCourses?.image,
      });
    }
  }, [getCourse.data]);

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
                src={individualCourse.image ? individualCourse.image : ""}
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
              <span className="text-sm ">{individualCourse?.description}</span>
            </div>
          </div>
          <div className="flex flex-wrap mt-5">
            {individualCourse?.lessons?.map((lesson, index) => (
              <div
                key={index}
                className="w-1/3 flex flex-col items-center rounded-lg p-2 cursor-pointer shadow-md hover:shadow-2xl box-border mb-[20px] mr-[20px]"
                style={{
                  width: "calc(33.33% - 20px)",
                }}
                onClick={() =>
                  router.push(`/course/${params.courseId}/lecture/${lesson.id}`)
                }
              >
                <Image
                  src={lesson.image ? lesson.image : ""}
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
