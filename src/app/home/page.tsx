import React from "react";
import IntroComponent from "./IntroComponent";
import TradingSchoolQuestion from "./TradingSchoolQuestion";
import CoursesSlider from "./CoursesSlider";
import SettingUsApart from "./SettingUsApart";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-[10rem]">
      <IntroComponent />
      <TradingSchoolQuestion />
      <CoursesSlider />
      <SettingUsApart />
    </div>
  );
};

export default HomePage;
