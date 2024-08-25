import React from "react";

const AboutSection = () => {
    return (
      <div className="w-full h-fit md:flex  md:pt-10 lg:pt-0 lg:h-[500px]  lg:flex lg:items-center">
        <div className="w-full h-fit text-[12px] md:text-sm lg:text-lg flex flex-col gap-3 md:w-[50%] ">
          <h1 className="font-bold text-3xl  pt-3 ">Our Story</h1>
          <p className="w-[90%] pb-3 lg:w-[80%] lg:font-light">
            Launced in 2015, Exclusive is South Asia’s premier online shopping
            makterplace with an active presense in Bangladesh. Supported by wide
            range of tailored marketing, data and service solutions, Exclusive has
            10,500 sallers and 300 brands and serves 3 millioons customers across
            the region.{" "}
          </p>
          <p className="w-[90%] lg:w-[80%] lg:font-light">
            Exclusive has more than 1 Million products to offer, growing at a very
            fast. Exclusive offers a diverse assotment in categories ranging from
            consumer.
          </p>
        </div>
        <div className="w-full h-fit md:w-[50%] md:flex md:items-center md:justify-end ">
          <img
            src="./images/about.png"
            alt="products"
            className="w-full md:w-[80%]  h-[300px] lg:h-[400px] object-contain lg:w-[70%] "
          />
        </div>
      </div>
    );
  };

export default AboutSection