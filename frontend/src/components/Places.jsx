import { Card, CardMedia, Grid, Pagination } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import prin from '../../public/images/prin.jpg'
import instance from '../api/axios'

const Places = ({ sortBy, filteredItems, filteredCityItems }) => {
    const [items, setItems] = useState([])
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await instance.get(`/categories/places/`)
                setItems(response.data.places)
                console.log('아이템', response.data.places)
            } catch (error) {
                console.error('저쩌구에러', error)
            }
        }
        fetchData()
        // setItems(placesData)
    }, [])

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

// import { Card, CardMedia, Pagination, Grid } from '@mui/material'

// import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
// import prin from '../../public/images/prin.jpg'

// const Places = ({ sortBy, filteredItems, placesData }) => {
//     const [currentPage, setCurrentPage] = useState(1)
//     const places = placesData.places || []

//     // displayItems를 items 대신 filteredItems로 사용하도록 수정
//     const displayItems =
//         filteredItems && filteredItems.length > 0 ? filteredItems : places

//     const itemsPerPage = 20

//     const handleChangePage = (event, newPage) => {
//         setCurrentPage(newPage)
//     }

//     const startIndex = (currentPage - 1) * itemsPerPage
//     const endIndex = startIndex + itemsPerPage

//     return (
//         <>
//             <Grid
//                 container
//                 spacing={{ xs: 2, md: 3, lg: 3 }}
//                 columns={{ xs: 4, md: 8, lg: 12 }}
//             >
//                 {/* 현재 페이지에 맞는 아이템들을 보여줌 */}
//                 {displayItems.slice(startIndex, endIndex).map((item) => (
//                     <Grid item xs={2} md={4} lg={3} key={item.id}>
//                         <Grid
//                             container
//                             spacing={1}
//                             columns={{ xs: 4, md: 8, lg: 12 }}
//                         >
//                             <Grid item xs={4} md={8} lg={12}>
//                                 <Link to={`/detail/${item.id}`}>
//                                     <Card
//                                         sx={{
//                                             width: '100%',
//                                             height: '0',
//                                             paddingBottom: '100%',
//                                             textAlign: 'center',
//                                             display: 'flex',
//                                             alignItems: 'center',
//                                             justifyContent: 'center',
//                                             position: 'relative',
//                                             cursor: 'pointer',
//                                         }}
//                                     >
//                                         <CardMedia
//                                             component="img"
//                                             image={prin}
//                                             alt={item.Place_Name}
//                                             sx={{
//                                                 position: 'absolute',
//                                                 top: 0,
//                                                 left: 0,
//                                                 width: '100%',
//                                                 height: '100%',
//                                                 objectFit: 'cover',
//                                             }}
//                                         />
//                                     </Card>
//                                 </Link>
//                             </Grid>
//                             <Grid item xs={4} md={8} lg={12}>
//                                 <p>{item.Place_Name}</p>
//                                 <p style={{ color: 'var(--gray)' }}>
//                                     {item.Opening_hours}
//                                 </p>
//                             </Grid>
//                         </Grid>
//                     </Grid>
//                 ))}
//             </Grid>
//             <Pagination
//                 style={{
//                     display: 'flex',
//                     justifyContent: 'center',
//                     marginTop: '20px',
//                 }}
//                 count={Math.ceil(displayItems.length / itemsPerPage)}
//                 page={currentPage}
//                 onChange={handleChangePage}
//                 size="small"
//             />
//         </>
//     )
// }

// export default Places
