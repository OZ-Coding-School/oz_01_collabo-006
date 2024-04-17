import FormControl from '@mui/material/FormControl'
import InputBase from '@mui/material/InputBase'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import * as React from 'react'

const FilterNav = () => {
    const [trial, setTrial] = React.useState('')
    const [city, setCity] = React.useState('')
    const [facilityType, setFacilityType] = React.useState('')
    const [sortBy, setSortBy] = React.useState('')
    const [selectDog, setSelectDog] = React.useState('')

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
    const handleSelectDogChange = (event) => {
        setSelectDog(event.target.value)
    }

    return (
        <>
            <FormControl sx={{ m: 1, minWidth: 60 }} size="small">
                <Select
                    value={trial}
                    onChange={handleTrialChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    input={<InputBase sx={{ border: 'none' }} />}
                >
                    <MenuItem value="">
                        <p>시/도</p>
                    </MenuItem>
                    <MenuItem value={10}>들어오것지</MenuItem>
                </Select>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 80 }} size="small">
                <Select
                    value={city}
                    onChange={handleCityChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    input={<InputBase sx={{ border: 'none' }} />}
                >
                    <MenuItem value="">
                        <p>시/군/구</p>
                    </MenuItem>
                    <MenuItem value={10}>들어오것지</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 80 }} size="small">
                <Select
                    value={facilityType}
                    onChange={handleFacilityTypeChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    input={<InputBase sx={{ border: 'none' }} />}
                >
                    <MenuItem value="">
                        <p>시설종류</p>
                    </MenuItem>
                    <MenuItem value={10}>들어오것지</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 80 }} size="small">
                <Select
                    value={sortBy}
                    onChange={handleSortByChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    input={<InputBase sx={{ border: 'none' }} />}
                >
                    <MenuItem value="">
                        <p>정렬기준</p>
                    </MenuItem>
                    <MenuItem value={10}>들어오것지</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 90 }} size="small">
                <Select
                    value={selectDog}
                    onChange={handleSelectDogChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    input={<InputBase sx={{ border: 'none' }} />}
                >
                    <MenuItem value="">
                        <p>반려견크기</p>
                    </MenuItem>
                    <MenuItem value={10}>들어오것지</MenuItem>
                </Select>
            </FormControl>
        </>
    )
}

export default FilterNav
