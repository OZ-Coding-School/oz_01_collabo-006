import Banner from '@/components/Banner/Banner'
import MainModal from '@/components/modals/MainModal'
import { Grid } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import React, { useState } from 'react'
import FilterNav from '../components/FilterNav'
import Places from '../components/Places'

function MainPage() {
    const [isModalOpen, setIsModalOpen] = useState(true)
    const [selectedDog, setSelectedDog] = useState(null)
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
                <FilterNav />
            </Grid>
            <Grid item xs={12}>
                <Places />
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
