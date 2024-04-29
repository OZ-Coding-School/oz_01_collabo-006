import { Card, CardMedia, Grid, Pagination } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import instance from '../api/axios'

const Places = ({ filteredItems }) => {
    const [items, setItems] = useState([])
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const queryParams = new URLSearchParams(
                    filteredItems
                ).toString()
                const response = await instance.get(
                    `/categories/places/?${queryParams}`
                )
                setItems(response.data.places)
            } catch (error) {
                console.error('에러 발생:', error)
            }
        }
        fetchData()
    }, [filteredItems])

    // displayItems를 items 대신 filteredItems로 사용하도록 수정
    const displayItems =
        filteredItems && filteredItems.length > 0 ? filteredItems : items

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
                {displayItems.slice(startIndex, endIndex).map((item) => (
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
                                            image={item.thumbnail}
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
                                <p>{item.Place_Name}</p>
                                <p style={{ color: 'var(--gray)' }}>
                                    {item.Opening_hours}
                                </p>
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
