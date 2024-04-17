import React from 'react'

import { Box } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react'
import './Banner.css'
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
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid
                    container
                    spacing={{ xs: 2, md: 3, lg: 3 }}
                    columns={{ xs: 4, md: 8, lg: 12 }}
                >
                    <Grid xs={4} md={8} lg={4}>
                        <img
                            src={bnlogo}
                            alt="logo"
                            style={{
                                width: 'auto', // 이미지를 그리드 아이템에 꽉 차도록 설정
                                height: '41%', // 비율 유지
                                maxWidth: {
                                    xs: '64px', // 모바일
                                    md: '128px', // 태블릿
                                    lg: '160px', // 데스크톱
                                },
                            }}
                        />
                        <h1>
                            반려견과 함께하는 <br />
                            즐거운 하루를 위해!{' '}
                        </h1>
                    </Grid>
                    <Grid xs={4} md={8} lg={8}>
                        <Swiper slidesPerView={1} className="bn_swiper">
                            {data.map((data) => (
                                <SwiperSlide>
                                    <Content data={data} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

function Content({ data }) {
    return <>{data.title}</>
}

export default Banner
