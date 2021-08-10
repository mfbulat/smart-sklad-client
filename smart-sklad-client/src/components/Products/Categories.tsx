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

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            // width: '250px',
            paddingRight: '10px',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular,
        },
        selectedCategory: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightBold,
            color: theme.palette.primary.dark,
        },
        details: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular,
            paddingLeft: '15px'
        },
    }),
);

export type CategoryType = {
    id: number
    name: string
    subCategory: Array<CategoryType>
}

// let categories: Array<CategoryType> = [
//     {
//         id: 1,
//         name: "Мотозапчасти",
//         subCategory: [
//             {id: 11, name: "Восход", subCategory: []},
//             {id: 12, name: "Минск", subCategory: []},
//             {id: 13, name: "Иж Юпитер, Иж Планета", subCategory: []}
//         ]
//     },
//     {
//         id: 1,
//         name: "Мотозапчасти",
//         subCategory: [
//             {id: 11, name: "Восход", subCategory: []},
//             {id: 12, name: "Минск", subCategory: []},
//             {id: 13, name: "Иж Юпитер, Иж Планета", subCategory: []}
//         ]
//     },
//     {
//         id: 1,
//         name: "Мотозапчасти",
//         subCategory: [
//             {id: 11, name: "Восход", subCategory: []},
//             {id: 12, name: "Минск", subCategory: []},
//             {id: 13, name: "Иж Юпитер, Иж Планета", subCategory: []}
//         ]
//     },
//     {
//         id: 2,
//         name: "Аккумуляторы",
//         subCategory: [
//             {id: 21, name: "АКБ Россия", subCategory: []},
//             {id: 22, name: "АКБ импорт", subCategory: []},
//         ]
//     },
//     {
//         id: 3,
//         name: "Петрошина",
//         subCategory: []
//     }
// ]

export default function Categories() {
    const categories = useSelector<AppRootStateType, CategoryType[]>((state)=>state.categories)
    const dispatch = useDispatch()
    const categoryClickId = useSelector<AppRootStateType>((state)=> state.app.categoryClickedId)

    const classes = useStyles();

    // const [categoryClickId, setCategoryClickId] = useState(0)

    const categoryHandle = (id: number) => {
        // setCategoryClickId(id)
        dispatch(setCategoryClickedId(id))
    }

    // console.log(categoryClickId)

    const showCategories = categories.map((el, key) => {
        return <Accordion key={key} {...(el.subCategory.length === 0 && {expanded: false})}>
            <AccordionSummary
                {...(el.subCategory.length !== 0 && {expandIcon: <ExpandMoreIcon/>})}
                aria-controls="panel1a-content"
                id="panel1a-header"
                onClick={() => categoryHandle(el.id)}
            >
                <Typography
                    className={categoryClickId === el.id ? classes.selectedCategory : classes.heading}>{el.name}</Typography>
            </AccordionSummary>
            {el.subCategory.length !== 0 && el.subCategory.map((sub, key) => {
                return <AccordionDetails style={{cursor: 'pointer'}} onClick={() => categoryHandle(sub.id)} key={key}>
                    <Typography
                        className={categoryClickId === sub.id ? classes.selectedCategory : classes.heading}>{sub.name}</Typography>
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

