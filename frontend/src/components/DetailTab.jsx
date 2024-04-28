import { Box, Tab, Tabs, Typography, useTheme } from '@mui/material'
import PropTypes from 'prop-types'
import * as React from 'react'
import Review from './Review'

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

const DetailTab = ({ place }) => {
    const theme = useTheme()
    const [value, setValue] = React.useState(0)
    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                        textColor="customYellow"
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
                    <Review place={place} />
                </CustomTabPanel>
            </Box>
        </>
    )
}

export default DetailTab
