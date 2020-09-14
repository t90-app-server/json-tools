import { Grid, makeStyles, TextField } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import jsonLint from 'jsonlint-mod'
import beautify from 'js-beautify/js/lib/beautify'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { docco, a11yDark, dracula, materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { red } from '@material-ui/core/colors'

const useStyles = makeStyles(theme => ({
    codeBox: {
        height: `calc(80vh - ${theme.mixins.toolbar.minHeight}px - 3rem)`
    },
    codeBoxContainer: {
        height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px - 3rem)`
    }
}))

const CodeBox = () => {
    const [jsonInput, setJsonInput] = useState('')
    const [linesWithError, setLinesWithError] = useState([])
    const [errorMessages, setErrorMessages] = useState([])
    const { codeBoxContainer, codeBox } = useStyles()
    const [darkTheme, setDarkTheme] = useState(false)

    const parseAndSetInput = () => {
        setJsonInput(beautify.js_beautify(jsonInput, { indent_size: 4 }))
    }

    useEffect(() => {
        setTimeout(() => {
            // parseAndSetInput()
            try {
                jsonLint.parse(jsonInput)
                setLinesWithError([])
                setErrorMessages()
            } catch (error) {
                let errors = error.message.match(/line ([0-9]*)/)
                setLinesWithError(!!errors && errors.length > 0 ? [+errors[1]] : [])
                setErrorMessages(error)
            }
        }, 500)
    }, [jsonInput])

    return (
        <>
            <Grid item xs={12} md={6} className={codeBoxContainer}>
                <TextField
                    multiline
                    variant="outlined"
                    rows={50}
                    rowsMax={120}
                    fullWidth
                    value={jsonInput}
                    className={codeBox}
                    onDoubleClick={() => parseAndSetInput()}
                    onChange={e => setJsonInput(e.target.value)}
                ></TextField>
            </Grid>
            <Grid item xs={12} md={6} className={codeBoxContainer}>
                <SyntaxHighlighter
                    language="json"
                    style={darkTheme ? dracula : materialLight}
                    title={errorMessages}
                    showLineNumbers={true}
                    wrapLines={true}
                    className={codeBox}
                    onDoubleClick={() => setDarkTheme(!darkTheme)}
                    lineProps={lineNumber => ({
                        style: { display: 'block', cursor: 'pointer', backgroundColor: linesWithError.includes(lineNumber) ? `${red[200]}50` : '' }
                        // onClick() {
                        //     alert(`Line Number Clicked: ${lineNumber}`)
                        // }
                    })}
                >
                    {jsonInput}
                </SyntaxHighlighter>
            </Grid>
        </>
    )
}

export default CodeBox
