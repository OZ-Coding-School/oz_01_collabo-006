import { ThemeProvider } from '@mui/material/styles'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import placesData from '../../public/images/places'
import DetailPlace from '../components/DetailPlace'
import DetailTab from '../components/DetailTab'
import theme from '../theme'

function DetailPage() {
    const { id } = useParams()
    console.log(id)
    const [place, setPlace] = useState(null)

    useEffect(() => {
        // id 값에 해당하는 장소 데이터를 찾음
        const selectedPlace = placesData.find(
            (place) => place.id === parseInt(id)
        )

        if (selectedPlace) {
            setPlace(selectedPlace)
        } else {
            // id 값에 해당하는 데이터가 없을 경우 처리할 내용
            console.log('해당하는 데이터를 찾을 수 없습니다.')
        }
    }, [id])

    // // id 값에 해당하는 장소 데이터를 찾음
    // const selectedPlace = placesData.find(place => place.id === parseInt(id))

    // if (!selectedPlace) {
    //     // id 값에 해당하는 데이터가 없을 경우 처리할 내용
    //     return <div>해당하는 데이터를 찾을 수 없습니다.</div>
    // }

    return (
        <>
            <ThemeProvider theme={theme}>
                <DetailPlace id={id} />

                <DetailTab />
            </ThemeProvider>
        </>
    )
}

export default DetailPage
