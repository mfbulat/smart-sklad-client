import React from 'react';
import {IconButton} from "@material-ui/core";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {useDispatch} from "react-redux";
import {removeCategoryAC} from "../../state/categories-reducer";
import {setCategoryIdForChange, setShowAddGroup} from "../../state/app-reducer";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            margin: theme.spacing(1),
            width: '0',
            height: '0',
        },
    }),
);

type EditCategoryMenuPropsType = {
    // removeCategory: (id: number)=>void
    categoryFocusId: number
}

const EditCategoryMenu = (props: EditCategoryMenuPropsType) => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        event.stopPropagation();
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onRemoveCategory = () => {
        dispatch(removeCategoryAC(props.categoryFocusId))
        handleClose()
    }

    const onEditCategory = () => {
        dispatch(setShowAddGroup(true))
        dispatch(setCategoryIdForChange(props.categoryFocusId))
        handleClose()
    }



    return (
        <>
            <IconButton
                className={classes.button}
                size="small"
                aria-label="delete"
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}>
                <CreateOutlinedIcon />
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={onEditCategory}>Изменить</MenuItem>
                <MenuItem onClick={onRemoveCategory}>Удалить</MenuItem>
            </Menu>
        </>
    );
};

export default EditCategoryMenu;