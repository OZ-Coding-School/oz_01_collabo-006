import Banner from '@/components/Banner/Banner'
import MainModal from '@/components/modals/MainModal'
import { Container } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import FilterNav from '../components/FilterNav'
import Places from '../components/Places'

// function MyComponent() {
//     const theme = useTheme();

function MainPage() {
    return (
        <>
            <Banner />
            <FilterNav />
            <Places />
            <MainModal />
        </>
    )
}

export default MainPage
