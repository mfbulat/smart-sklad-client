import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {NavLink} from 'react-router-dom';
import {ArrayNavItemsType} from "./Header";

type NavTabsPropsType = {
    menuItems: ArrayNavItemsType
}

function NavTabs(props: NavTabsPropsType) {

    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const navItems = props.menuItems.map((el, key) => {
        return <Tab label={el.title} component={NavLink} to={el.path} key={key}/>
    })

    return (
        <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
        >
            {navItems}
        </Tabs>

    );
}

export default NavTabs