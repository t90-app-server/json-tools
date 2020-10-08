import React, { useEffect, useState } from 'react'
import jsonLint from 'jsonlint-mod'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { a11yDark, materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { makeStyles } from '@material-ui/core'
import { red } from '@material-ui/core/colors'

const useStyles = makeStyles(theme => ({}))

const ParsedJSONBox = ({ jsonInput, darkTheme, errorMessages, setErrorMessages, className }) => {
    const [linesWithError, setLinesWithError] = useState([])

    useStyles()

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
        <div className={className}>
            <SyntaxHighlighter
                language='json'
                style={darkTheme ? a11yDark : materialLight}
                title={errorMessages}
                showLineNumbers={true}
                wrapLines={true}
                lineProps={lineNumber => ({
                    style: { display: 'block', cursor: 'pointer', backgroundColor: linesWithError.includes(lineNumber) ? `${red[200]}50` : '' }
                })}>
                {jsonInput}
            </SyntaxHighlighter>
        </div>
    )
}

export default ParsedJSONBox
