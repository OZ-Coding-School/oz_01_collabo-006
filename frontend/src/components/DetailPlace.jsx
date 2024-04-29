import {
    Button,
    Card,
    CardMedia,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    useTheme,
} from '@mui/material'
import * as React from 'react'

const DetailPlace = ({ place }) => {
    const theme = useTheme()

    if (!place) {
        return <div>해당하는 데이터를 찾을 수 없습니다.</div>
    }

    const firstRows = [
        { name: '쉬는날', detail: place.Off_Day },
        { name: '분류', detail: place.Category2 },
        { name: '이용시간', detail: place.Opening_hours },
    ]

    const secondRows = [
        { name: '애완견 기준', detail: place.Dog_Size },

        { name: '주차가능여부', detail: place.Parking },
        { name: '상세설명', detail: place.Location_Description },
    ]

    const handleButtonClick = () => {
        if (place.Home_Page === '정보없음') {
            alert('링크가 존재하지 않습니다!')
        } else {
            window.open(place.Home_Page, '_blank')
        }
    }

    return (
        <>
            <Grid
                container
                spacing={{ xs: 2, md: 3, lg: 3 }}
                columns={{ xs: 12, md: 12, lg: 12 }}
            >
                <Grid item xs={12} md={12} lg={6}>
                    <Card
                        sx={{
                            width: '100%',
                            height: '0',
                            paddingBottom: '70%',
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
                            image={place.thumbnail_url}
                            alt={place.Place_Name}
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
                </Grid>
                <Grid item xs={12} md={12} lg={6}>
                    <Grid
                        container
                        spacing={{ xs: 1, md: 1, lg: 0 }}
                        columns={{ xs: 12, md: 12, lg: 12 }}
                    >
                        <Grid item xs={12} md={12} lg={12}>
                            <h1
                                style={{
                                    paddingLeft: '10px',
                                    paddingBottom: '10px',
                                }}
                            >
                                {place.Place_Name}
                            </h1>
                        </Grid>
                        <Grid item xs={6} md={6} lg={12}>
                            <TableContainer>
                                <Table
                                    sx={{ width: '100%' }}
                                    size="small"
                                    aria-label="a dense table"
                                >
                                    <TableBody>
                                        {firstRows.map((row) => (
                                            <TableRow key={row.name}>
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                    sx={{ paddingRight: 0 }}
                                                >
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {row.detail}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                        <Grid item xs={6} md={6} lg={12}>
                            <TableContainer>
                                <Table
                                    sx={{ width: '100%' }}
                                    size="small"
                                    aria-label="a dense table"
                                >
                                    <TableBody>
                                        {secondRows.map((row) => (
                                            <TableRow key={row.name}>
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                    sx={{ paddingRight: 0 }}
                                                >
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {row.detail}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            {place.Home_Page === '정보없음' ? (
                                <Button
                                    variant="contained"
                                    disableElevation
                                    style={{
                                        marginTop: '8px',
                                        backgroundColor:
                                            theme.palette.common.customYellow,
                                        borderRadius: '25px',
                                        width: '100%',
                                    }}
                                    onClick={handleButtonClick}
                                >
                                    홈페이지 바로가기
                                </Button>
                            ) : (
                                <a
                                    href={place.Home_Page}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Button
                                        variant="contained"
                                        disableElevation
                                        style={{
                                            marginTop: '8px',
                                            backgroundColor:
                                                theme.palette.common
                                                    .customYellow,
                                            borderRadius: '25px',
                                            width: '100%',
                                        }}
                                    >
                                        홈페이지 바로가기
                                    </Button>
                                </a>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default DetailPlace
