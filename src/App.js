import React, { useEffect, useState } from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import Layout from './components/Layout'
import JSONInputBox from './components/JSONInputBox'
import ParsedJSONBox from './components/ParsedJSONBox'
import ParseStringInput from './components/ParseStringInput'
import ButtonBox from './components/ButtonBox'
import ErrorBox from './components/ErrorBox'
import beautify from 'js-beautify/js/lib/beautify'

const useStyles = makeStyles(theme => {
    return {
        codeBoxContainer: {
            height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px - 3rem)`,
            marginTop: '3rem'
        }
    }
})

function App() {
    const { codeBoxContainer } = useStyles()
    const [jsonInput, setJsonInput] = useState(
        '{"this": "is","a": {"test": "to","show": "syntax","test2": 123,"and": [ { "to" : "see"}, {"if": "anything is working and"}, {"to": { "test": "parsing"}}] }}'
    )
    const [darkTheme, setDarkTheme] = useState(true)
    const [parsedJson, setParsedJson] = useState('')
    const [errorMessages, setErrorMessages] = useState([])

    const isJsonValid = json => {
        try {
            JSON.parse(json)
            return true
        } catch (e) {
            return false
        }
    }

    useEffect(() => {
        alert('Work in progress')
    }, [])

    useEffect(() => {
        if (!!jsonInput) {
            setTimeout(() => {
                if (isJsonValid(jsonInput)) {
                    setParsedJson(beautify.js_beautify(jsonInput, { indent_size: 4 }))
                } else {
                    setParsedJson(jsonInput)
                }
            }, 500)
        } else {
            setParsedJson('')
        }
    }, [jsonInput])

    return (
        <Layout darkTheme={darkTheme} setDarkTheme={setDarkTheme}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={!jsonInput ? 12 : 6} className={codeBoxContainer}>
                    <JSONInputBox jsonInput={jsonInput} setJsonInput={setJsonInput} darkTheme={darkTheme} />
                </Grid>
                {!!jsonInput && (
                    <Grid container item sm={12} md={6} alignContent='flex-start'>
                        <ParseStringInput jsonInput={jsonInput} setParsedJson={setParsedJson} darkTheme={darkTheme} />

                        <ButtonBox jsonInput={jsonInput} setJsonInput={setJsonInput} setDarkTheme={setDarkTheme} darkTheme={darkTheme} />

                        <ParsedJSONBox jsonInput={parsedJson} darkTheme={darkTheme} errorMessages={errorMessages} setErrorMessages={setErrorMessages} />

                        <ErrorBox darkTheme={darkTheme} errors={errorMessages} />
                    </Grid>
                )}
            </Grid>
        </Layout>
    )
}

export default App
