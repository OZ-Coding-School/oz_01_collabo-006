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
                />
            </Grid>
            <Grid item xs={12}>
                <Places sortBy={sortBy} filteredItems={filteredItems} />
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
