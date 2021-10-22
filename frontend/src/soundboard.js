import * as React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'

const config = require('./config.js');


var referrer = window.location.href;
var api = `http://${config["api_host"]}:${config["api_port"]}`;

function createButtonData(label, link) {
  return { label, link };
}

const rows = [
    createButtonData('horn', '/api/sound?name=horn')
]

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  textColor: '#FFFFFF',
  backgroundColor: '#0720F0',
}));

export default function SoundsInterface() {
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
