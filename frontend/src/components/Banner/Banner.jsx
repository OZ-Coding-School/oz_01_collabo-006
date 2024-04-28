import { Box, Card, CardActionArea, Grid } from '@mui/material'

import { useTheme } from '@mui/material/styles'
import React from 'react'
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react'
// import './Banner.css'

import bnlogo from '/images/banner_logo.png'

function Banner() {
    const theme = useTheme()
    const data = [
        {
            title: '중랑 캠핑숲',
            information: '# 밤 산책',
            information1: '# 야경',
            img: '../../../public/images/banner1.png',
        },
        {
            title: '북촌 문화센터',
            information: '# 한옥마을',
            information1: '# 한옥카페',
            information2: '# 실내가능',
            img: '../../../public/images/banner2.png',
        },
        {
            title: '어라운드 데이',
            information: '# 성수',
            information1: '# 루프탑',
            img: '../../../public/images/banner3.png',
        },
        {
            title: '디어 앨리스',
            information: '# 이태원',
            information1: '# 와인바',
            img: '../../../public/images/banner4.png',
        },
    ]

    return (
        <>
            <Box sx={{ flexGrow: 1, marginBottom: '3px' }}>
                <Grid
                    container
                    spacing={{ xs: 2, md: 3, lg: 3 }}
                    columns={{ xs: 4, md: 12, lg: 12 }}
                >
                    <Grid
                        xs={4}
                        md={5}
                        lg={5}
                        sx={{
                            display: 'flex',
                            alignItems: 'start',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            cursor: 'default',
                        }}
                    >
                        <img
                            src={bnlogo}
                            alt="logo"
                            style={{
                                width: 'auto', // 이미지를 그리드 아이템에 꽉 차도록 설정
                                height: '30%', // 비율 유지
                            }}
                        />
                        <h1>
                            반려견과 함께하는 <br />
                            즐거운 하루를 위해!{' '}
                        </h1>
                        {/* <h1>
                            옷에서는 아무 냄새도 <br />
                            나지 않는게 좋아!{' '}
                        </h1> */}
                    </Grid>
                    <Grid xs={4} md={7} lg={7} minHeight={160}>
                        <Card
                            sx={{
                                textAlign: 'center',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '12px',
                                height: {
                                    xs: '225px',
                                    md: '280px',
                                    lg: '280px',
                                },
                            }}
                        >
                            <CardActionArea style={{ height: '100%' }}>
                                <Swiper slidesPerView={1} className="bn_swiper">
                                    {data.map((data, index) => (
                                        <SwiperSlide
                                            key={index}
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <div className="bn_swiper_content">
                                                <img
                                                    src={data.img}
                                                    alt=""
                                                    style={{
                                                        width: '100%',
                                                        zIndex: '999',
                                                    }}
                                                />
                                                <div
                                                    style={{
                                                        position: 'absolute',
                                                        top: '30%',
                                                        right: '0%',
                                                        textAlign: 'right',
                                                        transform:
                                                            'translate(-50%, -50%)',
                                                        color: '#fff',
                                                        zIndex: '1000',
                                                    }}
                                                >
                                                    <h1>{data.title}</h1>
                                                    <div
                                                        style={{
                                                            marginTop: '10%',
                                                            textAlign: 'left',
                                                        }}
                                                    >
                                                        <p>
                                                            {data.information}
                                                        </p>
                                                        <p>
                                                            {data.information1}
                                                        </p>
                                                        <p>
                                                            {data.information2}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
export default Banner
