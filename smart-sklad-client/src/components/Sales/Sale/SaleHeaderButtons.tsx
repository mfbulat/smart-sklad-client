import React from 'react';
import Button from "@material-ui/core/Button";
import CloseIcon from '@material-ui/icons/HighlightOff';
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import PrintIcon from '@material-ui/icons/Print';
import EmailIcon from '@material-ui/icons/Email';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Box from "@material-ui/core/Box";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            margin: theme.spacing(1),
        },
    }),
);

type ReceivingHeaderButtonsPropsType = {

}

const SaleHeaderButtons = (props: ReceivingHeaderButtonsPropsType) => {
    const classes = useStyles();

    const onAddReceiving = () => {

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
                    startIcon={<DoneOutlineIcon/>}
                    onClick={onAddReceiving}
                    type={'submit'}
            >
                Сохранить
            </Button>
            <Button variant="outlined"
                    color="primary"
                    size="small"
                    className={classes.button}
                    startIcon={<CloseIcon/>}
            >
                Закрыть
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
            <Button variant="outlined"
                    color="primary"
                    size="small"
                    className={classes.button}
                    //startIcon={<FilterListIcon/>}
            >
                Создать документ
            </Button>
            <Button variant="outlined"
                    color="primary"
                    size="small"
                    className={classes.button}
                startIcon={<PrintIcon/>}
            >
                Печать
            </Button>
            <Button variant="outlined"
                    color="primary"
                    size="small"
                    className={classes.button}
                startIcon={<EmailIcon/>}
            >
                Отправить
            </Button>
        </Box>
    );
};

export default SaleHeaderButtons;