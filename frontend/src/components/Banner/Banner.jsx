import React from 'react'

import './Banner.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

import bnlogo from '/images/bannerLogo.png'
import styled from '@emotion/styled'


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
                <div className="bn_logo_text">
                    <p>
                        반려견과 함께하는
                        <br />
                        즐거운 하루를 위해!!
                    </p>
                </div>
            </div>
            <Swiper slidesPerView={1} className="bn_swiper">
                {data.map((data) => (
                    <SwiperSlide>
                        <div className="bn_swiper_content">
                            <img src="" alt="" />
                            <p>{data.title}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default Banner
