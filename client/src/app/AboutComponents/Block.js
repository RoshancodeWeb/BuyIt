import React from "react";

const Block = ({ imagePath, heading, subheading }) => {
    return (
      <div className="w-[230px]  h-[200px] lg:w-[260px] border-2 border-slate-200 rounded  mr-5  inline-block group hover:bg-[#DB4444] cursor-pointer ">
        <div className="w-[90%]  h-[90%] flex flex-col  gap-1 pt-5 items-center relative left-[50%] translate-x-[-50%]">
          <img
            src={imagePath}
            className="w-[50%] h-[50%]  object-contain"
            alt="products"
          />
          <p className="text-lg font-bold group-hover:text-white md:text-xl">
            {heading}
          </p>
          <p className="group-hover:text-white  text-[12px] md:text-sm lg:text-lg">
            {subheading}
          </p>
        </div>
      </div>
    );
  };

export default Block