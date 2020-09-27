import { Button, Grid, makeStyles } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import beautify from 'js-beautify/js/lib/beautify'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import GetAppIcon from '@material-ui/icons/GetApp'
import CodeIcon from '@material-ui/icons/Code'
import TransformIcon from '@material-ui/icons/Transform'

import React from 'react'

const useStyles = makeStyles(theme => {
    return {
        buttonBox: {
            height: '10rem',
            borderRadius: '0.5rem',
            border: `1px solid ${grey[500]}30`,
            marginTop: '0.5rem',
            padding: '1rem',
            boxShadow: theme.shadows[5],
            backgroundColor: 'rgb(250, 250, 250)'
        },
        darkThemeContainer: {
            backgroundColor: 'rgb(43, 43, 43)',
            boxShadow: `${theme.shadows[7]}`,
            color: 'white'
        },
        darkThemeButton: {
            borderColor: grey[500],
            color: 'white'
        }
    }
})

const ButtonBox = ({ jsonInput, setJsonInput, darkTheme }) => {
    const { buttonBox, darkThemeContainer, darkThemeButton } = useStyles()

    const parseAndSetInput = () => {
        setJsonInput(beautify.js_beautify(jsonInput, { indent_size: 4 }))
    }

    return (
        <Grid item container sm={12} className={[buttonBox, darkTheme && darkThemeContainer].join(' ')}>
            <Grid item xs={8}>
                <Button variant='outlined' className={darkTheme ? darkThemeButton : ''}>
                    Copy to clipboard
                </Button>
            </Grid>
            <Grid item container xs={6} md={4} xm={3} spacing={1} justify='space-around'>
                <Grid item xs={6}>
                    <Button
                        fullWidth
                        className={darkTheme ? darkThemeButton : ''}
                        onClick={() => parseAndSetInput()}
                        variant='outlined'
                        color='secondary'
                        startIcon={<FileCopyIcon />}>
                        Format
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button fullWidth className={darkTheme ? darkThemeButton : ''} variant='outlined' color='secondary' startIcon={<CodeIcon />}>
                        Minify
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button fullWidth className={darkTheme ? darkThemeButton : ''} variant='outlined' color='secondary' startIcon={<TransformIcon />}>
                        Convert
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button fullWidth className={darkTheme ? darkThemeButton : ''} variant='outlined' color='secondary' startIcon={<GetAppIcon />}>
                        Download
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button fullWidth className={darkTheme ? darkThemeButton : ''} variant='outlined' color='secondary' startIcon={<FileCopyIcon />}>
                        Copy
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button fullWidth className={darkTheme ? darkThemeButton : ''} variant='outlined' color='secondary' startIcon={<FileCopyIcon />}>
                        Visualise
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default ButtonBox
