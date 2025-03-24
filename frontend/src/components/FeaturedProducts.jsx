import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

const FeaturedProducts = () => {
    const [banners, setBanners] = useState([]);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/banners');
                setBanners(data);
            } catch (error) {
                console.error('Error fetching banners:', error);
            }
        };
        fetchBanners();
    }, []);

    return (
        <div className="py-6">
            <h2 className="text-2xl font-bold text-center mb-4">Featured Banners</h2>

            {banners.length === 0 ? (
                <p className="text-center text-gray-500">No banners available</p>
            ) : (
                <Swiper
                    spaceBetween={15}
                    slidesPerView={1}
                    loop={true}
                    breakpoints={{             
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                >
                    {banners.map((banner) => (
                        <SwiperSlide key={banner._id}>
                            <div className="bg-white p-4 rounded-lg shadow">
                                <img
                                    src={`http://localhost:5000/media/banner/${banner.image}`}
                                    alt={banner.name || "Banner"}
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
};

export default FeaturedProducts;
