import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import {
    FormControl,
    Grid,
    IconButton,
    InputBase,
    MenuItem,
    Paper,
    Select,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import React, { useEffect, useState } from 'react'
import dogsData from '../../public/images/dogs'
// import placesData from '../../public/images/places'
import instance from '../api/axios'
import useStore from '../store/mainModal'

const FilterNav = ({
    sortBy,
    setSortBy,
    filteredItems,
    setFilteredItems,
    filteredCity,
}) => {
    const [searchTerm, setSearchTerm] = useState('')
    const { selectedDog, setSelectedDog } = useStore() // 상태 및 액션 가져오기
    const theme = useTheme()
    const [selectedSortBy, setSelectedSortBy] = useState('')

    // 모달이랑 연결해준거
    const handleSelectDogChange = (event) => {
        const selectedDogId = event.target.value
        const selectedDog = dogsData.find((dog) => dog.id === selectedDogId)
        setSelectedDog(selectedDog)
    }

    //MUI관련해서 셀렉트랑 연결되어있는 값들
    const [provinces, setProvinces] = useState('')
    const [city, setCity] = useState([])
    const [facilityType, setFacilityType] = useState([])

    //시도
    const handleProvincesChange = (event) => {
        const selectedProvince = event.target.value
        setProvinces(selectedProvince)

        filteredCity((prevState) => ({
            ...prevState,
            province: selectedProvince,
        }))
        setCity('')
    }

    //시군구
    const handleCityChange = (event) => {
        const selectedCity = event.target.value
        setCity(selectedCity)
        filteredCity((prevState) => ({ ...prevState, city: selectedCity }))
    }

    //분류
    const handleFacilityTypeChange = (event) => {
        setFacilityType(event.target.value)
    }

    //정렬하는코드
    const handleSortByChange = (event) => {
        const selectedSortBy = event.target.value
        let sortedItems = [...filteredItems]

        if (selectedSortBy === 'popularity') {
            // 인기순으로 정렬
        }
        if (selectedSortBy === 'basic') {
            // 기본 아이디순으로 정렬 : 이미 아이디순으로 정렬중
        }

        setSelectedSortBy(selectedSortBy)
        setSortBy(selectedSortBy)
        setFilteredItems(sortedItems)
    }

    //검색하는 코드인데 다시설정해야할듯 먹통!
    // const handleSearch = () => {
    //     if (!place) return // place가 유효하지 않으면 함수 종료

    //     let filteredItems = place.filter((item) =>
    //         item.Place_Name.includes(searchTerm)
    //     )
    //     if (selectedSortBy === 'popularity') {
    //         // 인기순 정렬 로직 추가
    //     }
    //     if (selectedSortBy === 'basic') {
    //         filteredItems.sort((a, b) => a.id - b.id)
    //     }

    //     setFilteredItems(filteredItems)
    // }

    //인풋에 보여주기
    const handleChangeSearchTerm = (event) => {
        setSearchTerm(event.target.value)
    }
    // 데이터 받아오기
    const [items, setItems] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await instance.get(`/categories/places/`)
                setItems(response.data.dropdown_data)
                console.log('아이템', response.data.dropdown_data)
            } catch (error) {
                console.error('저쩌구에러', error)
            }
        }

        fetchData()
        // setItems(placesData)
    }, [])

    return (
        <Grid container columns={{ xs: 3, md: 3, lg: 3 }}>
            <Grid item xs={3} md={2} lg={2}>
                <Grid
                    container
                    spacing={2}
                    columns={{ xs: 10, md: 8, lg: 8 }}
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                    <Grid item xs={3} md={2.4} lg={2.4}>
                        <FormControl
                            sx={{
                                // marginRight: { xs: 1, md: 2, lg: 2 },
                                marginTop: 1,
                                marginBottom: 1,
                                marginLeft: 0,
                                marginRight: 0,
                                display: 'flex',
                                justifyContent: 'space-between',

                                // minWidth: 60,
                            }}
                            size="small"
                        >
                            <Grid
                                container
                                spacing={2}
                                columns={{ xs: 10, md: 8, lg: 8 }}
                            >
                                <Grid item xs={5} md={4} lg={4}>
                                    <Select
                                        sx={{
                                            fontSize: {
                                                lg: 16,
                                                md: 16,
                                                xs: 12,
                                            },
                                        }}
                                        value={provinces}
                                        onChange={handleProvincesChange}
                                        displayEmpty
                                        inputProps={{
                                            'aria-label': 'Without label',
                                        }}
                                        input={
                                            <InputBase
                                                sx={{ border: 'none' }}
                                            />
                                        }
                                    >
                                        <MenuItem value="">
                                            <p>시/도</p>
                                        </MenuItem>
                                        {items.provinces &&
                                            Object.keys(items.provinces).map(
                                                (province) => (
                                                    <MenuItem
                                                        key={province}
                                                        value={province}
                                                    >
                                                        {province}
                                                    </MenuItem>
                                                )
                                            )}
                                    </Select>
                                </Grid>
                                <Grid item xs={5} md={4} lg={4}>
                                    <Select
                                        sx={{
                                            fontSize: {
                                                lg: 16,
                                                md: 16,
                                                xs: 12,
                                            },
                                        }}
                                        value={city}
                                        onChange={handleCityChange}
                                        displayEmpty
                                        inputProps={{
                                            'aria-label': 'Without label',
                                        }}
                                        input={
                                            <InputBase
                                                sx={{ border: 'none' }}
                                            />
                                        }
                                    >
                                        <MenuItem value="">
                                            <p>시/군/구</p>
                                        </MenuItem>
                                        {provinces &&
                                            items.provinces[provinces]?.map(
                                                (city) => (
                                                    <MenuItem
                                                        key={`${provinces}-${city}`}
                                                        value={city}
                                                    >
                                                        {city}
                                                    </MenuItem>
                                                )
                                            )}
                                    </Select>
                                </Grid>
                            </Grid>
                        </FormControl>
                    </Grid>

                    <Grid item xs={2} md={1.6} lg={1.6}>
                        <FormControl
                            sx={{
                                marginTop: 1,
                                marginBottom: 1,
                                marginLeft: 0,
                                marginRight: 0,
                                // minWidth: 80,
                            }}
                            size="small"
                        >
                            <Select
                                sx={{ fontSize: { lg: 16, md: 16, xs: 12 } }}
                                value={facilityType}
                                onChange={handleFacilityTypeChange}
                                displayEmpty
                                inputProps={{
                                    'aria-label': 'Without label',
                                }}
                                input={<InputBase sx={{ border: 'none' }} />}
                            >
                                <MenuItem value="">
                                    <p>시설종류</p>
                                </MenuItem>
                                {items.categories &&
                                    items.categories.map((category) => (
                                        <MenuItem
                                            key={category}
                                            value={category}
                                        >
                                            {category}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={2} md={1.8} lg={1.8}>
                        <FormControl
                            sx={{
                                marginTop: 1,
                                marginBottom: 1,
                                marginLeft: 0,
                                marginRight: 0,
                                // minWidth: 90,
                            }}
                            size="small"
                        >
                            <Select
                                sx={{ fontSize: { lg: 16, md: 16, xs: 12 } }}
                                value={selectedDog ? selectedDog.id : ''}
                                onChange={handleSelectDogChange}
                                displayEmpty
                                inputProps={{
                                    'aria-label': 'Without label',
                                }}
                                input={<InputBase sx={{ border: 'none' }} />}
                            >
                                {/* <MenuItem value="">
                                    <p>반려견크기</p>
                                </MenuItem>
                                {uniqueDogSize.map((dog) => (
                                    <MenuItem key={dog.id} value={dog.id}>
                                        {dog.title}
                                    </MenuItem>
                                ))} */}

                                <MenuItem value="">
                                    <p>반려견크기</p>
                                </MenuItem>
                                {dogsData.map((dog) => (
                                    <MenuItem key={dog.id} value={dog.id}>
                                        {dog.title}
                                    </MenuItem>
                                ))}
                                <MenuItem>모두가능</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={2.5} md={1.9} lg={1.9}>
                        <FormControl
                            sx={{
                                marginTop: 1,
                                marginBottom: 1,
                                marginLeft: 0,
                                marginRight: 0,
                                // minWidth: 80,
                            }}
                            size="small"
                        >
                            <Select
                                sx={{ fontSize: { lg: 16, md: 16, xs: 12 } }}
                                value={sortBy}
                                onChange={handleSortByChange}
                                displayEmpty
                                inputProps={{
                                    'aria-label': 'Without label',
                                }}
                                input={<InputBase sx={{ border: 'none' }} />}
                            >
                                <MenuItem value="">
                                    <p>정렬기준</p>
                                </MenuItem>
                                <MenuItem value="popularity">인기순</MenuItem>
                                <MenuItem value="basic">기본순</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Grid>
            <Grid
                item
                xs={3}
                md={1}
                lg={1}
                // component="section"
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 1,
                }}
            >
                <Paper
                    component="form"
                    sx={{
                        p: '2px 4px',
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: '25px',
                        width: '100%',
                    }}
                    onSubmit={(e) => {
                        e.preventDefault() // 폼 제출 방지
                        handleSearch() // 검색 실행
                    }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        value={searchTerm}
                        onChange={handleChangeSearchTerm}
                        placeholder="검색해보세요!"
                        inputProps={{
                            'aria-label': '검색해보세요!',
                        }}
                    />
                    <IconButton
                        type="submit"
                        sx={{
                            p: '10px',
                            color: theme.palette.common.customYellow,
                        }}
                        aria-label="search"
                    >
                        <SearchRoundedIcon
                            style={{
                                fontSize: '21px', // 직접 픽셀 단위로 크기를 지정
                            }}
                        />
                    </IconButton>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default FilterNav

// import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
// import {
//     FormControl,
//     Grid,
//     IconButton,
//     InputBase,
//     MenuItem,
//     Paper,
//     Select,
// } from '@mui/material'
// import { useTheme } from '@mui/material/styles'
// import React, { useState } from 'react'
// import dogsData from '../../public/images/dogs'
// // import placesData from '../../public/images/places'
// import useStore from '../store/mainModal'

// const FilterNav = ({
//     sortBy,
//     setSortBy,
//     filteredItems,
//     setFilteredItems,
//     placesData,
// }) => {
//     const [searchTerm, setSearchTerm] = useState('')
//     const { selectedDog, setSelectedDog } = useStore() // 상태 및 액션 가져오기
//     const theme = useTheme()
//     const [selectedSortBy, setSelectedSortBy] = useState('')
//     const dropDown = placesData.dropdown_data || []

//     // 모달이랑 연결해준거
//     const handleSelectDogChange = (event) => {
//         const selectedDogId = event.target.value
//         const selectedDog = dogsData.find((dog) => dog.id === selectedDogId)
//         setSelectedDog(selectedDog)
//     }

//     //MUI관련해서 셀렉트랑 연결되어있는 값들
//     const [provinces, setProvinces] = useState('')
//     const [city, setCity] = useState([])
//     const [facilityType, setFacilityType] = useState([])

//     //시도
//     const handleProvincesChange = (event) => {
//         const selectedProvince = event.target.value
//         setProvinces(selectedProvince)

//         setCity('')
//     }

//     //시군구
//     const handleCityChange = (event) => {
//         setCity(event.target.value)
//     }

//     //분류
//     const handleFacilityTypeChange = (event) => {
//         setFacilityType(event.target.value)
//     }

//     //정렬하는코드
//     const handleSortByChange = (event) => {
//         const selectedSortBy = event.target.value
//         let sortedItems = [...filteredItems]

//         if (selectedSortBy === 'popularity') {
//             // 인기순으로 정렬
//         }
//         if (selectedSortBy === 'basic') {
//             // 거리순으로 정렬
//             sortedItems.sort((a, b) => a.id - b.id)
//         }

//         setSelectedSortBy(selectedSortBy)
//         setSortBy(selectedSortBy)
//         setFilteredItems(sortedItems)
//     }

//     //검색하는 코드인데 다시설정해야할듯 먹통!
//     // const handleSearch = () => {
//     //     if (!place) return // place가 유효하지 않으면 함수 종료

//     //     let filteredItems = place.filter((item) =>
//     //         item.Place_Name.includes(searchTerm)
//     //     )
//     //     if (selectedSortBy === 'popularity') {
//     //         // 인기순 정렬 로직 추가
//     //     }
//     //     if (selectedSortBy === 'basic') {
//     //         filteredItems.sort((a, b) => a.id - b.id)
//     //     }

//     //     setFilteredItems(filteredItems)
//     // }

//     //인풋에 보여주기
//     const handleChangeSearchTerm = (event) => {
//         setSearchTerm(event.target.value)
//     }

//     return (
//         <Grid container columns={{ xs: 3, md: 3, lg: 3 }}>
//             <Grid item xs={3} md={2} lg={2}>
//                 <Grid
//                     container
//                     spacing={2}
//                     columns={{ xs: 10, md: 8, lg: 8 }}
//                     style={{ display: 'flex', justifyContent: 'space-between' }}
//                 >
//                     <Grid item xs={3} md={2.4} lg={2.4}>
//                         <FormControl
//                             sx={{
//                                 // marginRight: { xs: 1, md: 2, lg: 2 },
//                                 marginTop: 1,
//                                 marginBottom: 1,
//                                 marginLeft: 0,
//                                 marginRight: 0,
//                                 display: 'flex',
//                                 justifyContent: 'space-between',

//                                 // minWidth: 60,
//                             }}
//                             size="small"
//                         >
//                             <Grid
//                                 container
//                                 spacing={2}
//                                 columns={{ xs: 10, md: 8, lg: 8 }}
//                             >
//                                 <Grid item xs={5} md={4} lg={4}>
//                                     <Select
//                                         sx={{
//                                             fontSize: {
//                                                 lg: 16,
//                                                 md: 16,
//                                                 xs: 12,
//                                             },
//                                         }}
//                                         value={provinces}
//                                         onChange={handleProvincesChange}
//                                         displayEmpty
//                                         inputProps={{
//                                             'aria-label': 'Without label',
//                                         }}
//                                         input={
//                                             <InputBase
//                                                 sx={{ border: 'none' }}
//                                             />
//                                         }
//                                     >
//                                         <MenuItem value="">
//                                             <p>시/도</p>
//                                         </MenuItem>
//                                         {dropDown.provinces &&
//                                             Object.keys(dropDown.provinces).map(
//                                                 (province) => (
//                                                     <MenuItem
//                                                         key={province}
//                                                         value={province}
//                                                     >
//                                                         {province}
//                                                     </MenuItem>
//                                                 )
//                                             )}
//                                     </Select>
//                                 </Grid>
//                                 <Grid item xs={5} md={4} lg={4}>
//                                     <Select
//                                         sx={{
//                                             fontSize: {
//                                                 lg: 16,
//                                                 md: 16,
//                                                 xs: 12,
//                                             },
//                                         }}
//                                         value={city}
//                                         onChange={handleCityChange}
//                                         displayEmpty
//                                         inputProps={{
//                                             'aria-label': 'Without label',
//                                         }}
//                                         input={
//                                             <InputBase
//                                                 sx={{ border: 'none' }}
//                                             />
//                                         }
//                                     >
//                                         <MenuItem value="">
//                                             <p>시/군/구</p>
//                                         </MenuItem>
//                                         {provinces &&
//                                             dropDown.provinces[provinces]?.map(
//                                                 (city) => (
//                                                     <MenuItem
//                                                         key={`${provinces}-${city}`}
//                                                         value={city}
//                                                     >
//                                                         {city}
//                                                     </MenuItem>
//                                                 )
//                                             )}
//                                     </Select>
//                                 </Grid>
//                             </Grid>
//                         </FormControl>
//                     </Grid>

//                     <Grid item xs={2} md={1.6} lg={1.6}>
//                         <FormControl
//                             sx={{
//                                 marginTop: 1,
//                                 marginBottom: 1,
//                                 marginLeft: 0,
//                                 marginRight: 0,
//                                 // minWidth: 80,
//                             }}
//                             size="small"
//                         >
//                             <Select
//                                 sx={{ fontSize: { lg: 16, md: 16, xs: 12 } }}
//                                 value={facilityType}
//                                 onChange={handleFacilityTypeChange}
//                                 displayEmpty
//                                 inputProps={{
//                                     'aria-label': 'Without label',
//                                 }}
//                                 input={<InputBase sx={{ border: 'none' }} />}
//                             >
//                                 <MenuItem value="">
//                                     <p>시설종류</p>
//                                 </MenuItem>
//                                 {dropDown.categories &&
//                                     dropDown.categories.map((category) => (
//                                         <MenuItem
//                                             key={category}
//                                             value={category}
//                                         >
//                                             {category}
//                                         </MenuItem>
//                                     ))}
//                             </Select>
//                         </FormControl>
//                     </Grid>
//                     <Grid item xs={2} md={1.8} lg={1.8}>
//                         <FormControl
//                             sx={{
//                                 marginTop: 1,
//                                 marginBottom: 1,
//                                 marginLeft: 0,
//                                 marginRight: 0,
//                                 // minWidth: 90,
//                             }}
//                             size="small"
//                         >
//                             <Select
//                                 sx={{ fontSize: { lg: 16, md: 16, xs: 12 } }}
//                                 value={selectedDog ? selectedDog.id : ''}
//                                 onChange={handleSelectDogChange}
//                                 displayEmpty
//                                 inputProps={{
//                                     'aria-label': 'Without label',
//                                 }}
//                                 input={<InputBase sx={{ border: 'none' }} />}
//                             >
//                                 {/* <MenuItem value="">
//                                     <p>반려견크기</p>
//                                 </MenuItem>
//                                 {uniqueDogSize.map((dog) => (
//                                     <MenuItem key={dog.id} value={dog.id}>
//                                         {dog.title}
//                                     </MenuItem>
//                                 ))} */}

//                                 <MenuItem value="">
//                                     <p>반려견크기</p>
//                                 </MenuItem>
//                                 {dogsData.map((dog) => (
//                                     <MenuItem key={dog.id} value={dog.id}>
//                                         {dog.title}
//                                     </MenuItem>
//                                 ))}
//                                 <MenuItem>모두가능</MenuItem>
//                             </Select>
//                         </FormControl>
//                     </Grid>
//                     <Grid item xs={2.5} md={1.9} lg={1.9}>
//                         <FormControl
//                             sx={{
//                                 marginTop: 1,
//                                 marginBottom: 1,
//                                 marginLeft: 0,
//                                 marginRight: 0,
//                                 // minWidth: 80,
//                             }}
//                             size="small"
//                         >
//                             <Select
//                                 sx={{ fontSize: { lg: 16, md: 16, xs: 12 } }}
//                                 value={sortBy}
//                                 onChange={handleSortByChange}
//                                 displayEmpty
//                                 inputProps={{
//                                     'aria-label': 'Without label',
//                                 }}
//                                 input={<InputBase sx={{ border: 'none' }} />}
//                             >
//                                 <MenuItem value="">
//                                     <p>정렬기준</p>
//                                 </MenuItem>
//                                 <MenuItem value="popularity">인기순</MenuItem>
//                                 <MenuItem value="basic">기본순</MenuItem>
//                             </Select>
//                         </FormControl>
//                     </Grid>
//                 </Grid>
//             </Grid>
//             <Grid
//                 item
//                 xs={3}
//                 md={1}
//                 lg={1}
//                 // component="section"
//                 sx={{
//                     display: 'flex',
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     gap: 1,
//                 }}
//             >
//                 <Paper
//                     component="form"
//                     sx={{
//                         p: '2px 4px',
//                         display: 'flex',
//                         alignItems: 'center',
//                         borderRadius: '25px',
//                         width: '100%',
//                     }}
//                     onSubmit={(e) => {
//                         e.preventDefault() // 폼 제출 방지
//                         handleSearch() // 검색 실행
//                     }}
//                 >
//                     <InputBase
//                         sx={{ ml: 1, flex: 1 }}
//                         value={searchTerm}
//                         onChange={handleChangeSearchTerm}
//                         placeholder="검색해보세요!"
//                         inputProps={{
//                             'aria-label': '검색해보세요!',
//                         }}
//                     />
//                     <IconButton
//                         type="submit"
//                         sx={{
//                             p: '10px',
//                             color: theme.palette.common.customYellow,
//                         }}
//                         aria-label="search"
//                     >
//                         <SearchRoundedIcon
//                             style={{
//                                 fontSize: '21px', // 직접 픽셀 단위로 크기를 지정
//                             }}
//                         />
//                     </IconButton>
//                 </Paper>
//             </Grid>
//         </Grid>
//     )
// }

// export default FilterNav
