import * as React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'

var referrer = window.location.href;
var api = 'http://localhost:5000';

function createButtonData(label, link) {
  return { label, link };
}

const rows = [
    createButtonData('Starting Soon', '/api/?call=SetCurrentScene&scene-name=Starting Soon'),
    createButtonData('Left Monitor w/ Lower-Left Camera', '/api/?call=SetCurrentScene&scene-name=Left Monitor w%2F Lower-Left Camera'),
    createButtonData('Left Monitor w/ Lower-Right Camera', '/api/?call=SetCurrentScene&scene-name=Left Monitor w%2F Lower-Right Camera'),
    createButtonData('Outro', '/api/?call=SetCurrentScene&scene-name=Outro'),
    createButtonData('horn', '/api/sounds?name=horn')
]

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  textColor: '#FFFFFF',
  backgroundColor: '#0720F0',
}));

export default function ScenesInterface() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                {rows.map((row) => (
                    <Grid item 
                    xs='auto'
                    sm='auto'
                    md='auto'
                    lg='auto'
                    xl='auto'
                    >
                        <Item>
                            <Link
                            variant='body2'
                            underline='none'
                            href={api+row.link+"&ref="+referrer}
                            >
                                {row.label}
                            </Link>
                        </Item>
            </Grid>
            ))}
            </Grid>
        </Box>
    );
}
