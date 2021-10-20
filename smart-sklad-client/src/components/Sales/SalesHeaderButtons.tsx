import React from 'react';
import Button from "@material-ui/core/Button";
import AddCircleOutlineSharpIcon from "@material-ui/icons/AddCircleOutlineSharp";
import FilterListIcon from "@material-ui/icons/FilterList";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Box from "@material-ui/core/Box";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            margin: theme.spacing(1),
        },
    }),
);

type ProductsHeaderButtonsPropsType = {

}

const SalesHeaderButtons = (props: ProductsHeaderButtonsPropsType) => {
    const classes = useStyles();
    const history = useHistory();

    const onAddReceiving = () => {
        history.push('/addSale');
    }

    const onDelete = () => {

    }

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box>
            <Button variant="outlined"
                    color="primary"
                    size="small"
                    className={classes.button}
                    startIcon={<AddCircleOutlineSharpIcon/>}
                    onClick={onAddReceiving}
            >
                Отгрузка
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
                <MenuItem>Копировать</MenuItem>
                <MenuItem onClick={onDelete}>Удалить</MenuItem>
            </Menu>
        </Box>
    );
};

export default SalesHeaderButtons;