import {
    Avatar,
    Button,
    FormControl,
    Grid,
    OutlinedInput,
    Paper,
    useTheme,
} from '@mui/material'
import * as React from 'react'
// import userData from '../../public/images/user'
// import instance from '../api/axios'

const Review = ({ place }) => {
    const theme = useTheme()
    // const reviewData = userData[0]

    // place가 null이거나 undefined이면 해당하는 데이터가 없다는 메시지를 표시합니다.
    if (!place) {
        return <div>해당하는 데이터를 찾을 수 없습니다.</div>
    }

    return (
        <>
            <Grid container spacing={1} columns={{ xs: 9, md: 10, lg: 12 }}>
                {place.review_set.map((item) => (
                    <Grid item xs={9} md={10} lg={12} key={item.id}>
                        <Paper sx={{ p: 2, borderRadius: '15px' }}>
                            <Grid container spacing={1}>
                                <Grid item xs={3} md={1} lg={1}>
                                    {/* 사진없으면 사람모양으로뜸.  */}
                                    <Avatar src={item.img} />
                                </Grid>
                                <Grid item xs={6} md={9} lg={11}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} md={12} lg={12}>
                                            <h4>{item.user}</h4>
                                            <p>{item.content}</p>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                ))}

                <Grid item xs={9} md={10} lg={12}>
                    <Paper sx={{ p: 2, borderRadius: '15px' }}>
                        <FormControl sx={{ width: '100%' }}>
                            <Grid item xs={9} md={10} lg={12}>
                                <Grid
                                    container
                                    spacing={1}
                                    columns={{ xs: 9, md: 12, lg: 12 }}
                                >
                                    <Grid item xs={12} md={12} lg={12}>
                                        <OutlinedInput
                                            placeholder="리뷰를 입력하세요!"
                                            variant="outlined"
                                            // color="customYellow"
                                            sx={{
                                                width: '100%',
                                            }}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        xs={3}
                                        xsOffset={6}
                                        md={2}
                                        mdOffset={10}
                                        lg={2}
                                        lgOffset={10}
                                    >
                                        <Button
                                            variant="contained"
                                            disableElevation
                                            style={{
                                                backgroundColor:
                                                    theme.palette.common
                                                        .customYellow,
                                                borderRadius: '25px',
                                                width: '100%',
                                            }}
                                        >
                                            올리기
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </FormControl>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}

export default Review
