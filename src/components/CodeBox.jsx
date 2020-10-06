import { Grid, makeStyles, TextField } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import jsonLint from 'jsonlint-mod'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula, materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { grey, red } from '@material-ui/core/colors'

const useStyles = makeStyles(theme => ({
    codeBox: {
        height: `calc(66.1vh)`,
        border: `1px solid ${grey[500]}70`,
    },
    codeBoxContainer: {
        height: `calc(62vh)`
    }
}))

const CodeBox = () => {
    const [jsonInput, setJsonInput] = useState('')
    const [linesWithError, setLinesWithError] = useState([])
    const [errorMessages, setErrorMessages] = useState([])
    const { codeBoxContainer, codeBox } = useStyles()
    const [darkTheme, setDarkTheme] = useState(false)

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
