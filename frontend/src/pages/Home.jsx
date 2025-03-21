import React, { useState } from "react";
import 'swiper/css';
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { BiSolidCategoryAlt } from "react-icons/bi";



const Home = () => {


  return (
    <>
      <div className="home-banner  relative w-full">
        <img src="/home-banner.gif" alt="" className="banner-img w-full object-cover h-[800px]" />
      </div>

      {/* Category */}
      <div className="bg-[#e6ddfa] py-5">
      <div className="container">
        <div>
          {/* <span className="border p-3 block w-fit font-black text-[23px]">Featured Category</span> */}
          <div className="section_title py-2 px-1 w-fit border-y-[5px] border-double font-bold uppercase">
            <span className="flex gap-3 items-center"><BiSolidCategoryAlt className="text-2xl" />Shop By Category</span>            
          </div>
        </div>
        <div className="my-5">
          <ul className="flex gap-5 justify-between">
          </ul>
          <Swiper
            spaceBetween={30}
            slidesPerView={2}
            loop={true}
            breakpoints={{
              1024: {
                slidesPerView: 4
              },
              768: {
                slidesPerView: 3,
              },
            }}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {/* <SwiperSlide>
              <Link to="/" className="flex flex-col"><img className="m-auto p-3" src="category_1.jpg" alt="" />
              <span className="py-2 px-1 w-fit border-y-[5px] border-double font-bold uppercase">Sarees</span>
              </Link>
            </SwiperSlide> */}
            <SwiperSlide>
              <Link to="/" className="flex flex-col items-center"><img className="m-auto p-3" src="category_2.jpg" alt="" />
              <span className="py-2 px-1 w-[80%] text-theme-color text-center border-y-[5px] border-double font-bold uppercase">Lehenga Set</span>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to="/" className="flex flex-col items-center"><img className="m-auto p-3" src="category_3.jpg" alt="" />
              <span className="py-2 px-1 w-[80%] text-theme-color text-center border-y-[5px] border-double font-bold uppercase">Sarees</span>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to="/" className="flex flex-col items-center"><img className="m-auto p-3" src="category_4.jpg" alt="" />
              <span className="py-2 px-1 w-[80%] text-theme-color text-center border-y-[5px] border-double font-bold uppercase">Mens Kurta</span>
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to="/" className="flex flex-col items-center"><img className="m-auto p-3" src="category_5.jpg" alt="" />
              <span className="py-2 px-1 w-[80%] text-theme-color text-center border-y-[5px] border-double font-bold uppercase">Kurta Set</span>
              </Link>
            </SwiperSlide>
            {/* <SwiperSlide>
              <Link to="/" className=""><img className="m-auto p-3 border" src="category_1" alt="" /></Link>
            </SwiperSlide> */}
          </Swiper>
        </div>
      </div>
      </div>
    </>
  );
};

export default Home;
