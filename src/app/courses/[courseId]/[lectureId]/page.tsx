import { AccessTime, MenuBook } from "@mui/icons-material";
import Image from "next/image";
import React from "react";

const LecturePage = () => {
  return (
    <div>
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
            Introduction to Stock Market
          </span>
          <div className="flex justify-between w-[100%]">
            <div className="flex items-center gap-2">
              <AccessTime style={{ color: "gray" }} />
              <span className="font-thin text-sm">7h 0m</span>
            </div>
            <div className="flex items-center gap-2">
              <MenuBook style={{ color: "gray" }} />
              <span className="font-thin text-sm">40 Lessons</span>
            </div>
          </div>
          <span className="text-sm ">
            Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vulputate libero et velit interdum, ac aliquet odio mattis....
          </span>
        </div>
      </div>
    </div>
  );
};

export default LecturePage;
