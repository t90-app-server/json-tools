import { AppBar, Button, Container, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/MenuOutlined'
import React from 'react'

const useStyles = makeStyles(() => ({}))

const Layout = ({ children }) => {
    const abc = useStyles()
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">News</Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container maxWidth="xl">{children}</Container>
        </>
    )
}

export default Layout
