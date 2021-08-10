import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Menu, {MenuProps} from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import {NavLink} from "react-router-dom";
import {ArrayNavItemsType} from "./Header";
import {Icon} from "@material-ui/core";

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props: MenuProps) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

type BurgerMenuPropsType = {
    menuItems: ArrayNavItemsType
}

function BurgerMenu(props: BurgerMenuPropsType) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const navItems = props.menuItems.map((el, key) => {
        return (
            <NavLink to={el.path} style={{textDecoration: "none", color: "inherit"}} key={key}>
                <StyledMenuItem onClick={handleClose}>
                    <ListItemIcon>
                        {/*<SendIcon fontSize="small"/>*/}
                        <Icon>{el.icon}</Icon>
                    </ListItemIcon>
                    <ListItemText primary={el.title}/>
                </StyledMenuItem>
            </NavLink>
        )
    })

    return (
        <div>
            <IconButton edge="end" color="inherit" aria-label="menu" onClick={handleClick}>
                <MenuIcon/>
            </IconButton>
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >

                {navItems}

                {/*<NavLink to={props.menuItems[0].path} style={{textDecoration: "none", color: "inherit"}}>*/}
                {/*    <StyledMenuItem onClick={handleClose}>*/}
                {/*        <ListItemIcon>*/}
                {/*            <SendIcon fontSize="small"/>*/}
                {/*        </ListItemIcon>*/}
                {/*        <ListItemText primary="Товары"/>*/}
                {/*    </StyledMenuItem>*/}
                {/*</NavLink>*/}
                {/*<NavLink to="/receivings" style={{textDecoration: "none", color: "inherit"}}>*/}
                {/*    <StyledMenuItem>*/}
                {/*        <ListItemIcon>*/}
                {/*            <DraftsIcon fontSize="small"/>*/}
                {/*        </ListItemIcon>*/}
                {/*        <ListItemText primary="Закупки"/>*/}
                {/*    </StyledMenuItem>*/}
                {/*</NavLink>*/}
                {/*<NavLink to="/sales" style={{textDecoration: "none", color: "inherit"}}>*/}
                {/*    <StyledMenuItem>*/}
                {/*        <ListItemIcon>*/}
                {/*            <InboxIcon fontSize="small"/>*/}
                {/*        </ListItemIcon>*/}
                {/*        <ListItemText primary="Отгрузки"/>*/}
                {/*    </StyledMenuItem>*/}
                {/*</NavLink>*/}


            </StyledMenu>
        </div>
    );
}

export default BurgerMenu
