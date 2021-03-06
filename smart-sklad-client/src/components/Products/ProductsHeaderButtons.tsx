import React from 'react';
import Button from "@material-ui/core/Button";
import AddCircleOutlineSharpIcon from "@material-ui/icons/AddCircleOutlineSharp";
import FilterListIcon from "@material-ui/icons/FilterList";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SettingsIcon from "@material-ui/icons/Settings";
import AddProductDialog from "../utils/AddProductDialog";
import AddCategoryDialog from "../utils/AddCategoryDialog";
import Box from "@material-ui/core/Box";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {CategoryType} from "../Categories/Categories";
import {setCategoryIdForChange, setSelectedItemsId, setShowAddGroup, setShowAddProduct} from "../../state/app-reducer";
import {removeMultipleProducts} from "../../state/products-reducer";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            margin: theme.spacing(1),
        },
    }),
);

type ProductsHeaderButtonsPropsType = {

}

const ProductsHeaderButtons = (props: ProductsHeaderButtonsPropsType) => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const selects = useSelector<AppRootStateType, Array<string>>((state) => state.app.selectedItemsId)
    const showAddProduct = useSelector<AppRootStateType, boolean>((state) => state.app.showAddProduct)
    const showAddGroup = useSelector<AppRootStateType, boolean>((state) => state.app.showAddGroup)
    const categories = useSelector<AppRootStateType, CategoryType[]>((state) => state.categories)
    const categoryIdForChange = useSelector<AppRootStateType, number>((state) => state.app.categoryIdForChange)

    const onAddProduct = () => {
        dispatch(setShowAddProduct(!showAddProduct))
    }
    const onAddGroup = () => {
        dispatch(setShowAddGroup(!showAddGroup))
        dispatch(setCategoryIdForChange(0))
    }

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const onDelete = () => {
        dispatch(removeMultipleProducts(selects))
        handleClose()
        dispatch(setSelectedItemsId([]))
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const setCategoryForCategoryDialog = () => {
        console.log('categoryIdForChange ', categoryIdForChange)
        for (let i = 0; i < categories.length; i++) {
            if (categories[i].id === categoryIdForChange) {
                return categories[i]
            }
            if (categories[i].subCategory.length > 0) {
                let sub = categories[i].subCategory
                for (let j = 0; j < sub.length; j++) {
                    if (sub[j].id === categoryIdForChange) {
                        return sub[j]
                    }
                }
            }
        }
    }

    return (
        <Box>
            <Button variant="outlined"
                    color="primary"
                    size="small"
                    className={classes.button}
                    startIcon={<AddCircleOutlineSharpIcon/>}
                    onClick={onAddProduct}
            >
                ??????????
            </Button>
            <Button variant="outlined"
                    color="primary"
                    size="small"
                    className={classes.button}
                    startIcon={<AddCircleOutlineSharpIcon/>}
                    onClick={onAddGroup}
            >
                ????????????
            </Button>
            <Button variant="outlined"
                    color="primary"
                    size="small"
                    className={classes.button}
                    startIcon={<FilterListIcon/>}
            >
                ????????????
            </Button>
            <Button variant="outlined"
                    color="primary"
                    size="small"
                    className={classes.button}
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
            >
                ????????????????
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>????????????????</MenuItem>
                <MenuItem onClick={handleClose}>????????????????????</MenuItem>
                <MenuItem onClick={onDelete}>??????????????</MenuItem>
                <MenuItem onClick={handleClose}>??????????????????????</MenuItem>
            </Menu>
            <Button variant="outlined"
                    color="primary"
                    size="small"
                    className={classes.button}
            >
                ????????????
            </Button>
            <Button variant="outlined"
                    color="primary"
                    size="small"
                    className={classes.button}
            >
                ??????????????
            </Button>
            <Button variant="outlined"
                    color="primary"
                    size="small"
                    className={classes.button}
                    startIcon={<SettingsIcon/>}
            >
                ??????????????????
            </Button>
            <AddProductDialog dialogTitle={"???????????????? ??????????"}
                              showAddProduct={showAddProduct}
                              onAddProduct={onAddProduct}
            />
            <AddCategoryDialog {...categoryIdForChange !== 0
                ? {
                    dialogTitle: "?????????????????????????? ??????????????????",
                    showAddGroup: showAddGroup,
                    onAddGroup: onAddGroup,
                    category: setCategoryForCategoryDialog(),
                }
                : {
                    dialogTitle: "???????????????? ????????????",
                    showAddGroup: showAddGroup,
                    onAddGroup: onAddGroup,
                }
                               }

            />
        </Box>
    );
};

export default ProductsHeaderButtons;