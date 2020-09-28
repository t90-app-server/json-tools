import { Grid, makeStyles, Typography } from '@material-ui/core'
import { grey, red } from '@material-ui/core/colors'
import React from 'react'

const useStyles = makeStyles(theme => {
    return {
        buttonBox: {
            height: '8rem',
            borderRadius: '0.5rem',
            border: `1px solid ${grey[500]}30`,
            backgroundColor: 'rgb(250, 250, 250)',
            boxShadow: theme.shadows[5],
            padding: '1rem',
            '& pre': {
                color: red[500]
            }
        },
        darkThemeContainer: {
            boxShadow: `${theme.shadows[7]}`,
            backgroundColor: 'rgb(43, 43, 43)',
            color: 'white'
        }
    }
})

const ErrorBox = ({ darkTheme, errors }) => {
    const { buttonBox, darkThemeContainer } = useStyles()

    return !!errors ? (
        <Grid item sm={12} className={[buttonBox, darkTheme && darkThemeContainer].join(' ')}>
            <Typography>
                Invalid JSON{' '}
                <span role='img' aria-label='sad face'>
                    😞
                </span>
            </Typography>
            <pre>{errors && String(errors)}</pre>
        </Grid>
    ) : (
        <Grid item xs={12} className={[buttonBox, darkTheme && darkThemeContainer].join(' ')}>
            <Typography>
                The JSON is valid{' '}
                <span role='img' aria-label='happy face'>
                    😀
                </span>
            </Typography>
        </Grid>
    )
}

export default ErrorBox
