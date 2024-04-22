import { Box, Paper, Tab, Tabs, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { ThemeProvider } from '@mui/material/styles'
import PropTypes from 'prop-types'
import * as React from 'react'
import { useParams } from 'react-router-dom'
import theme from '../theme'

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    )
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
}

function DetailPage() {
    const id = useParams()
    console.log(id.id)

    const [value, setValue] = React.useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    return (
        <>
            <ThemeProvider theme={theme}>
                <Grid
                    container
                    spacing={{ xs: 2, md: 3, lg: 3 }}
                    columns={{ xs: 12, md: 12, lg: 12 }}
                >
                    <Grid item xs={12} md={12} lg={6}>
                        <Paper>xs=8</Paper>
                    </Grid>
                    <Grid item xs={12} md={12} lg={6}>
                        <Grid container spacing={{ xs: 2, md: 3, lg: 3 }}>
                            <Grid item xs={6} md={6} lg={3}>
                                <Paper>xs=4</Paper>
                            </Grid>
                            <Grid item xs={6} md={6} lg={3}>
                                <Paper>xs=4</Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label="basic tabs example"
                            sx={{
                                '& .Mui-selected': {
                                    color: theme.palette.common.customYellow,
                                },
                                '& .MuiTabs-indicator': {
                                    backgroundColor:
                                        theme.palette.common.customYellow,
                                },
                            }}
                        >
                            <Tab label="지도" {...a11yProps(0)} />
                            <Tab label="리뷰" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        지도뿌려
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        리뷰뿌려
                    </CustomTabPanel>
                </Box>
            </ThemeProvider>
        </>
    )
}

export default DetailPage
