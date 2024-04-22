import React from 'react'

import './Banner.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import bnlogo from '/images/banner_logo.png'

function Banner() {
    const data = [
        {
            title: '광고1',
            img: 'link',
        },
        {
            title: '광고2',
            img: 'link',
        },
        {
            title: '광고3',
            img: 'link',
        },
    ]

    return (
        <div className="bn_contain">
            <div className="bn_logo">
                <img src={bnlogo} alt="" />
            </div>
            <Swiper slidesPerView={1} className="bn_swiper">
                {data.map((data) => (
                    <SwiperSlide>
                        <Content data={data} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

function Content({ data }) {
    return <>{data.title}</>
}

export default Banner
