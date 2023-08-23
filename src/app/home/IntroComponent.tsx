import React from "react";
import Image from "next/image";

const IntroComponent = () => {
  return (
    <div className="flex flex-col">
      <div className="overflow-hidden relative">
        <div className="flex h-[55vh] relative circularAnimation ">
          {/* <div className="w-80 h-80 bg-[#FFCC32] bg-opacity-40 rounded-full absolute top-[50%] left-[50%] "></div>
          <div className="w-80 h-80 bg-[#F15632] bg-opacity-40 rounded-full absolute top-[50%] left-[40%] "></div>
          <div className="w-80 h-80 bg-[#0075BC] bg-opacity-40 rounded-full absolute bottom-[40%] left-[45%] "></div>
          <div className="w-80 h-80 bg-[#20B78A] bg-opacity-40 rounded-full absolute bottom-[40%] right-[50%] "></div>
          
          
          <div className="w-80 h-80 bg-[#47AEC6] bg-opacity-40 rounded-full absolute left-[30%]"></div> */}

          <Image
            src="/images/bluredColor.jpg"
            alt="quotes"
            width={700}
            height={700}
          />
        </div>
        <div className="absolute z-50">
          <span>Learn</span>
          <span>Financially</span>
          <span>with</span>
        </div>
      </div>
      <div className="flex gap-5 pb-10 justify-center items-center w-[100%] bg-[#F7FCFB]">
        <Image src="/images/quotes.svg" alt="quotes" height={50} width={50} />
        <div className="flex h-[15vh] items-end">
          <span className="text-2xl text-center">
            Nepal’s First Open Learning Platform dedicated to Share <br />{" "}
            Trading Education
          </span>
        </div>
      </div>
    </div>
  );
};

export default IntroComponent;
