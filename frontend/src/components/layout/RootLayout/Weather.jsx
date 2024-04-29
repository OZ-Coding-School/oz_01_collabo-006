import React, { useEffect, useState } from 'react'

const cities = [
    { city: 'Seoul', krName: '서울' },
    { city: 'Sejong', krName: '세종' },
    { city: 'Daejeon', krName: '대전' },
    { city: 'Daegu', krName: '대구' },
    { city: 'Gwangju', krName: '광주' },
    { city: 'Changwon', krName: '창원' },
    { city: 'Busan', krName: '부산' },
    { city: 'Ulsan', krName: '울산' },
    { city: 'Jeju', krName: '제주' },
    // { city: 'Gyeonggi', krName: '경기' },
    // { city: 'Incheon', krName: '인천' },
    // { city: 'Gangwon', krName: '강원' },
    // { city: 'Chungnam', krName: '충남' },
    // { city: 'Chungbuk', krName: '충북' },
    // { city: 'Gyeongbuk', krName: '경북' },
    // { city: 'Jeonbuk', krName: '전북' },
    // { city: 'Jeonnam', krName: '전남' },
]

function useIndexIncrement(interval, array) {
    const [index, setIndex] = useState(0)
    useEffect(() => {
        if (array.length === 0) return
        const intervalId = setInterval(() => {
            setIndex((prevIndex) => {
                const maxLength = array.length
                let nextIndex = prevIndex + 1
                if (nextIndex > maxLength - 1) nextIndex = 0
                return nextIndex
            })
        }, interval)

        return () => clearInterval(intervalId)
    }, [interval, array])

    return {
        index,
    }
}

const Weather = () => {
    const [weatherList, setWeatherList] = useState([])
    const { index } = useIndexIncrement(3000, weatherList)

    useEffect(() => {
        async function weather() {
            try {
                const nextWeatherList = []
                await Promise.all(
                    cities.map(async (item) => {
                        const response = await fetch(
                            `https://api.openweathermap.org/data/2.5/weather?q=${item.city}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&lang=kr`
                        )
                        const jsonData = await response.json()
                        if (jsonData.cod === 200)
                            nextWeatherList.push({
                                city: item.krName,
                                description: jsonData.weather[0].description,
                            })
                    })
                )
                setWeatherList(nextWeatherList)
            } catch (error) {
                console.error('Error fetching weather data:', error)
            }
        }
        weather()
    }, [])

    if (weatherList.length === 0 && index === -1) return <div>Loading... </div>

    return (
        <div>
            <p>
                {weatherList[index]?.city} {weatherList[index]?.description}
            </p>
        </div>
    )
}

export default Weather
