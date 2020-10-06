import { makeStyles, TextField } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import React from 'react'

const useStyles = makeStyles(theme => ({
    codeBox: {
        height: `calc(96.2vh - ${theme.mixins.toolbar.minHeight}px - 3rem)`,
        border: `1px solid ${grey[500]}30`,
        borderRadius: '0.5rem',
        backgroundColor: 'rgb(250, 250, 250)',
        boxShadow: theme.shadows[5],
        '& div:before': {
            borderBottom: '0px !important'
        },
        '& div:after': {
            borderBottom: '0px !important'
        },
        '& textarea': {
            border: '0px',
            margin: '1rem',
            height: `calc(96.2vh - ${theme.mixins.toolbar.minHeight}px - 7.7rem)`,
            textDecoration: 'none',
            borderRadius: '0.5rem',
            fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
            boxShadow: `inset 0px 3px 3px -1px rgba(0,0,0,0.15), inset 0px 5px 5px 0px rgba(0,0,0,0.1), inset 0px 1px 10px 0px rgba(0,0,0,0.1)`,
            padding: '1rem',
            overflow: 'scroll'
        }
    },
    darkThemeInput: {
        backgroundColor: 'rgb(43, 43, 43)',
        boxShadow: `${theme.shadows[7]}`,
        color: grey[100],
        '& textarea': {
            color: grey[100]
        }
    }
}))

const JSONInputBox = ({ jsonInput, setJsonInput, darkTheme }) => {
    const { codeBox, darkThemeInput } = useStyles()

    return (
        <label title='JSON Input'>
            <TextField
                multiline
                rows={50}
                fullWidth
                autoFocus
                value={jsonInput}
                placeholder={'Enter JSON input'}
                inputRef={input => input && !jsonInput && input.focus()}
                className={[codeBox, darkTheme && darkThemeInput].join(' ')}
                onChange={e => setJsonInput(e.target.value)}
            />
        </label>
    )
}

export default JSONInputBox
