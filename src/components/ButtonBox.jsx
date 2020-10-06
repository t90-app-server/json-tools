import { Button, Grid, makeStyles, Typography } from '@material-ui/core'
import TransformIcon from '@material-ui/icons/Transform'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import { grey, red } from '@material-ui/core/colors'
import GetAppIcon from '@material-ui/icons/GetApp'
import beautify from 'js-beautify/js/lib/beautify'
import CodeIcon from '@material-ui/icons/Code'
import { saveAs } from 'file-saver'
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
            backgroundColor: 'rgb(250, 250, 250)',
            '& p#error-text': {
                color: red[500]
            }
        },
        darkThemeContainer: {
            backgroundColor: 'rgb(43, 43, 43)',
            boxShadow: `${theme.shadows[7]}`,
            color: 'white'
        },
        darkThemeButton: {
            borderColor: grey[500],
            color: 'white'
        },
        buttonStyle: {
            [theme.breakpoints.down('sm')]: {
                fontSize: '0.65rem'
            },
            '& svg': {
                [theme.breakpoints.down('sm')]: {
                    height: '0.8em',
                    width: '0.8em'
                }
            }
        }
    }
})

const ButtonBox = ({ jsonInput, setJsonInput, darkTheme, errors, parsedJson }) => {
    const { buttonBox, darkThemeContainer, darkThemeButton, buttonStyle } = useStyles()

    const parseAndSetInput = () => {
        setJsonInput(beautify.js_beautify(jsonInput, { indent_size: 4 }))
    }

    const downloadAsFile = () => saveAs(new Blob([parsedJson], { type: 'text/plain;charset=utf-8' }), `parsed-json-output-${Date.now()}.json`)

    const fallbackCopyTextToClipboard = text => {
        var textArea = document.createElement('textarea')
        textArea.value = text

        // Avoid scrolling to bottom
        textArea.style.top = '0'
        textArea.style.left = '0'
        textArea.style.position = 'fixed'

        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()

        try {
            var successful = document.execCommand('copy')
            var msg = successful ? 'successful' : 'unsuccessful'
            console.log('Fallback: Copying text command was ' + msg)
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err)
        }

        document.body.removeChild(textArea)
    }

    const copyTextToClipboard = (text = parsedJson) => {
        if (!navigator.clipboard) {
            fallbackCopyTextToClipboard(text)
            return
        }
        navigator.clipboard.writeText(text).then(
            function () {
                console.log('Async: Copying to clipboard was successful!')
            },
            function (err) {
                console.error('Async: Could not copy text: ', err)
            }
        )
    }

    const buttons = [
        {
            id: 'format-btn',
            text: 'Format',
            icon: FileCopyIcon,
            clickHandler: parseAndSetInput
        },
        {
            id: 'download-btn',
            text: 'Download',
            icon: GetAppIcon,
            clickHandler: downloadAsFile
        },
        {
            id: 'copy-btn',
            text: 'Copy',
            icon: FileCopyIcon,
            clickHandler: copyTextToClipboard
        },
        {
            id: 'minify-btn',
            text: 'Minify [WIP]',
            icon: CodeIcon,
            clickHandler: ''
        },
        {
            id: 'convert-btn',
            text: 'Convert [WIP]',
            icon: TransformIcon,
            clickHandler: ''
        },
        {
            id: 'visualise-btn',
            text: 'Visualise [WIP]',
            icon: FileCopyIcon,
            clickHandler: ''
        }
    ]

    return (
        <Grid item container xs={12} className={[buttonBox, darkTheme && darkThemeContainer].join(' ')}>
            <Grid item xs={6} md={7}>
                {!!errors ? (
                    <Grid item sm={12}>
                        <Typography>
                            Invalid JSON{' '}
                            <span role='img' aria-label='sad face'>
                                😞
                            </span>
                        </Typography>
                        <p id='error-text'>{errors && String(errors)}</p>
                    </Grid>
                ) : (
                    <Grid item xs={12}>
                        <Typography>
                            The JSON is valid{' '}
                            <span role='img' aria-label='happy face'>
                                😀
                            </span>
                        </Typography>
                    </Grid>
                )}
            </Grid>
            <Grid item container xs={6} md={5} spacing={1} justify='space-around'>
                {buttons.map(button => (
                    <Grid item xs={6} key={button.id}>
                        <Button
                            fullWidth
                            disabled={button.text.includes('WIP')}
                            id={button.id}
                            className={[buttonStyle, darkTheme ? darkThemeButton : ''].join(' ')}
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
