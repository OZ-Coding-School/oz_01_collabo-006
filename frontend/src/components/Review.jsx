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
import instance from '../api/axios'
import { useState } from 'react'
import { useEffect } from 'react'

const Review = ({ place }) => {
    const theme = useTheme()
    if (!place) {
        return <div>해당하는 데이터를 찾을 수 없습니다.</div>
    }

    const [content, setContent] = useState('')
    const placeId = place.id
    async function getUserId() {
        try {
            const accessCookieRegex = /access=([^;]*)/
            const userToken = document.cookie
                .match(accessCookieRegex)[0]
                .split('=')[1]

            console.log(userToken)
            // 유저 아이디를 넘겨야한다.
            // retrun userid
        } catch (error) {
            console.log('유저 조회 실패 ', error)
        }
    }

    // useEffect(() => {
    //     async function handleGetReview() {
    //         try {
    //             const response = await instance.get(
    //                 `/categories/places/${placeId}`
    //             )
    //             console.log('불러오기', response)
    //         } catch (error) {
    //             console.log('리뷰 겟 에러 ', error)
    //         }
    //     }
    //     handleGetReview()
    // }, [])

    async function handleUpload() {
        try {
            // const user = getUserId()
            const response = await instance.post(
                '/reviews/review',
                { content, place: placeId, user: 1 },
                {
                    headers: {
                        accept: 'application/json',
                    },
                }
            )
            console.log(response.data)
        } catch (error) {
            console.error('리뷰 업로드 실패:', error)
        }
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
                                            value={content}
                                            onChange={(e) =>
                                                setContent(e.target.value)
                                            }
                                        />
                                        {content.length > 1 &&
                                        content.length <= 8 ? (
                                            <p
                                                style={{
                                                    fontSize: '12px',
                                                    marginLeft: '5px',

                                                    color: 'red',
                                                }}
                                            >
                                                8자 이상 입력하세요.
                                            </p>
                                        ) : null}
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
                                        {content.length >= 8 ? (
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
                                                onClick={handleUpload}
                                            >
                                                올리기
                                            </Button>
                                        ) : (
                                            <Button
                                                disabled
                                                variant="contained"
                                                disableElevation
                                                style={{
                                                    backgroundColor:
                                                        theme.palette.common
                                                            .customYellow,
                                                    borderRadius: '25px',
                                                    width: '100%',
                                                }}
                                                onClick={handleUpload}
                                            >
                                                올리기
                                            </Button>
                                        )}
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
