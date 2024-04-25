import { ThemeProvider } from '@mui/material/styles'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import instance from '../api/axios'
import DetailPlace from '../components/DetailPlace'
import DetailTab from '../components/DetailTab'
import theme from '../theme'

function DetailPage() {
    const { id } = useParams()
    // console.log(id)
    const [place, setPlace] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await instance.get(`/categories/places/${id}/`)
                setPlace(response.data)
                console.log('아이디', response.data)
            } catch (error) {
                console.error('어쩌구에러', error)
            }
        }
        fetchData()
    }, [])

    // // id 값에 해당하는 장소 데이터를 찾음
    // const selectedPlace = placesData.find(place => place.id === parseInt(id))

    // if (!selectedPlace) {
    //     // id 값에 해당하는 데이터가 없을 경우 처리할 내용
    //     return <div>해당하는 데이터를 찾을 수 없습니다.</div>
    // }

    return (
        <>
            <ThemeProvider theme={theme}>
                <DetailPlace id={id} place={place} />

                <DetailTab place={place} />
                {/* 프롭스로 값을 내려줘 */}
            </ThemeProvider>
        </>
    )
}

export default DetailPage
