import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {createStyles, Theme, makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SettingsIcon from '@material-ui/icons/Settings';
import AddCircleOutlineSharpIcon from '@material-ui/icons/AddCircleOutlineSharp';
import FilterListIcon from '@material-ui/icons/FilterList';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {removeProducts} from "../../state/products-reducer";
import {setSelectedItemsId, setShowAddProduct} from "../../state/app-reducer";
import AddProductDialog from "../utils/AddProductDialog";
import {ProductType} from "./ProductsBody";


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
        menuButton: {
        },
        title: {
        },
        tabs: {
        },
        button: {
            margin: theme.spacing(1),
        },
        dialog: {
            overflow: "hidden",
        }
    }),
);

function ProductsHeader() {
    const classes = useStyles();
    const dispatch = useDispatch()
    const selects = useSelector<AppRootStateType, Array<string>>((state) => state.app.selectedItemsId)
    const showAddProduct = useSelector<AppRootStateType, boolean>((state) => state.app.showAddProduct)

    const onAddProduct = () => {
        dispatch(setShowAddProduct(!showAddProduct))
    }

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const onDelete = () => {
        dispatch(removeProducts(selects))
        handleClose()
        dispatch(setSelectedItemsId([]))
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

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
                                Товары
                            </Typography>


                            <Box>
                                <Button variant="outlined"
                                        color="primary"
                                        size="small"
                                        className={classes.button}
                                        startIcon={<AddCircleOutlineSharpIcon/>}
                                    // component={NavLink} to={'/addProduct'}
                                        onClick={onAddProduct}
                                >
                                    Товар
                                </Button>
                                <Button variant="outlined"
                                        color="primary"
                                        size="small"
                                        className={classes.button}
                                        startIcon={<AddCircleOutlineSharpIcon/>}
                                >
                                    Группа
                                </Button>
                                <Button variant="outlined"
                                        color="primary"
                                        size="small"
                                        className={classes.button}
                                        startIcon={<FilterListIcon/>}
                                >
                                    Фильтр
                                </Button>
                                <Button variant="outlined"
                                        color="primary"
                                        size="small"
                                        className={classes.button}
                                        aria-controls="simple-menu"
                                        aria-haspopup="true"
                                        onClick={handleClick}
                                >
                                    Изменить
                                </Button>
                                <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleClose}>Изменить</MenuItem>
                                    <MenuItem onClick={handleClose}>Копировать</MenuItem>
                                    <MenuItem onClick={onDelete}>Удалить</MenuItem>
                                    <MenuItem onClick={handleClose}>Переместить</MenuItem>
                                </Menu>
                                <Button variant="outlined"
                                        color="primary"
                                        size="small"
                                        className={classes.button}
                                >
                                    Импорт
                                </Button>
                                <Button variant="outlined"
                                        color="primary"
                                        size="small"
                                        className={classes.button}
                                >
                                    Экспорт
                                </Button>
                                <Button variant="outlined"
                                        color="primary"
                                        size="small"
                                        className={classes.button}
                                        startIcon={<SettingsIcon/>}
                                >
                                    Настройки
                                </Button>
                                <AddProductDialog dialogTitle={"Добавить товар"}
                                                 showAddProduct={showAddProduct}
                                                 onAddProduct={onAddProduct}
                                />
                            </Box>
                        </Grid>
                    </Container>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default ProductsHeader