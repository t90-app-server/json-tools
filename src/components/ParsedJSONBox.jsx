import React, { useEffect, useState } from 'react'
import jsonLint from 'jsonlint-mod'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { a11yDark, materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Grid, makeStyles } from '@material-ui/core'
import { grey, red } from '@material-ui/core/colors'

const useStyles = makeStyles(theme => {
    return {
        codeBox: {
            height: `calc(66.1vh)`,
            border: `1px solid ${grey[500]}30`,
            boxShadow: theme.shadows[5],
            borderRadius: '0.5rem !important'
        }
    }
})

const ParsedJSONBox = ({ jsonInput, darkTheme, errorMessages, setErrorMessages }) => {
    const [linesWithError, setLinesWithError] = useState([])

    const { codeBox } = useStyles()

    useEffect(() => {
        setTimeout(() => {
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
    }, [jsonInput, setErrorMessages])

    return (
        <Grid item xs={12}>
            <SyntaxHighlighter
                language='json'
                style={darkTheme ? a11yDark : materialLight}
                title={errorMessages}
                showLineNumbers={true}
                wrapLines={true}
                className={codeBox}
                lineProps={lineNumber => ({
                    style: { display: 'block', cursor: 'pointer', backgroundColor: linesWithError.includes(lineNumber) ? `${red[200]}50` : '' }
                })}>
                {jsonInput}
            </SyntaxHighlighter>
        </Grid>
    )
}

export default ParsedJSONBox
