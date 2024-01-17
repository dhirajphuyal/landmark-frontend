"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
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
  id:string,
  title:string,
  description: string | undefined;
  image: string | undefined;
}

const IndividualEventPage = () => {
  const params = useParams();
  const router = useRouter();
  const [getEvent, setGetEvent] = useState<GetEventDetails>({
    isLoading: false,
    data: null,
    error: null,
  });

  const [individualEvent, setIndividualEvent] = useState<IndividualEvent>({
    id: "",
    title: "",
    description: "",
    image: "",
  });

  const getEventDetails = async () => {
    setGetEvent({
      ...getEvent,
      isLoading: true,
    });
    try {
      const res = await instance.post("MeroSchool", {
        courseId: 94,
      });
      if (res) {
        setGetEvent({
          ...getEvent,
          data: res?.data,
          isLoading: false,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        setGetEvent({
          ...getEvent,
          error: error.message
            ? error.message
            : "An error occurred while loading events",
          isLoading: false,
        });
      } else {
        setGetEvent({
          ...getEvent,
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
    if (getEvent.data) {
      const individualCourse = getEvent?.data?.sections?.find(
        (course: any) => course.id === params.courseId
      );
      const dummyEvents = events.find(
        (course: any) => course.id == params.courseId
      );

      setIndividualEvent({
        id: individualEvent?.id,
        title: individualEvent?.title,
        description: dummyEvents?.description,
        image: dummyEvents?.image,
      });
    }
  }, [getEvent.data]);

  return (
    <div className="flex flex-col gap-10">
      <span className="text-3xl font-black text-center">Events</span>
      {getEvent.isLoading && <LoadingSkeleton />}
      {getEvent.error && (
        <div className="flex flex-col gap-5 justify-center items-center">
          <Image
            src={"/images/error.jpg"}
            height={500}
            width={500}
            alt="error"
          />
          <span className="text-5xl font-bold">Ooops,</span>
          <span>{getEvent.error}</span>
        </div>
      )}
      {getEvent.data && (
        <>
          <div className="flex">
            <div className="w-[40%]">
              <Image
                width={200}
                height={200}
                style={{ height: 200, width: "100%", objectFit: "contain" }}
                alt="lesson"
                src={individualEvent.image ? individualEvent.image : ""}
              />
            </div>
            <div className="flex flex-col w-[60%] gap-7">
              <span className="text-2xl font-bold">
                {individualEvent.title}
              </span>
              <div className="flex justify-between w-[100%]">
              </div>
              <span className="text-sm ">{individualEvent?.description}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default IndividualEventPage;
