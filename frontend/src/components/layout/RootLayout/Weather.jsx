import React, { useState } from 'react'
import { useEffect } from 'react'

const Weather = () => {
    const [weatherList, setWeatherList] = useState([])

    const cities = [
        { city: 'Seoul', krName: '서울' },
        { city: 'Gyeonggi', krName: '경기' },
        { city: 'Incheon', krName: '인천' },
        { city: 'Gangwon', krName: '강원' },
        { city: 'Chungnam', krName: '충남' },
        { city: 'Sejong', krName: '세종' },
        { city: 'Daejeon', krName: '대전' },
        { city: 'Chungbuk', krName: '충북' },
        { city: 'Daegu', krName: '대구' },
        { city: 'Gyeongbuk', krName: '경북' },
        { city: 'Jeonbuk', krName: '전북' },
        { city: 'Jeonnam', krName: '전남' },
        { city: 'Gwangju', krName: '광주' },
        { city: 'Changwon', krName: '창원' },
        { city: 'Busan', krName: '부산' },
        { city: 'Ulsan', krName: '울산' },
        { city: 'Jeju', krName: '제주' },
    ]

    useEffect(() => {
        async function weather() {
            try {
                const responses = await Promise.all(
                    cities.map(async (item) => {
                        const response = await fetch(
                            `https://api.openweathermap.org/data/2.5/weather?q=${item.city}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&lang=kr`
                        )
                        const jsonData = await response.json()
                        console.log(
                            jsonData.name,
                            jsonData.weather[0].description
                        )
                        setWeatherList((prevWeatherList) => [
                            ...prevWeatherList,
                            {
                                city: item.krName,
                                description: jsonData.weather[0].description,
                            },
                        ])
                    })
                )
            } catch (error) {
                console.error('Error fetching weather data:', error)
            }
        }
        weather()
    }, [])

    return (
        <div>
            {weatherList.length > 0 ? (
                //    weatherList.map((item) => (
                //         <p>
                //             {item.city} {item.description} |{weatherList.length}
                //         </p>
                //     ))
                <p>
                    {weatherList[0].city} {weatherList[0].description}
                </p>
            ) : (
                <p>현재 위치를 허용해주세요. </p>
            )}
        </div>
    )
}

export default Weather
