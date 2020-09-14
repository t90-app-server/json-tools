import React from 'react'
import { Container, Grid, makeStyles } from '@material-ui/core'
import CodeBox from './components/CodeBox'
import Layout from './components/Layout'

const useStyles = makeStyles(theme => {
    return {
        codeBox: {
            height: `calc(70vh - ${theme.mixins.toolbar.minHeight}px - 3rem)`
        },
        codeBoxContainer: {
            height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px - 3rem)`,
            marginTop: '3rem'
        }
    }
})

function App() {
    const { codeBoxContainer, codeBox } = useStyles()

    return (
        <Layout>
            <Grid container spacing={3} className={codeBoxContainer}>
                <CodeBox className={codeBox}></CodeBox>
            </Grid>
        </Layout>
    )
}

export default App
