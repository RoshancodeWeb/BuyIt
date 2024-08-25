import { RiTwitterXFill } from "react-icons/ri";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination,Autoplay } from "swiper/modules";



const SliderAbout = () => {
    return (
      <div className="slider2 crew members w-full h-fit mb-20 pl-7  md:pl-32  lg:pl-40  ">
          <Swiper
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 5,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 5,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 5,
              },
            }}
            loop={true}
            autoplay={{
              delay:3000,
              disableOnInteraction:false
            }}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination,Autoplay]}
            className="mySwiper"
          >
            <SwiperSlide>
              <div className="w-[250px] h-[350px] ">
                <div className="w-full h-[80%] bg-[#F5F5F5]">
                  <img
                    src="./about/personone.png"
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="w-full h-[20%] flex flex-col gap-[1px]">
                  <h3 className="text-lg font-bold">Roshan Ali</h3>
                  <p className="text-[12px]">Founder & Chairman</p>
                  <div className="w-full h-fit flex  items-center gap-4">
                    <RiTwitterXFill className="cursor-pointer text-[12px]" />
                    <FaLinkedinIn className="cursor-pointer text-[12px]" />
                    <FaInstagram className="cursor-pointer text-[12px]" />
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-[250px] h-[350px] ">
                <div className="w-full h-[80%] bg-[#F5F5F5]">
                  <img
                    src="./about/persontwo.png"
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="w-full h-[20%] flex flex-col gap-[1px]">
                  <h3 className="text-lg font-bold">Emma Watson</h3>
                  <p className="text-[12px]">Managing Director</p>
                  <div className="w-full h-fit flex  items-center gap-4">
                    <RiTwitterXFill className="cursor-pointer text-[12px]" />
                    <FaLinkedinIn className="cursor-pointer text-[12px]" />
                    <FaInstagram className="cursor-pointer text-[12px]" />
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-[250px] h-[350px] ">
                <div className="w-full h-[80%] bg-[#F5F5F5]">
                  <img
                    src="./about/personthree.png"
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="w-full h-[20%] flex flex-col gap-[1px]">
                  <h3 className="text-lg font-bold">Umair Ali</h3>
                  <p className="text-[12px]">Product Designer</p>
                  <div className="w-full h-fit flex  items-center gap-4">
                    <RiTwitterXFill className="cursor-pointer text-[12px]" />
                    <FaLinkedinIn className="cursor-pointer text-[12px]" />
                    <FaInstagram className="cursor-pointer text-[12px]" />
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-[250px] h-[350px] ">
                <div className="w-full h-[80%] bg-[#F5F5F5]">
                  <img
                    src="./about/personone.png"
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="w-full h-[20%] flex flex-col gap-[1px]">
                  <h3 className="text-lg font-bold">Roshan Ali</h3>
                  <p className="text-[12px]">Founder & Chairman</p>
                  <div className="w-full h-fit flex  items-center gap-4">
                    <RiTwitterXFill className="cursor-pointer text-[12px]" />
                    <FaLinkedinIn className="cursor-pointer text-[12px]" />
                    <FaInstagram className="cursor-pointer text-[12px]" />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
    )
  }

export default SliderAbout