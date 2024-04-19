import Banner from '@/components/Banner/Banner'
import MainModal from '@/components/modals/MainModal'
import { Container } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import React, { useState } from 'react'
import FilterNav from '../components/FilterNav'
import Places from '../components/Places'

const theme = createTheme({
    palette: {
        common: {
            customWhite: '#ffffff',
            customYellow: '#ffc145',
            customRed: '#ff6b6c',
            customPurple: '#b8b8d1',
            customBlack: '#48495c',
            customGray: '#a7a7a7',
        },
    },
})

function MainPage() {
    const [isModalOpen, setIsModalOpen] = useState(true)
    const [selectedDog, setSelectedDog] = useState(null)

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

    const handleDogSelect = (dog) => {
        setSelectedDog(dog)
    }

    return (
        <ThemeProvider theme={theme}>
            <Container
                maxWidth="md"
                sx={{
                    fontSize: {
                        xs: theme.spacing(1.5), // 모바일
                        md: theme.spacing(1.7), // 태블릿
                        lg: theme.spacing(2), // 데스크톱
                    },
                }}
            >
                <Banner />
                <FilterNav />
                <Places />
                <MainModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onSelectDog={handleDogSelect}
                    selectedDog={selectedDog}
                />
            </Container>
        </ThemeProvider>
    )
}

export default MainPage

// import Banner from '@/components/Banner/Banner'
// import MainModal from '@/components/modals/MainModal'
// import { Container } from '@mui/material'
// import { ThemeProvider, createTheme } from '@mui/material/styles'
// import FilterNav from '../components/FilterNav'
// import Places from '../components/Places'

// const theme = createTheme({
//     palette: {
//         common: {
//             customWhite: '#ffffff',
//             customYellow: '#ffc145',
//             customRed: '#ff6b6c',
//             customPurple: '#b8b8d1',
//             customBlack: '#48495c',
//             customGray: '#a7a7a7',
//         },
//     },
// })

// // function MyComponent() {
// //     const theme = useTheme();

// function MainPage() {
//     return (
//         <ThemeProvider theme={theme}>
//             <Container
//                 maxWidth="md"
//                 sx={{
//                     fontSize: {
//                         xs: theme.spacing(1.5), // 모바일
//                         md: theme.spacing(1.7), // 태블릿
//                         lg: theme.spacing(2), // 데스크톱
//                     },
//                 }}
//             >
//                 <Banner />
//                 <FilterNav />
//                 <Places />
//                 <MainModal />
//             </Container>
//         </ThemeProvider>
//     )
// }

// export default MainPage
