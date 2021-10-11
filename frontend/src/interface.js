import * as React from 'react'
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views';
import ScenesInterface from './scenes.js'
import Link from '@mui/material/Link'


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div 
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            {...other}
        >
        {value === index && (
            <Box sx={{ p: 3 }}>
                {children}
            </Box>

        )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function ItsATabPanel() {
    const theme = useTheme();
    const [ value, setValue] = React.useState(0);
    return (
        <div>
        <TabPanel value={value} index={0} dir={theme.direction}>
            <ScenesInterface />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>     
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>       
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
        </TabPanel>
        </div>
    )
}

function ItsATab() {
    const theme = useTheme();
    const [ value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
    <div>
        <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs"
        >
            <Tab label="Scenes" id='full-width-tab-0' aria-controls='full-width-tabpanel-0' />
            <Tab label="Soundboard" id='full-width-tab-1' aria-controls='full-width-tabpanel-1' />
            <Tab label="Future Feature" id='full-width-tab-2' aria-controls='full-width-tabpanel-2' />
            <Tab label="Future Feature" id='full-width-tab-3' aria-controls='full-width-tabpanel-3' />
        </Tabs>
        <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
        >       
        </SwipeableViews>
    </div>
    )
}

export default function AdmiralAppBar() {
    return (
        <Box sx={{ bgcolor: 'background.paper', width: '100%' }}>
            <AppBar position="static">
                <ItsATab />
            </AppBar>
            <ItsATabPanel />
        </Box>
    )
}