import React, {useState} from 'react';
import {Theme, createStyles, makeStyles} from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Paper} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {setCategoryClickedId} from "../../state/app-reducer";
import EditCategoryMenu from "./EditCategoryMenu";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            // width: '250px',
            paddingRight: '10px',
        },
        heading: {
            fontSize: theme.typography.pxToRem(16),
            fontWeight: theme.typography.fontWeightRegular,
            display: 'flex',
            alignItems: 'center',
            paddingLeft: '10px',
        },
        selectedCategory: {
            fontSize: theme.typography.pxToRem(16),
            fontWeight: theme.typography.fontWeightBold,
            color: theme.palette.primary.dark,
            display: 'flex',
            alignItems: 'center',
            paddingLeft: '10px',
        },
        details: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular,
            paddingLeft: '15px',
        },
        button: {
            margin: theme.spacing(1),
            marginLeft: '5px',
        },
        menu: {
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        },
        editBtn: {
            marginLeft: '-15px',
            width: '20px',
        },
    }),
);

export type CategoryType = {
    id: number
    name: string
    subCategory: Array<CategoryType>
}

export default function Categories() {
    const categories = useSelector<AppRootStateType, CategoryType[]>((state) => state.categories)
    const dispatch = useDispatch()
    const categoryClickId = useSelector<AppRootStateType>((state) => state.app.categoryClickedId)
    const [categoryFocus, setIsCategoryFocus] = useState(0)
    // console.log('isCategoryFocus ' + categoryFocus)

    const classes = useStyles();

    const categoryHandle = (id: number) => {
        dispatch(setCategoryClickedId(id))
    }

    const showEditCategory = (categoryId: number) => categoryFocus === categoryId
        && <EditCategoryMenu categoryFocusId={categoryFocus}/>


    const showCategories = categories.map((el, key) => {
        return <Accordion
            key={key}
        >

            <AccordionSummary
                {...(el.subCategory.length !== 0 && {expandIcon: <ExpandMoreIcon/>})}
                // className={classes.accordionSummary}
                aria-controls="panel1a-content"
                id="panel1a-header"
                onClick={() => categoryHandle(el.id)}
                onMouseEnter={() => setIsCategoryFocus(el.id)}
                onMouseLeave={() => setIsCategoryFocus(0)}
            >
                <div className={classes.editBtn}>
                    {showEditCategory(el.id)}
                </div>
                <Typography className={categoryClickId === el.id ? classes.selectedCategory : classes.heading}>
                    {el.name}
                </Typography>

            </AccordionSummary>
            {el.subCategory.length !== 0 && el.subCategory.map((sub, key) => {
                return <AccordionDetails
                    style={{cursor: 'pointer'}}
                    onClick={() => categoryHandle(sub.id)}
                    key={key}
                    onMouseEnter={() => setIsCategoryFocus(sub.id)}
                    onMouseLeave={() => setIsCategoryFocus(0)}
                >
                    <div className={classes.editBtn}>
                        {showEditCategory(sub.id)}
                    </div>
                    <Typography className={categoryClickId === sub.id ? classes.selectedCategory : classes.heading}>
                        {sub.name}
                    </Typography>
                </AccordionDetails>
            })}
        </Accordion>
    })

    return (
        <div className={classes.root}>
            <Paper>
                {showCategories}
            </Paper>
        </div>
    );
}

