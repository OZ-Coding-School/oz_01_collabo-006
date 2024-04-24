import {
    Avatar,
    Button,
    FormControl,
    OutlinedInput,
    Paper,
} from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { useTheme } from '@mui/material/styles'
import * as React from 'react'
// import userData from '../../public/images/user'
import { useParams } from 'react-router-dom'
import placesData from '../../public/images/places'

const Review = () => {
    const theme = useTheme()
    // const reviewData = userData[0]

    const { id } = useParams()
    const place = placesData.find((place) => place.id === parseInt(id))

    // place가 null이거나 undefined이면 해당하는 데이터가 없다는 메시지를 표시합니다.
    if (!place) {
        return <div>해당하는 데이터를 찾을 수 없습니다.</div>
    }

    return (
        <>
            <Grid container spacing={1} columns={{ xs: 9, md: 10, lg: 12 }}>
                {place.users.map((userData, index) => (
                    <Grid xs={9} md={10} lg={12} key={index}>
                        <Paper sx={{ p: 2, borderRadius: '15px' }}>
                            <Grid container spacing={1}>
                                <Grid xs={3} md={1} lg={1}>
                                    {/* 사진없으면 사람모양으로뜸.  */}
                                    <Avatar src={userData.img} />
                                </Grid>
                                <Grid xs={6} md={9} lg={11}>
                                    <Grid container spacing={1}>
                                        <Grid xs={12} md={12} lg={12}>
                                            <h4>{userData.name}</h4>
                                            <p>{userData.comment}</p>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                ))}

                <Grid xs={9} md={10} lg={12}>
                    <Paper sx={{ p: 2, borderRadius: '15px' }}>
                        <FormControl sx={{ width: '100%' }}>
                            <Grid xs={9} md={10} lg={12}>
                                <Grid
                                    container
                                    spacing={1}
                                    columns={{ xs: 9, md: 12, lg: 12 }}
                                >
                                    <Grid xs={12} md={12} lg={12}>
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
