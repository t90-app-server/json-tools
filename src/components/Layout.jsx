import { AppBar, Container, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import LightIcon from '@material-ui/icons/Brightness7'
import DarkIcon from '@material-ui/icons/Brightness3'
import GitHubIcon from '@material-ui/icons/GitHub'
import { grey } from '@material-ui/core/colors'
import React, { useEffect } from 'react'

const useStyles = makeStyles(theme => ({
    darkToolBar: {
        backgroundColor: grey[900],
        boxShadow: theme.shadows[7]
    },
    darkBody: {
        backgroundColor: 'rgb(33 33 33)',
        height: '100vh'
    },
    title: {
        margin: 'auto',
        fontSize: '1.5rem',
        marginTop: '1.5rem',
        paddingLeft: '10rem'
    },
    toolbarIcon: {
        color: `${grey[100]}90`
    }
}))

const Layout = ({ children, darkTheme, setDarkTheme }) => {
    const { darkBody, darkToolBar, title, toolbarIcon } = useStyles()

    useEffect(() => {
        document.body.style.backgroundColor = darkTheme ? 'rgb(33 33 33)' : ''
    }, [darkTheme])

    return (
        <div className={darkTheme ? darkBody : ''}>
            <AppBar position='static' className={darkTheme ? darkToolBar : ''}>
                <Toolbar className={darkTheme ? darkToolBar : ''}>
                    <Typography variant='h1' className={title}>
                        JSON Tools [WIP]
                    </Typography>
                    <IconButton title={`Turn on ${darkTheme ? 'light' : 'dark'} theme`} onClick={() => setDarkTheme(!darkTheme)}>
                        {darkTheme ? <LightIcon className={toolbarIcon} /> : <DarkIcon className={toolbarIcon} />}
                    </IconButton>
                    <IconButton title='View this project on github' onClick={() => window.open('https://github.com/t90-app-server/json-tools', '_blank')}>
                        <GitHubIcon className={toolbarIcon} />
                    </IconButton>
                    <IconButton title='Help' onClick={() => alert('TODO')}>
                        <HelpOutlineIcon className={toolbarIcon} />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Container maxWidth='xl'>{children}</Container>
        </div>
    )
}

export default Layout
