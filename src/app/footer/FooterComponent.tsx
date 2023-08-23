import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

import { Box, Typography } from "@mui/material";

import {
  companyLinks,
  quickLinks,
  socialsLink,
  usefulLinks,
} from "../../../raw-data/footer-quick-links";

const FooterComponent = () => {
  const router = useRouter();

  return (
    <div className="bg-naasa-green md:px-[15em] md:py-[4em] static bottom-0 w-[100%]">
      <div className="flex flex-col P-[25px] md:flex-row justify-between gap-[20px] w-[100%] text-[16px] text-white">
        <div className="flex flex-col gap-[20px] w-[30%]">
          <Image
            src="/images/trading_school_logo.png"
            alt="nasalogo"
            height="150"
            width="250"
          />
          <div>
            <span>
              NAASA Securities Company Limited Licensed by Securities Board of
              Nepal (SEBON)
            </span>
            <span>Stock Broker No.58</span>
          </div>
          <div>
            <span>Lal Colony Marg, Lal Durbar, Kathmandu, Nepal</span>
            <span>+977-1-5970084</span>
            <span>naasa@naasasecurities.com.np</span>
          </div>
        </div>

        <div className={"flex flex-col justify-between"}>
          <div>
            <span className="font-bold">Useful Links</span>
            <div className="ml-[25px] mt-[10px] flex flex-col">
              {usefulLinks?.map((data, index) => (
                <Link href={data.link} key={index} target="_blank">
                  {data.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <span className="font-bold">Quick Links</span>
            <div className="ml-[25px] mt-[10px] flex flex-col">
              {quickLinks?.map((data, index) => {
                return data.name === "FAQ's" ? (
                  <span
                    className="cursor-pointer"
                    onClick={() => router.push("/faqs")}
                    key={index}
                  >
                    {data.name}
                  </span>
                ) : (
                  <Link href={data.link} key={index}>
                    {data.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
        <div>
          <span className="font-bold">Company</span>
          <div className="ml-[25px] mt-[10px] flex flex-col">
            {companyLinks?.map((data, index) => {
              return data.name === "FAQ's" ||
                data.name === "Careers" ||
                data.name === "Pricing" ||
                data.name === "Contact Us" ? (
                <span
                  className="cursor-pointer"
                  onClick={() => router.push(data.link)}
                  key={index}
                >
                  {data.name}
                </span>
              ) : (
                <Link href={data.link} key={index}>
                  {data.name}
                </Link>
              );
            })}
          </div>
        </div>
        <div>
          <span className="font-bold">Socials</span>
          <div className="ml-[25px] mt-[10px] flex flex-col">
            {socialsLink?.map((data, index) => (
              <Link href={data.link} key={index}>
                {data.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-[1.5rem] text-[16px] text-white">
        <Link href="/privacy-policy">Privacy Policy</Link>
        <Link href="/terms-and-services">Terms & Services</Link>
      </div>
    </div>
  );
};

export default FooterComponent;