import { Card, CardMedia, Pagination } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import placesData from '../../public/images/places'

const Places = () => {
    const [items, setItems] = useState([]) // 아이템 상태 변수 선언 및 초기화
    const [currentPage, setCurrentPage] = React.useState(1) // 현재 페이지 상태 변수 선언 및 초기화
    const navigate = useNavigate()
    // useEffect 훅을 사용하여 컴포넌트가 렌더링될 때 한 번만 실행되는 비동기 작업을 수행

    useEffect(() => {
        // 여기에 아이템을 가져오는 비동기 작업을 수행하는 axios 요청을 추가할 수 있습니다.
        // 임시로 생성한 데이터를 설정합니다.
        setItems(placesData)
    }, [])

    const itemsPerPage = 20 // 페이지당 아이템 수

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage) // 페이지 변경 핸들러
    }

    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage

    const handleCardClick = (itemId) => {
        navigate(`/detail/${itemId}`)
    }

    return (
        <>
            <Grid
                container
                spacing={{ xs: 2, md: 3, lg: 3 }}
                columns={{ xs: 4, md: 8, lg: 12 }}
            >
                {/* 현재 페이지에 맞는 아이템들을 보여줌 */}
                {items.slice(startIndex, endIndex).map((item, index) => (
                    <Grid item xs={2} md={4} lg={3} key={index}>
                        <Card
                            sx={{
                                width: '100%', // Card의 너비를 100%로 설정
                                height: '0', // Card의 높이를 0으로 설정하여 aspect ratio를 조정할 수 있도록 함
                                paddingBottom: '100%', // Card의 paddingBottom을 100%로 설정하여 정사각형이 되도록 함
                                textAlign: 'center',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative', // Card의 자식 요소들을 절대 위치로 배치하기 위해 position 속성을 추가
                                cursor: 'pointer',
                            }}
                            onClick={() => handleCardClick(item.id)}
                        >
                            <CardMedia
                                component="img"
                                image={item.img}
                                alt={item.title}
                                sx={{
                                    position: 'absolute', // 이미지를 절대 위치로 설정하여 Card 안에 꽉 차게 배치
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover', // 이미지가 Card 안에 꽉 차게 표시되도록 설정
                                }}
                            />
                        </Card>

                        <p>{item.title}</p>
                        <p>{item.distance}</p>
                        <p>{item.information}</p>
                    </Grid>
                ))}
            </Grid>
            <Pagination
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '20px',
                }}
                count={Math.ceil(items.length / itemsPerPage)} // 전체 페이지 수 설정
                page={currentPage} // 현재 페이지 설정
                onChange={handleChangePage} // 페이지 변경 핸들러 설정
                size="small"
            />
        </>
    )
}

export default Places
