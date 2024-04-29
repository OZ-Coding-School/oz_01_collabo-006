import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import {
    FormControl,
    Grid,
    IconButton,
    InputBase,
    MenuItem,
    Paper,
    Select,
    useTheme,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import dogsData from '../../public/images/dogs'
import instance from '../api/axios'
import useStore from '../store/mainModal'

const FilterNav = ({ onFilterChange }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const { selectedDog, setSelectedDog } = useStore() // 상태 및 액션 가져오기
    const theme = useTheme()

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
        setCity('')
        const filters = {
            province: selectedProvince,
            city: '',
            category2: '',
            dog_size: '',
            search: searchTerm,
        }
        onFilterChange(filters)
    }

    //시군구
    const handleCityChange = (event) => {
        const selectedCity = event.target.value
        setCity(selectedCity)
    }

    //분류
    const handleFacilityTypeChange = (event) => {
        setFacilityType(event.target.value)
    }
    const handleSearch = () => {
        // 검색 기능 코드
        // 검색어(searchTerm)를 filteredItems에 추가
        const updatedFilters = { ...filteredItems, search: searchTerm }
        onFilterChange(updatedFilters) // 필터 업데이트
    }

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
                // console.log('아이템', response.data.dropdown_data)
            } catch (error) {
                console.error('저쩌구에러', error)
            }
        }

        fetchData()
    }, [])

    return (
        <Grid container columns={{ xs: 3, md: 3, lg: 3 }}>
            <Grid item xs={3} md={2} lg={2}>
                <Grid
                    container
                    spacing={2}
                    columns={{ xs: 4, md: 4, lg: 4 }}
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                    <Grid item xs={1} md={1} lg={1}>
                        <FormControl
                            sx={{
                                marginTop: 1,
                                marginBottom: 1,
                                marginLeft: 0,
                                marginRight: 0,
                            }}
                            size="small"
                        >
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
                                input={<InputBase sx={{ border: 'none' }} />}
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
                        </FormControl>
                    </Grid>

                    <Grid item xs={1} md={1} lg={1}>
                        <FormControl
                            sx={{
                                marginTop: 1,
                                marginBottom: 1,
                                marginLeft: 0,
                                marginRight: 0,
                            }}
                            size="small"
                        >
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
                                input={<InputBase sx={{ border: 'none' }} />}
                            >
                                <MenuItem value="">
                                    <p>시/군/구</p>
                                </MenuItem>
                                {provinces &&
                                    items.provinces[provinces]?.map((city) => (
                                        <MenuItem
                                            key={`${provinces}-${city}`}
                                            value={city}
                                        >
                                            {city}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={1} md={1} lg={1}>
                        <FormControl
                            sx={{
                                marginTop: 1,
                                marginBottom: 1,
                                marginLeft: 0,
                                marginRight: 0,
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
                    <Grid item xs={1} md={1} lg={1}>
                        <FormControl
                            sx={{
                                marginTop: 1,
                                marginBottom: 1,
                                marginLeft: 0,
                                marginRight: 0,
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
                                <MenuItem value="">
                                    <p>반려견크기</p>
                                </MenuItem>
                                {dogsData.map((dog) => (
                                    <MenuItem key={dog.id} value={dog.id}>
                                        {dog.title}
                                    </MenuItem>
                                ))}
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
                        e.preventDefault()
                        handleSearch()
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
                                fontSize: '21px',
                            }}
                        />
                    </IconButton>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default FilterNav
