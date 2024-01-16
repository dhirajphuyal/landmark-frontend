import React from "react";

const SettingUsApart = () => {
  return (
    <div className="flex flex-col gap-3 md:gap-5">
      <span className="text-2xl md:text-3xl font-black text-center">
        What sets us apart?
      </span>
      <div className="flex flex-col md:flex-row flex-wrap md:flex-no-wrap gap-4 md:gap-5 mt-4 w-full justify-between">
        <div className="flex flex-col gap-3 md:gap-5 items-center bg-[#D0F0E6] border border-landmark-dark bg-opacity-40 md:w-[32%] rounded-[37px] p-5 md:p-10">
          <span className="text-xl md:text-2xl font-semibold text-center">
            Practical <br /> Session
          </span>
          <span className="text-sm md:text-base text-center">
            We have enriching practical sessions at the end of sessions that
            provide an in-depth knowledge of the course materials by comparing
            them with real-life implications.
          </span>
        </div>
        <div className="flex flex-col gap-3 md:gap-5 items-center bg-[#D0F0E6] border border-landmark-dark bg-opacity-40 md:w-[32%] rounded-[37px] p-5 md:p-10">
          <span className="text-xl md:text-2xl font-semibold text-center">
            Prepared by <br /> the Best 
          </span>
          <span className="text-sm md:text-base text-center">
            Expertly designed course materials by top-notch professionals, based
            on successful industry practices, provide reliable and practical
            knowledge to excel in your investment endeavors.
          </span>
        </div>
        <div className="flex flex-col gap-3 md:gap-5 items-center bg-[#D0F0E6] border border-landmark-dark bg-opacity-40 md:w-[32%] rounded-[37px] p-5 md:p-10">
          <span className="text-xl md:text-2xl font-semibold text-center">
            Personalized <br /> Journey
          </span>
          <span className="text-sm md:text-base text-center">
            {`Learn at your pace with Naasa Securities, gaining confidence in
            Stock Trading. We offer unwavering support and services to help you
            invest, grow, and succeed when you're ready.`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SettingUsApart;
