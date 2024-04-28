import Banner from '@/components/Banner/Banner'
import MainModal from '@/components/modals/MainModal'
import { Grid, useTheme } from '@mui/material'
import React, { useState } from 'react'
import FilterNav from '../components/FilterNav'
import Places from '../components/Places'

function MainPage() {
    const [isModalOpen, setIsModalOpen] = useState(true)
    const [selectedDog, setSelectedDog] = useState(null)
    const [sortBy, setSortBy] = useState('')
    const [filteredItems, setFilteredItems] = useState({
        facilityType: '',
    })
    const [filteredCity, setFilteredCityItems] = useState({
        province: '',
        city: '',
    })
    const theme = useTheme()

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

    const handleDogSelect = (dog) => {
        setSelectedDog(dog)
    }

    return (
        <Grid container maxWidth="md" spacing={1.8}>
            <Grid item xs={12}>
                <Banner />
            </Grid>
            <Grid item xs={12}>
                <FilterNav
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    setFilteredItems={setFilteredItems}
                    filteredItems={filteredItems}
                    filteredCity={filteredCity}
                />
            </Grid>
            <Grid item xs={12}>
                <Places
                    sortBy={sortBy}
                    filteredCity={filteredCity}
                    filteredItems={filteredItems}
                />
            </Grid>
            <Grid item xs={12}>
                <MainModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onSelectDog={handleDogSelect}
                    selectedDog={selectedDog}
                />
            </Grid>
        </Grid>
    )
}

export default MainPage

// import Banner from '@/components/Banner/Banner'
// import MainModal from '@/components/modals/MainModal'
// import { Grid } from '@mui/material'
// import { useTheme } from '@mui/material/styles'
// import React, { useEffect, useState } from 'react'
// import instance from '../api/axios'
// import FilterNav from '../components/FilterNav'
// import Places from '../components/Places'

// function MainPage() {
//     const [placesData, setPlacesData] = useState([])
//     const [isModalOpen, setIsModalOpen] = useState(true)
//     const [selectedDog, setSelectedDog] = useState(null)
//     const [sortBy, setSortBy] = useState('')
//     const [filteredItems, setFilteredItems] = useState([])
//     const theme = useTheme()

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await instance.get(`/categories/places/`)
//                 setPlacesData(response.data)
//                 console.log('아이템', response.data)
//             } catch (error) {
//                 console.error('저쩌구에러', error)
//             }
//         }
//         fetchData()
//     }, [])

//     const handleCloseModal = () => {
//         setIsModalOpen(false)
//     }

//     const handleDogSelect = (dog) => {
//         setSelectedDog(dog)
//     }

//     return (
//         <Grid container maxWidth="md" spacing={1.8}>
//             <Grid item xs={12}>
//                 <Banner />
//             </Grid>
//             <Grid item xs={12}>
//                 <FilterNav
//                     sortBy={sortBy}
//                     setSortBy={setSortBy}
//                     setFilteredItems={setFilteredItems}
//                     filteredItems={filteredItems}
//                     placesData={placesData}
//                 />
//             </Grid>
//             <Grid item xs={12}>
//                 <Places
//                     sortBy={sortBy}
//                     filteredItems={filteredItems}
//                     placesData={placesData}
//                 />
//             </Grid>
//             <Grid item xs={12}>
//                 <MainModal
//                     isOpen={isModalOpen}
//                     onClose={handleCloseModal}
//                     onSelectDog={handleDogSelect}
//                     selectedDog={selectedDog}
//                 />
//             </Grid>
//         </Grid>
//     )
// }

// export default MainPage
