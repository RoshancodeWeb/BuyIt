"use client"
import Link from "next/link";
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination,Autoplay } from "swiper/modules";
import Services from "../Components/Services";
import AboutSection from "../AboutComponents/AboutSection";
import SliderAbout from "../AboutComponents/SliderAbout";
import Block from "../AboutComponents/Block"








const page = () => {
  return (
    <div className="w-full min-h-screen mt-[100px] pl-2 pr-2 lg:pr-0">
      <div className="w-full h-fit pt-1 text-[12px] flex items-start gap-1 md:text-sm lg:text-lg ">
        <Link className="w-fit h-fit text-[#7D8184]" href="/">
          Home /
        </Link>
        <p className="w-fit h-fit">About</p>
      </div>
      <AboutSection />

      <div className="products w-full lg:flex  lg:justify-center h-[250px]  pl-2  mt-10 whitespace-nowrap overflow-x-scroll  ">
        <Block
          imagePath={"./images/right.png"}
          heading={"10.5k"}
          subheading={"Sellers active our site"}
        />
        <Block
          imagePath={"./about/dollar.png"}
          heading={"33k"}
          subheading={"Monthly Product Sale"}
        />
        <Block
          imagePath={"./about/shopping.png"}
          heading={"45.5k"}
          subheading={"Customers active in our sale"}
        />
        <Block
          imagePath={"./about/bag.png"}
          heading={"10.5k"}
          subheading={"Annual gross ale in our site"}
        />
      </div>
      <SliderAbout/>
      <Services/>
    </div>
  );
};

export default page;
