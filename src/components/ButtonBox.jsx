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

    const buttons = [
        {
            id: 'format-btn',
            text: 'Format',
            icon: FileCopyIcon,
            clickHandler: parseAndSetInput
        },
        {
            id: 'minify-btn',
            text: 'Minify',
            icon: CodeIcon,
            clickHandler: ''
        },
        {
            id: 'convert-btn',
            text: 'Convert',
            icon: TransformIcon,
            clickHandler: ''
        },
        {
            id: 'download-btn',
            text: 'Download',
            icon: GetAppIcon,
            clickHandler: ''
        },
        {
            id: 'copy-btn',
            text: 'Copy',
            icon: FileCopyIcon,
            clickHandler: ''
        },
        {
            id: 'visualise-btn',
            text: 'Visualise',
            icon: FileCopyIcon,
            clickHandler: ''
        }
    ]

    return (
        <Grid item container sm={12} className={[buttonBox, darkTheme && darkThemeContainer].join(' ')}>
            <Grid item xs={6} md={7} xl={8}></Grid>
            <Grid item container xs={6} md={5} xl={4} spacing={1} justify='space-around'>
                {buttons.map(button => (
                    <Grid item xs={6} key={button.id}>
                        <Button
                            fullWidth
                            id={button.id}
                            className={darkTheme ? darkThemeButton : ''}
                            onClick={() => button.clickHandler()}
                            startIcon={<button.icon />}
                            size='small'
                            variant='outlined'
                            color='secondary'>
                            {button.text}
                        </Button>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    )
}

export default ButtonBox
