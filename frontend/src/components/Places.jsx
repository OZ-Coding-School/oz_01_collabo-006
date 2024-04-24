import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'
import { Card, CardMedia, Pagination } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import placesData from '../../public/images/places'

const Places = ({ naviSelected }) => {
    const [items, setItems] = useState([])
    const [currentPage, setCurrentPage] = React.useState(1)

    useEffect(() => {
        // 여기에 아이템을 가져오는 비동기 작업을 수행하는 axios 요청을 추가할 수 있습니다.
        // 임시로 생성한 데이터를 설정합니다.
        setItems(placesData)
    }, [])

    // useEffect(() => {
    //     // 80개의 임시 아이템을 생성하여 설정합니다.
    //     const extendedItems = Array.from({ length: 80 }, (_, index) => ({
    //         id: index + 1,
    //         img: '../../public/images/hello.jpg',
    //         title: `시설 ${index + 1}`,
    //         distance: `00km`,
    //         information: `설명`,
    //         closed: '쉬는날',
    //         sectors: '분류',
    //         time: '00:00 ~ 00:00',
    //         dog: '애완견 기준',
    //         inside: '실내',
    //         outside: '실외',
    //     }))
    //     setItems(extendedItems)
    // }, [])

    const itemsPerPage = 20 // 페이지당 아이템 수

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage)
    }

    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage

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
                        <Grid
                            container
                            spacing={1}
                            columns={{ xs: 4, md: 8, lg: 12 }}
                        >
                            <Grid item xs={4} md={8} lg={12}>
                                <Link to={`/detail/${item.id}`}>
                                    <Card
                                        sx={{
                                            width: '100%',
                                            height: '0',
                                            paddingBottom: '100%',
                                            textAlign: 'center',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            position: 'relative',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => handleCardClick(item.id)}
                                    >
                                        <CardMedia
                                            component="img"
                                            image={item.img}
                                            alt={item.title}
                                            sx={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                            }}
                                        />
                                    </Card>
                                </Link>
                            </Grid>
                            <Grid item xs={4} md={8} lg={12}>
                                <Grid
                                    container
                                    spacing={1}
                                    columns={{ xs: 6, md: 8, lg: 8 }}
                                >
                                    <Grid item xs={3.6} md={6.6} lg={4.8}>
                                        <p>{item.title}</p>
                                        <p>{item.information}</p>
                                    </Grid>
                                    <Grid item xs={2.4} md={1.4} lg={3.2}>
                                        {naviSelected && (
                                            <p>
                                                {item.distance}{' '}
                                                <LocationOnRoundedIcon
                                                    style={{
                                                        fontSize: '21px',
                                                    }}
                                                />
                                            </p>
                                        )}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
            <Pagination
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '20px',
                }}
                count={Math.ceil(items.length / itemsPerPage)}
                page={currentPage}
                onChange={handleChangePage}
                size="small"
            />
        </>
    )
}

export default Places
