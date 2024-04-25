import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'
import { Card, CardMedia, Pagination } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import prin from '../../public/images/prin.jpg'
import instance from '../api/axios'

const Places = ({ naviSelected, sortBy, filteredItems }) => {
    const [items, setItems] = useState([])
    const [currentPage, setCurrentPage] = React.useState(1)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await instance.get(`/categories/places/`)
                setItems(response.data.results)
                console.log('아이템', response.data.results)
            } catch (error) {
                console.error('저쩌구에러', error)
            }
        }
        fetchData()
        // setItems(placesData)
    }, [])

    useEffect(() => {
        // 필터링된 결과가 바뀔 때마다 페이지를 1로 초기화합니다.
        setCurrentPage(1)
    }, [filteredItems])

    useEffect(() => {
        if (sortBy === 'popularity') {
            // 인기순으로 정렬하는 식 추가.
        }
        if (sortBy === 'distance') {
            let sortedItems =
                filteredItems.length > 0 ? [...filteredItems] : [...items]
            sortedItems.sort((a, b) => a.distance - b.distance)
            setItems(sortedItems)
        }
    }, [sortBy, filteredItems])

    // displayItems를 items 대신 filteredItems로 사용하도록 수정
    let displayItems = Array.isArray(filteredItems) ? filteredItems : items

    const itemsPerPage = 20

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
                {items.slice(startIndex, endIndex).map((item) => (
                    <Grid item xs={2} md={4} lg={3} key={item.id}>
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
                                    >
                                        <CardMedia
                                            component="img"
                                            image={prin}
                                            alt={item.Place_Name}
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
                                        <p>{item.Place_Name}</p>
                                        <p>{item.Opening_hours}</p>
                                    </Grid>
                                    <Grid item xs={2.4} md={1.4} lg={3.2}>
                                        {naviSelected && (
                                            <p>
                                                00
                                                {/* {item.Off_Day} */}
                                                {'km'}
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
                count={Math.ceil(displayItems.length / itemsPerPage)}
                page={currentPage}
                onChange={handleChangePage}
                size="small"
            />
        </>
    )
}

export default Places
