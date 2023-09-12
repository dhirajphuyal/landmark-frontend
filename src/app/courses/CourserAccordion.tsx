import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { courses, dummyLessons } from "../../../raw-data/dummyCourses";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { AccessTime, Add, MenuBook, Remove } from "@mui/icons-material";
import Image from "next/image";

const CourserAccordion = () => {
  const router = useRouter();

  const [activeAccordion, setActiveAccordion] = useState(
    Array(courses.length).fill(false)
  );

  const toggleAccordion = (index: number) => {
    const newActiveAccordion = [...activeAccordion];
    newActiveAccordion[index] = !newActiveAccordion[index];
    setActiveAccordion(newActiveAccordion);
  };

  return (
    <div>
      {courses?.map((course, index) => (
        <Accordion key={index} expanded={activeAccordion[index]}>
          <AccordionSummary
            expandIcon={
              <div
                className="expand-icon hover:bg-gray-200 "
                onClick={() => toggleAccordion(index)}
              >
                {activeAccordion[index] ? <Remove color="primary" /> : <Add />}
              </div>
            }
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <div
              className="flex items-center gap-10 w-[100%] p-5"
              onClick={() => router.push(`course/${course.id}`)}
            >
              <div className="flex w-[30%]">
                <Image
                  src={course.image}
                  height={200}
                  width={200}
                  alt={course.title}
                />
              </div>
              <div className="flex flex-col gap-5 w-[70%]">
                <span
                  className={`font-bold text-2xl ${
                    activeAccordion[index] && "text-naasa-green"
                  }`}
                >
                  {course.title}
                </span>
                <div className="flex justify-between w-[100%]">
                  <div className="flex items-center gap-2">
                    <AccessTime style={{ color: "gray" }} />
                    <span className="font-thin text-sm">{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MenuBook style={{ color: "gray" }} />
                    <span className="font-thin text-sm">
                      {course.count} Lessons
                    </span>
                  </div>
                </div>
                <span className="text-sm ">{course.description}</span>
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className="flex justify-center items-center gap-10">
              {dummyLessons.map((lesson, index) => (
                <div key={index} className="w-1/3 flex flex-col items-center">
                  <Image
                    src={lesson.image}
                    width={300}
                    height={200}
                    style={{ height: 200, width: "100%" }}
                    alt="lesson"
                  />
                  <div className="flex flex-col justify-between w-[100%] gap-2 p-2 ">
                    <div className="flex items-center justify-between w-[100%]">
                      <span className="text-lg font-bold">{lesson.title}</span>
                      <div className="flex gap-2 items-center">
                        <AccessTime style={{ color: "gray" }} />
                        <span className="font-thin text-sx">
                          {course.duration}
                        </span>
                      </div>
                    </div>
                    <span className="text-sm">{lesson.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default CourserAccordion;
