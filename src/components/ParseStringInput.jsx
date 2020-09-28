import { Grid, makeStyles, TextField, Typography } from '@material-ui/core'
import { grey, red } from '@material-ui/core/colors'
import React, { useEffect, useState } from 'react'

const useStyles = makeStyles(theme => {
    return {
        buttonBox: {
            height: '6rem',
            borderRadius: '0.5rem',
            border: `1px solid ${grey[500]}30`,
            backgroundColor: 'rgb(250, 250, 250)',
            boxShadow: theme.shadows[5],
            padding: '1rem',
            [theme.breakpoints.up('lg')]: {
                marginTop: '3rem'
            },
            '& pre': {
                color: red[500]
            }
        },
        parserQueryInput: {
            '& input': {
                color: grey[900],
                boxShadow: `inset 0px 3px 3px -1px rgba(0,0,0,0.15), inset 0px 5px 5px 0px rgba(0,0,0,0.1), inset 0px 1px 10px 0px rgba(0,0,0,0.1)`,
                borderRadius: '0.5rem',
                border: `1px solid ${grey[300]}20`,
                paddingLeft: '1rem',
                paddingRight: '1rem',
                height: '2rem'
            },
            '& div:before': {
                borderBottom: '0px !important'
            },
            '& div:after': {
                borderBottom: '0px !important'
            }
        },
        darkThemeContainer: {
            boxShadow: `${theme.shadows[7]}`,
            backgroundColor: 'rgb(43, 43, 43)',
            color: 'white'
        },
        parserQueryInputDark: {
            '& input': {
                color: grey[50]
            }
        },
        errorMessageText: {
            fontSize: '0.9rem',
            color: red[300],
            marginTop: '0.5rem'
        },
        helperMessageText: {
            fontSize: '0.9rem',
            color: grey[500],
            marginTop: '0.5rem'
        }
    }
})

const ParseStringInput = ({ darkTheme, jsonInput, setParsedJson }) => {
    const { buttonBox, darkThemeContainer, parserQueryInput, parserQueryInputDark, errorMessageText, helperMessageText } = useStyles()
    const [parseString, setParseString] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const isJsonValid = json => {
        try {
            JSON.parse(json)
            return true
        } catch (e) {
            return false
        }
    }

    const parseJson = (json = {}, parseKeys = []) => {
        if (!!parseKeys && parseKeys.length > 0 && !!json) {
            let key = parseKeys[0]
            if (Object.keys(json).includes(key)) {
                return parseJson(json[key], parseKeys.slice(1))
            } else if (['*', 'all', ''].includes(key) && Array.isArray(json)) {
                if (parseKeys.length > 1 && !!parseKeys[1]) {
                    return parseJson(
                        json.map(o => o[parseKeys[1]]).filter(o => !!o),
                        parseKeys.slice(2)
                    )
                }
            } else if (['length', 'size'].includes(key) && Array.isArray(json)) {
                return json.length + ''
            } else if (!!key && key.startsWith('[') && key.endsWith(']') && key.includes('=') && Array.isArray(json) && key.split('=').filter(k => !!k).length === 2) {
                key = key.replace('[', '').replace(']', '')
                let [filter, result] = key.split('=')
                // eslint-ignore-line
                let filteredJson = json.filter(o => parseJson(o, [filter]) == result) // eslint-disable-line

                return parseJson(filteredJson, parseKeys.slice(1))
            } else if (!!key && key.startsWith('{') && key.endsWith('}') && !Array.isArray(json)) {
                key = key.replace('{', '').replace('}', '')
                let keys = key.split(',').filter(k => !!k && Object.keys(json).includes(k))

                let mappedJson = keys.reduce((a, k) => {
                    a[k] = json[k]
                    return a
                }, {})

                return parseJson(mappedJson, parseKeys.slice(1))
            } else if (!!key && key.startsWith('{') && key.endsWith('}') && Array.isArray(json)) {
                key = key.replace('{', '').replace('}', '')
                let keys = key.split(',').filter(k => !!k && json.some(o => Object.keys(o).includes(k)))

                let mappedJson = json.map(o =>
                    keys.reduce((a, k) => {
                        a[k] = o[k]
                        return a
                    }, {})
                )

                return parseJson(mappedJson, parseKeys.slice(1))
            } else if (!!key) {
                setErrorMessage(`Invalid parse query. Cound not find '${key}' 🤔`)
            }
        }
        return typeof json === 'object' ? JSON.stringify(json, null, 4) : json + ''
    }

    useEffect(() => {
        setErrorMessage('')
        if (!!jsonInput && !!parseString && isJsonValid(jsonInput)) {
            let jsonValue = JSON.parse(jsonInput)
            let parsedJson = parseJson(jsonValue, parseString.split('.'))
            setParsedJson(parsedJson)
        } else if (!!jsonInput && !isJsonValid(jsonInput)) {
            setErrorMessage('Input string is not a valid json')
            setParsedJson(jsonInput)
        } else {
            setParsedJson(jsonInput)
        }
    }, [parseString, jsonInput, setParsedJson]) // eslint-disable-line

    return (
        <Grid item sm={12} className={[buttonBox, darkTheme ? darkThemeContainer : ''].join(' ')}>
            <label title='Parser query'>
                <TextField
                    fullWidth
                    size='small'
                    placeholder='Parser query'
                    variant='standard'
                    value={parseString}
                    disabled={!isJsonValid(jsonInput)}
                    onChange={e => setParseString(e.target.value)}
                    className={[parserQueryInput, darkTheme ? parserQueryInputDark : ''].join(' ')}
                />
            </label>
            {errorMessage && <Typography className={errorMessageText}>{errorMessage}</Typography>}
            {!errorMessage && <Typography className={helperMessageText}>Enter the parse query</Typography>}
        </Grid>
    )
}

export default ParseStringInput
