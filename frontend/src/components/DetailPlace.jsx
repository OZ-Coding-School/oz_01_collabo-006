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
import prin from '../../public/images/prin.jpg'

// function createData(name, detail) {
//     return { name, detail }
// }

// const firstRows = [
//     createData(
//         '쉬는날',
//         placesData.map((place) => place.closed)
//     ),
//     createData(
//         '분류',
//         placesData.map((place) => place.sectors)
//     ),
//     createData(
//         '이용시간',
//         placesData.map((place) => place.time)
//     ),
// ]

// const secondRows = [
//     createData(
//         '애완견 기준',
//         placesData.map((place) => place.dog)
//     ),
//     createData(
//         '실내',
//         placesData.map((place) => place.inside)
//     ),
//     createData(
//         '실외',
//         placesData.map((place) => place.outside)
//     ),
// ]

const DetailPlace = ({ place }) => {
    const theme = useTheme()
    // const { id } = useParams()
    // const place = placesData.find((place) => place.id === parseInt(id))

    // place가 null이거나 undefined이면 해당하는 데이터가 없다는 메시지를 표시합니다.
    if (!place) {
        return <div>해당하는 데이터를 찾을 수 없습니다.</div>
    }

    // id 값에 해당하는 장소 정보를 사용하여 firstRows와 secondRows를 업데이트합니다.
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
                            width: '100%', // Card의 너비를 100%로 설정
                            height: '0', // Card의 높이를 0으로 설정하여 aspect ratio를 조정할 수 있도록 함
                            paddingBottom: '70%', // Card의 paddingBottom을 100%로 설정하여 정사각형이 되도록 함
                            textAlign: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative', // Card의 자식 요소들을 절대 위치로 배치하기 위해 position 속성을 추가
                            cursor: 'pointer',
                        }}
                    >
                        <CardMedia
                            component="img"
                            image={prin}
                            alt={place.Place_Name}
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
                                            theme.palette.common.customYellow,
                                        borderRadius: '25px',
                                        width: '100%',
                                    }}
                                >
                                    홈페이지 바로가기
                                </Button>
                            </a>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default DetailPlace
