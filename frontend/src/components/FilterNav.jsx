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
import React from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { IoSearch } from 'react-icons/io5'
import dogsData from '../../public/images/dogs' // dogsData import 추가
import useStore from '../store/mainModal' // store import 추가

const FilterNav = () => {
    const { selectedDog, setSelectedDog } = useStore() // 상태 및 액션 가져오기
    const theme = useTheme()
    // 라디오 버튼과 셀렉트 박스의 값을 동시에 업데이트하는 함수
    const handleSelectDogChange = (event) => {
        const selectedDogId = event.target.value
        const selectedDog = dogsData.find((dog) => dog.id === selectedDogId)
        setSelectedDog(selectedDog)
    }

    const [trial, setTrial] = React.useState('')
    const [city, setCity] = React.useState('')
    const [facilityType, setFacilityType] = React.useState('')
    const [sortBy, setSortBy] = React.useState('')

    const handleTrialChange = (event) => {
        setTrial(event.target.value)
    }
    const handleCityChange = (event) => {
        setCity(event.target.value)
    }
    const handleFacilityTypeChange = (event) => {
        setFacilityType(event.target.value)
    }
    const handleSortByChange = (event) => {
        setSortBy(event.target.value)
    }

    return (
        <Grid
            container
            // spacing={{ xs: 2, md: 3, lg: 3 }}
            columns={{ xs: 3, md: 3, lg: 3 }}
        >
            <Grid item xs={3} md={2} lg={2}>
                <FormControl
                    sx={{
                        marginRight: { xs: 1, md: 2, lg: 2 },
                        marginTop: 1,
                        marginBottom: 1,
                        minWidth: 60,
                    }}
                    size="small"
                >
                    <Select
                        value={trial}
                        onChange={handleTrialChange}
                        displayEmpty
                        inputProps={{
                            'aria-label': 'Without label',
                        }}
                        input={<InputBase sx={{ border: 'none' }} />}
                    >
                        <MenuItem value="">
                            <p>시/도</p>
                        </MenuItem>
                        <MenuItem value={10}>들어오것지</MenuItem>
                    </Select>
                </FormControl>

                <FormControl
                    sx={{
                        marginRight: { xs: 0.5, md: 2, lg: 2 },
                        minWidth: 80,
                        marginTop: 1,
                        marginBottom: 1,
                    }}
                    size="small"
                >
                    <Select
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
                        <MenuItem value={10}>들어오것지</MenuItem>
                    </Select>
                </FormControl>
                <FormControl
                    sx={{
                        marginRight: { xs: 0.5, md: 2, lg: 2 },
                        minWidth: 80,
                        marginTop: 1,
                        marginBottom: 1,
                    }}
                    size="small"
                >
                    <Select
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
                        <MenuItem value={10}>들어오것지</MenuItem>
                    </Select>
                </FormControl>
                <FormControl
                    sx={{
                        marginRight: { xs: 0.5, md: 2, lg: 2 },
                        minWidth: 90,
                        marginTop: 1,
                        marginBottom: 1,
                    }}
                    size="small"
                >
                    <Select
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
                <FormControl
                    sx={{
                        marginRight: { xs: 0.5, md: 2, lg: 2 },
                        minWidth: 80,
                        marginTop: 1,
                        marginBottom: 1,
                    }}
                    size="small"
                >
                    <Select
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
                        <MenuItem value={10}>인기순</MenuItem>
                        <MenuItem value={20}>거리순</MenuItem>
                    </Select>
                </FormControl>
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
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="검색해보세요!"
                        inputProps={{
                            'aria-label': '검색해보세요!',
                        }}
                    />
                    <IconButton
                        type="button"
                        sx={{
                            p: '10px',
                            color: theme.palette.common.customYellow,
                        }}
                        aria-label="search"
                    >
                        <IoSearch
                            style={{
                                fontSize: '21px', // 직접 픽셀 단위로 크기를 지정
                            }}
                        />
                    </IconButton>
                </Paper>
                <IconButton
                    color="primary"
                    sx={{ p: '10px', color: theme.palette.common.customYellow }}
                    aria-label="directions"
                >
                    <FaMapMarkerAlt
                        style={{
                            fontSize: '21px', // 직접 픽셀 단위로 크기를 지정
                        }}
                    />
                </IconButton>
            </Grid>
        </Grid>
    )
}

export default FilterNav
