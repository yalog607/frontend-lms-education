import React from "react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import banner from "../assets/images/banner.png"

const Banner = () => {
  const banners = [
    {
    id: 1,
    title: "Master Data Structures & Algorithms", 
    desc: "Build the bedrock of computer science. Master complex algorithms, optimize your code efficiency, and confidently ace technical interviews at top tech companies.",
    btnText: "EXPLORE COURSE",
    gradient: "from-[#000428] to-[#004e92]", 
    image: "" ,
    link: ""
  },
  {
    id: 2,
    title: "Object-Oriented Programming Mastery",
    desc: "Dive deep into the 4 pillars of OOP: Encapsulation, Abstraction, Inheritance, and Polymorphism. Learn to write clean, scalable, and maintainable code for real-world apps.",
    btnText: "START LEARNING",
    gradient: "from-[#ff512f] to-[#dd2476]", 
    image: "",
    link: ""
  },
  {
    id: 3,
    title: "Become a Zero-to-Hero Developer",
    desc: "Comprehensive roadmap for beginners. Hands-on projects, active community support, and everything you need to launch your career in software development.",
    btnText: "JOIN COMMUNITY",
    gradient: "from-[#11998e] to-[#38ef7d]", 
    image: "",
    link: ""
  },
  ];

  return (
    <div className="w-full ">
      <Swiper
        spaceBetween={1}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper rounded-2xl overflow-hidden shadow-lg bg-base-200"
      >
        {banners.map((item) => (
          <SwiperSlide key={item.id}>
            <div 
              className={`w-full h-70 md:h-80 bg-linear-to-r ${item.gradient} flex items-center px-12 md:px-24 relative rounded-2xl`}
            >
              
              <div className="w-full lg:w-2/3 text-white z-10 flex flex-col items-start justify-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 leading-tight">
                  {item.title}
                </h2>
                <p className="text-sm md:text-base mb-6 md:mb-8 font-medium max-w-125 leading-relaxed opacity-90">
                  {item.desc}
                </p>
                
                <button className="border-2 border-white text-white px-5 py-2 rounded-full font-bold text-xs md:text-sm uppercase hover:bg-white hover:text-rose-500 transition-all duration-300 cursor-pointer">
                  {item.btnText}
                </button>
              </div>

              <div className="hidden lg:flex w-1/3 h-full justify-center items-center relative z-10">
                  <img 
                    src={banner} 
                    alt={item.title} 
                    className="max-h-[95%] object-contain drop-shadow-lg"
                  />
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
