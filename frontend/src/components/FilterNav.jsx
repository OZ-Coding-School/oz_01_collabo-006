import { FormControl, InputBase, MenuItem, Select } from '@mui/material'
import React from 'react'
import dogsData from '../../public/images/dogs' // dogsData import 추가
import useStore from './store' // store import 추가

const FilterNav = () => {
    const { selectedDog, setSelectedDog } = useStore() // 상태 및 액션 가져오기

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
                    value={selectedDog ? selectedDog.id : ''}
                    onChange={handleSelectDogChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
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
        </>
    )
}

export default FilterNav

// import FormControl from '@mui/material/FormControl'
// import InputBase from '@mui/material/InputBase'
// import MenuItem from '@mui/material/MenuItem'
// import Select from '@mui/material/Select'
// import * as React from 'react'

// const FilterNav = () => {
//     const [trial, setTrial] = React.useState('')
//     const [city, setCity] = React.useState('')
//     const [facilityType, setFacilityType] = React.useState('')
//     const [sortBy, setSortBy] = React.useState('')
//     const [selectDog, setSelectDog] = React.useState('')

//     const handleTrialChange = (event) => {
//         setTrial(event.target.value)
//     }
//     const handleCityChange = (event) => {
//         setCity(event.target.value)
//     }
//     const handleFacilityTypeChange = (event) => {
//         setFacilityType(event.target.value)
//     }
//     const handleSortByChange = (event) => {
//         setSortBy(event.target.value)
//     }
//     const handleSelectDogChange = (event) => {
//         setSelectDog(event.target.value)
//     }

//     return (
//         <>
//             <FormControl sx={{ m: 1, minWidth: 60 }} size="small">
//                 <Select
//                     value={trial}
//                     onChange={handleTrialChange}
//                     displayEmpty
//                     inputProps={{ 'aria-label': 'Without label' }}
//                     input={<InputBase sx={{ border: 'none' }} />}
//                 >
//                     <MenuItem value="">
//                         <p>시/도</p>
//                     </MenuItem>
//                     <MenuItem value={10}>들어오것지</MenuItem>
//                 </Select>
//             </FormControl>

//             <FormControl sx={{ m: 1, minWidth: 80 }} size="small">
//                 <Select
//                     value={city}
//                     onChange={handleCityChange}
//                     displayEmpty
//                     inputProps={{ 'aria-label': 'Without label' }}
//                     input={<InputBase sx={{ border: 'none' }} />}
//                 >
//                     <MenuItem value="">
//                         <p>시/군/구</p>
//                     </MenuItem>
//                     <MenuItem value={10}>들어오것지</MenuItem>
//                 </Select>
//             </FormControl>
//             <FormControl sx={{ m: 1, minWidth: 80 }} size="small">
//                 <Select
//                     value={facilityType}
//                     onChange={handleFacilityTypeChange}
//                     displayEmpty
//                     inputProps={{ 'aria-label': 'Without label' }}
//                     input={<InputBase sx={{ border: 'none' }} />}
//                 >
//                     <MenuItem value="">
//                         <p>시설종류</p>
//                     </MenuItem>
//                     <MenuItem value={10}>들어오것지</MenuItem>
//                 </Select>
//             </FormControl>
//             <FormControl sx={{ m: 1, minWidth: 80 }} size="small">
//                 <Select
//                     value={sortBy}
//                     onChange={handleSortByChange}
//                     displayEmpty
//                     inputProps={{ 'aria-label': 'Without label' }}
//                     input={<InputBase sx={{ border: 'none' }} />}
//                 >
//                     <MenuItem value="">
//                         <p>정렬기준</p>
//                     </MenuItem>
//                     <MenuItem value={10}>들어오것지</MenuItem>
//                 </Select>
//             </FormControl>
//             <FormControl sx={{ m: 1, minWidth: 90 }} size="small">
//                 <Select
//                     value={selectDog}
//                     onChange={handleSelectDogChange}
//                     displayEmpty
//                     inputProps={{ 'aria-label': 'Without label' }}
//                     input={<InputBase sx={{ border: 'none' }} />}
//                 >
//                     <MenuItem value="">
//                         <p>반려견크기</p>
//                     </MenuItem>
//                     <MenuItem value={10}>소형견</MenuItem>
//                     <MenuItem value={20}>중형견</MenuItem>
//                     <MenuItem value={30}>대형견</MenuItem>
//                     <MenuItem value={40}>맹견</MenuItem>
//                 </Select>
//             </FormControl>
//         </>
//     )
// }

// export default FilterNav
