import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {createStyles, Theme, makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from "@material-ui/core/Grid";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            background: 'white',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            overflow: 'hidden',
        },
        menuButton: {},
        title: {},
        tabs: {},
        button: {
            margin: theme.spacing(1),
        },
        dialog: {
            overflow: "hidden",
        }
    }),
);

type ComponentsHeaderPropsType = {
    title?: string
    children: JSX.Element
}

function ComponentsHeader(props:ComponentsHeaderPropsType) {
    const {title, children} = props

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" color='transparent'>
                <Toolbar>
                    <Container>
                        <Grid container
                              direction="row"
                              justifyContent="space-between"
                              alignItems="center"
                              style={{overflow: "hidden"}}
                        >
                            <Typography variant="h5" className={classes.title}>
                                {title}
                            </Typography>
                            {/*<ProductsHeaderButtons/>*/}
                            {children}
                        </Grid>
                    </Container>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default ComponentsHeader