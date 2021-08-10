import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import NavTabs from "./NavTabs";
import BurgerMenu from "./BurgerMenu";
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            // flexGrow: 1,
        },
        menuButton: {
            // marginRight: theme.spacing(2),
            // flexGrow: 1,
        },
        title: {
            // flexGrow: 1,
        },
        tabs: {
            // flexGrow: 1,
        },
    }),
);

export type NavItemsType = {
    title: string
    path: string
    icon:  string
}
export type ArrayNavItemsType = Array<NavItemsType>

const menuItems: ArrayNavItemsType = [
    {
        title: 'Товары',
        path: "/products",
        icon: "shopping_cart"
    },
    {
        title: 'Закупки',
        path: "/receivings",
        icon: "add_shopping_cart"
    },
    {
        title: 'Отгрузки',
        path: "/sales",
        icon: "shopping_bag"
    }
]

function Header() {
    const classes = useStyles();

    const mediaQuery = useMediaQuery('(max-width:450px)')

    return (
        <div className={classes.root}>
            <AppBar position="static" color='primary'>
                <Toolbar>
                    <Container fixed>
                    <Grid container
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          // flexWrap="nowrap"
                    >

                        {mediaQuery && <BurgerMenu menuItems={menuItems}/>}

                        <Typography variant="h6" className={classes.title}>
                            Sklad
                        </Typography>

                        {!mediaQuery && <NavTabs menuItems={menuItems}/>}

                        <Button color="inherit">Login</Button>

                    </Grid>
                    </Container>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header