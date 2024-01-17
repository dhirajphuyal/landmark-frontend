"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";

import { AccessTime, MenuBook } from "@mui/icons-material";
import {
  events,
} from "../../../../raw-data/dummyEvents";
import { instance } from "../../../../config/axios";
import LoadingSkeleton from "./loadingSkeleton";

interface GetEventDetails {
  isLoading: boolean;
  data: any;
  error: any;
}

interface Events {
  id: string;
  title: string;
  image?: string;
  description?: string;
}

interface IndividualEvent {
  event_id:string,
  id:string,
  title:string,
  description: string | undefined;
  image: string | undefined;
}

const IndividualEventPage = () => {
  const params = useParams();
  const router = useRouter();
  const [getCourse, setGetEvent] = useState<GetEventDetails>({
    isLoading: false,
    data: null,
    error: null,
  });

  const [individualCourse, setIndividualCourse] = useState<IndividualEvent>({
    event_id: "",
    id: "",
    title: "",
    description: "",
    image: "",
  });

  const getEventDetails = async () => {
    setGetEvent({
      ...getCourse,
      isLoading: true,
    });
    try {
      const res = await instance.post("MeroSchool", {
        courseId: 94,
      });
      if (res) {
        setGetEvent({
          ...getCourse,
          data: res?.data,
          isLoading: false,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        setGetEvent({
          ...getCourse,
          error: error.message
            ? error.message
            : "An error occurred while loading events",
          isLoading: false,
        });
      } else {
        setGetEvent({
          ...getCourse,
          error: "An error occurred while loading events",
          isLoading: false,
        });
      }
      console.log(error);
    }
  };

  useEffect(() => {
    getEventDetails();
  }, []);

  useEffect(() => {
    if (getCourse.data) {
      const individualCourse = getCourse?.data?.sections?.find(
        (course: any) => course.id === params.courseId
      );
      const dummyCourses = events.find(
        (course: any) => course.id == params.courseId
      );
      const updatedLessons: Events[] = individualCourse.lessons?.map(
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

  console.log(individualCourse.lessons);

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
            {individualCourse?.events?.map((event, index) => (
              <div
                key={index}
                className="w-1/3 flex flex-col items-center rounded-lg p-2 cursor-pointer shadow-md hover:shadow-2xl box-border mb-[20px] mr-[20px]"
                style={{
                  width: "calc(33.33% - 20px)",
                }}
                onClick={() =>
                  router.push(`/course/${params.courseId}/lecture/${event.id}`)
                }
              >
                <Image
                  src={event.image ? event.image : ""}
                  width={300}
                  height={200}
                  style={{ height: 200, width: "100%" }}
                  alt="lesson"
                />
                <div className="flex flex-col justify-between w-[100%] gap-2 p-2 ">
                  <div className="flex items-center justify-between w-[100%]">
                    <span className="text-base font-bold">{event.title}</span>
                    <div className="flex gap-2 items-center">
                      <AccessTime style={{ color: "gray" }} />
                      <span className="font-thin text-xs">
                        {event.duration}
                      </span>
                    </div>
                  </div>
                  <span className="text-sm">{event.description}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default IndividualEventPage;
