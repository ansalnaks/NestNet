import React from 'react'
import { partnership } from './data/data';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../sec.css'

function Partnership() {

    return (
        <div className='builders'>
            <h1 style={{ textAlign: "center" ,textShadow:"2px 3px gray",color:"lightblack"}}>Partnerships</h1> <br />
            <Swiper 
                slidesPerView={3}
                spaceBetween={30}
                loop={true}
                pagination={{ clickable: true}}
                navigation={true}
                autoplay={{ delay: 2000, disableOnInteraction: false }}
                modules={[Pagination, Navigation, Autoplay]}>
                {partnership.map((deta, index) => (
                    <SwiperSlide key={index}>
                        <img className="buildimg" style={{ width: "70%", height: "105px" ,marginLeft:"3%"}} src={deta.img} alt="Partnership" />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default Partnership