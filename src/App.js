import React, { useEffect, useState } from 'react'
import { Grid, makeStyles, Slide } from '@material-ui/core'
import Layout from './components/Layout'
import JSONInputBox from './components/JSONInputBox'
import ParsedJSONBox from './components/ParsedJSONBox'
import ParseStringInput from './components/ParseStringInput'
import ButtonBox from './components/ButtonBox'
import { grey, red } from '@material-ui/core/colors'

const useStyles = makeStyles(theme => ({
    codeBoxContainer: {
        height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px - 3rem)`,
        marginTop: '2rem'
    },
    dFlex: {
        display: 'flex',
        maxWidth: '100%',
        paddingTop: theme.spacing(2),
        '&:first-child': {
            paddingTop: 0
        }
    },
    card: {
        width: '100%',
        borderRadius: '0.5rem',
        border: `1px solid ${grey[500]}30`,
        backgroundColor: 'rgb(250, 250, 250)',
        boxShadow: theme.shadows[5],
        padding: '1rem',
        '& pre': {
            color: red[500],
            maxHeight: 'calc(100% - 2.5rem)',
            overflow: 'scroll'
        },
        '& p#error-text': {
            color: red[500]
        }
    },
    darkThemeContainer: {
        backgroundColor: 'rgb(43, 43, 43)',
        boxShadow: `${theme.shadows[7]}`,
        color: 'white'
    },
    parsedJsonBox: {
        height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px - ${theme.spacing(2)}px - 19rem)`
    }
}))

function App() {
    const { codeBoxContainer, dFlex, card, darkThemeContainer, parsedJsonBox } = useStyles()
    const [jsonInput, setJsonInput] = useState(
        process.env.NODE_ENV === 'production'
            ? ''
            : '{"this": "is","a": {"test": "to","show": "syntax","test2": 123,"and": [ { "to" : "see"}, {"if": "anything is working and"}, {"to": { "test": "parsing"}}] }}'
    )
    const [darkTheme, setDarkTheme] = useState(true)
    const [parsedJson, setParsedJson] = useState('')
    const [errorMessages, setErrorMessages] = useState([])

    useEffect(() => {
        if (!jsonInput) {
            setParsedJson('')
        }
    }, [jsonInput])

    return (
        <Layout darkTheme={darkTheme} setDarkTheme={setDarkTheme}>
            <Grid container spacing={2}>
                <Slide in={true} timeout={300} direction={'up'}>
                    <Grid container item xs={12} lg={!jsonInput ? 12 : 6} className={codeBoxContainer}>
                        <Grid item xs={12} className={dFlex}>
                            <JSONInputBox jsonInput={jsonInput} setJsonInput={setJsonInput} darkTheme={darkTheme} />
                        </Grid>
                    </Grid>
                </Slide>
                {!!jsonInput && (
                    <Slide in={true} timeout={500} direction={'left'}>
                        <Grid container item xs={12} lg={6} className={codeBoxContainer} alignContent='flex-start'>
                            <Grid item xs={12} className={dFlex} style={{ height: '6rem' }}>
                                <ParseStringInput
                                    className={[card, darkTheme ? darkThemeContainer : ''].join(' ')}
                                    jsonInput={jsonInput}
                                    setParsedJson={setParsedJson}
                                    darkTheme={darkTheme}
                                />
                            </Grid>
                            <Grid item xs={12} className={dFlex} style={{ height: '10rem' }}>
                                <ButtonBox
                                    className={[card, darkTheme ? darkThemeContainer : ''].join(' ')}
                                    jsonInput={jsonInput}
                                    parsedJson={parsedJson}
                                    setJsonInput={setJsonInput}
                                    setDarkTheme={setDarkTheme}
                                    darkTheme={darkTheme}
                                    errors={errorMessages}
                                />
                            </Grid>
                            <Grid item xs={12} className={[dFlex, parsedJsonBox].join(' ')}>
                                <ParsedJSONBox
                                    className={[card, darkTheme ? darkThemeContainer : ''].join(' ')}
                                    jsonInput={parsedJson}
                                    darkTheme={darkTheme}
                                    errorMessages={errorMessages}
                                    setErrorMessages={setErrorMessages}
                                />
                            </Grid>
                        </Grid>
                    </Slide>
                )}
            </Grid>
        </Layout>
    )
}

export default App
