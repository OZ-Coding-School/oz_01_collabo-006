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
        province: '',
        city: '',
        category2: '',
        dog_size: '',
        search: '',
    })

    const theme = useTheme()

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

    const handleDogSelect = (dog) => {
        setSelectedDog(dog)
    }

    const handleFilterChange = (filter) => {
        setFilteredItems(filter)
    }

    return (
        <Grid container maxWidth="md" spacing={1.8}>
            <Grid item xs={12}>
                <Banner />
            </Grid>
            <Grid item xs={12}>
                <FilterNav
                    onFilterChange={handleFilterChange}
                    filteredItems={filteredItems}
                />
            </Grid>
            <Grid item xs={12}>
                <Places filteredItems={filteredItems} />
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
