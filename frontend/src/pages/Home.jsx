import React, { useState } from "react";
import 'swiper/css';
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';

const Home = () => {
  

  return (
    <>
      <div className="home-banner  relative w-full">
          <div className="container relative">
        <div className="banner-content absolute top-[100px] left-[100px]">
            <div className="border w-fit p-3">
              <span className="block font-bold">UNIQUE COLLECTION</span>
            </div>
            <div className="max-w-[500px]">
              <h1 className="mt-10 leading-16 text-5xl font-black">BEST FURNITURES FOR HOME</h1>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, sed. Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
              <button className="btn btn-primary mt-5">Shop Now</button>
            </div>
          </div>
        </div>
        <img src="/home-banner.jpeg" alt="" className="banner-img w-full object-cover h-[600px]" />
      </div>

      {/* Category */}
      <div className="container">
      <div>      
        <span className="border p-3 block w-fit font-black text-[23px]">Featured Category</span>
      </div>
      <div className="my-5">
        <ul className="flex gap-5 justify-between">
        </ul>
        <Swiper
      spaceBetween={30}
      slidesPerView={5}
      loop={true}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>
          <Link to="/" className=""><img className="w-[150px] m-auto p-3 border" src="bags.png" alt="" /></Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/" className=""><img className="w-[150px] m-auto p-3 border" src="dress.png" alt="" /></Link>
        </SwiperSlide>
        <SwiperSlide>          
          <Link to="/" className=""><img className="w-[150px] m-auto p-3 border" src="rings.png" alt="" /></Link>
        </SwiperSlide>
        <SwiperSlide>          
          <Link to="/" className=""><img className="w-[150px] m-auto p-3 border" src="shoes.png" alt="" /></Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/" className=""><img className="w-[150px] m-auto p-3 border" src="t-shirt.png" alt="" /></Link>          
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/" className=""><img className="w-[150px] m-auto p-3 border" src="wrist-watch.png" alt="" /></Link>          
        </SwiperSlide>
    </Swiper>
      </div>
      </div>
    </>
  );
};

export default Home;
