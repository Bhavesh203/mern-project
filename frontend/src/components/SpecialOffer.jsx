import React, { useEffect, useState } from 'react';
import { BiSolidOffer } from 'react-icons/bi';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/navigation';
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import offerBg from "../../public/offer.png";

const SpecialOffer = () => {
    // Function to get or set offer end time
    const getOfferEndTime = () => {
        const storedEndTime = localStorage.getItem("offerEndTime");
        if (storedEndTime) {
            return parseInt(storedEndTime, 10);
        } else {
            const newEndTime = new Date().getTime() + 3 * 24 * 60 * 60 * 1000; // 3 days from now
            localStorage.setItem("offerEndTime", newEndTime);
            return newEndTime;
        }
    };

    // Function to calculate remaining time
    const calculateTimeLeft = () => {
        const offerEndTime = getOfferEndTime();
        const now = new Date().getTime();
        const difference = offerEndTime - now;

        if (difference > 0) {
            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / (1000 * 60)) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        } else {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 }; // If time is up
        }
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className='py-5 relative'>
            <div className="container">
                <div className="section_title py-2 px-1 w-fit border-y-[5px] border-double font-bold uppercase">
                    <span className="flex gap-3 items-center"><BiSolidOffer className="text-2xl" />Special Offer</span>
                </div>

                <div className="flex items-center offerBg">
                    {/* Swiper Container */}
                    <div className="relative w-[30%] ml-10">
                        {/* Left Arrow */}
                        <button id="prevBtn" className="absolute left-[-40px] top-1/2 -translate-y-1/2 z-10 p-3 bg-theme-color text-white rounded-full shadow-md hover:bg-gray-700 transition">
                            <FaChevronLeft size={20} />
                        </button>

                        <Swiper
                            spaceBetween={30}
                            slidesPerView={1}
                            loop={true}
                            autoplay={true}
                            navigation={{ prevEl: "#prevBtn", nextEl: "#nextBtn" }} // Custom navigation selectors
                            modules={[Navigation]}
                            className='w-full'
                        >
                            <SwiperSlide>
                                <Link to="/" className="flex flex-col items-center">
                                    <img className="m-auto p-3" src="category_2.jpg" alt="Lehenga Set" />
                                    <span className="py-2 px-1 w-[80%] text-theme-color text-center border-y-[5px] border-double font-bold uppercase">Lehenga Set</span>
                                </Link>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Link to="/" className="flex flex-col items-center">
                                    <img className="m-auto p-3" src="category_3.jpg" alt="Sarees" />
                                    <span className="py-2 px-1 w-[80%] text-theme-color text-center border-y-[5px] border-double font-bold uppercase">Sarees</span>
                                </Link>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Link to="/" className="flex flex-col items-center">
                                    <img className="m-auto p-3" src="category_4.jpg" alt="Mens Kurta" />
                                    <span className="py-2 px-1 w-[80%] text-theme-color text-center border-y-[5px] border-double font-bold uppercase">Mens Kurta</span>
                                </Link>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Link to="/" className="flex flex-col items-center">
                                    <img className="m-auto p-3" src="category_5.jpg" alt="Kurta Set" />
                                    <span className="py-2 px-1 w-[80%] text-theme-color text-center border-y-[5px] border-double font-bold uppercase">Kurta Set</span>
                                </Link>
                            </SwiperSlide>
                        </Swiper>

                        {/* Right Arrow */}
                        <button id="nextBtn" className="absolute right-[-40px] top-1/2 -translate-y-1/2 z-10 p-3 bg-theme-color text-white rounded-full shadow-md hover:bg-gray-700 transition">
                            <FaChevronRight size={20} />
                        </button>
                    </div>

                    {/* Special Offer Content */}
                    <div className="w-full m-auto md:w-1/2  z p-6 rounded-lg shadow-lg "
                    >
                        <h2 className="text-2xl font-bold flex items-center gap-2 text-theme-color">
                            <BiSolidOffer className="text-3xl" /> Special Offer
                        </h2>
                        <p className="text-gray-600 mt-2">Grab this limited-time deal before it ends!</p>

                        {/* Countdown Timer */}
                        <div className="mt-4 flex gap-4 text-center">
                            <div className="w-16 h-16 flex flex-col items-center justify-center bg-gray-800 text-white rounded-lg">
                                <span className="text-xl font-bold">{timeLeft.days || '00'}</span>
                                <span className="text-sm">Days</span>
                            </div>
                            <div className="w-16 h-16 flex flex-col items-center justify-center bg-gray-800 text-white rounded-lg">
                                <span className="text-xl font-bold">{timeLeft.hours || '00'}</span>
                                <span className="text-sm">Hours</span>
                            </div>
                            <div className="w-16 h-16 flex flex-col items-center justify-center bg-gray-800 text-white rounded-lg">
                                <span className="text-xl font-bold">{timeLeft.minutes || '00'}</span>
                                <span className="text-sm">Minutes</span>
                            </div>
                            <div className="w-16 h-16 flex flex-col items-center justify-center bg-gray-800 text-white rounded-lg">
                                <span className="text-xl font-bold">{timeLeft.seconds || '00'}</span>
                                <span className="text-sm">Seconds</span>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <Link to="/shop" className="mt-5 inline-block bg-theme-color text-white px-6 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition">
                            Shop Now
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SpecialOffer;
