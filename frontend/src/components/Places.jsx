import { Grid, Pagination, Paper } from '@mui/material'
import * as React from 'react'

const Places = () => {
    const [items, setItems] = React.useState([]) // 아이템 상태 변수 선언 및 초기화
    const [currentPage, setCurrentPage] = React.useState(1) // 현재 페이지 상태 변수 선언 및 초기화

    // useEffect 훅을 사용하여 컴포넌트가 렌더링될 때 한 번만 실행되는 비동기 작업을 수행
    React.useEffect(() => {
        // 여기에 아이템을 가져오는 비동기 작업을 수행하는 axios 요청을 추가할 수 있습니다.
        // 아래 예시 코드는 임시로 items 배열을 초기화하는 코드입니다.
        const fetchedItems = Array.from(Array(80)).map((_, index) => ({
            text: `Item ${index + 1}`,
        }))
        setItems(fetchedItems) // 가져온 아이템을 상태 변수에 설정
    }, []) // 빈 배열을 전달하여 컴포넌트가 처음 마운트될 때 한 번만 실행되도록 함

    const itemsPerPage = 20 // 페이지당 아이템 수

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage) // 페이지 변경 핸들러
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
                        <Paper
                            sx={{
                                height: '100px',
                                textAlign: 'center',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            {item.text}
                        </Paper>
                    </Grid>
                ))}
            </Grid>
            <Pagination
                style={{ display: 'flex', justifyContent: 'center' }}
                count={Math.ceil(items.length / itemsPerPage)} // 전체 페이지 수 설정
                page={currentPage} // 현재 페이지 설정
                onChange={handleChangePage} // 페이지 변경 핸들러 설정
                size="small"
            />
        </>
    )
}

export default Places

// import { Container, Pagination } from '@mui/material'
// import Box from '@mui/material/Box'
// import Paper from '@mui/material/Paper'
// import Grid from '@mui/material/Unstable_Grid2'
// import { styled } from '@mui/material/styles'

// import * as React from 'react'

// // const theme = createTheme({
// //     breakpoints: {
// //         values: {
// //             mobile: 0,
// //             tablet: 767,
// //             desktop: 1279,
// //         },
// //     },
// // })

// const items = Array(50)
//     .fill(null)
//     .map((_, index) => ({
//         text: `item${index + 1}`,
//     }));

// const Item = styled(Paper)(({ theme }) => ({
//     ...theme.typography.body2,
//     padding: theme.spacing(2),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
// }))

// const Places = () => {
//     return (
//         <>
//             <Container maxWidth="md">
//                 <Box sx={{ flexGrow: 1 }}>
//                     <Grid
//                         container
//                         spacing={{ xs: 2, md: 3, lg: 3 }}
//                         columns={{ xs: 4, md: 8, lg: 12 }}
//                     >
//                         {Array.from(Array(20)).map((_, index) => (
//                             <Grid xs={2} md={4} lg={3} key={index}>
//                                 <Item sx={{ height: '100px' }}>xs=2</Item>
//                             </Grid>
//                         ))}
//                     </Grid>
//                 </Box>
//                 <Pagination count={10} size="small" />
//             </Container>
//         </>
//     )
// }

// export default Places
