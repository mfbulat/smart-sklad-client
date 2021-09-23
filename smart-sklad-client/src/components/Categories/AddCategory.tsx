import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {useFormik} from "formik";
import {CategoryType} from "./Categories";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {addCategory, removeCategoryAC, renameCategory} from "../../state/categories-reducer";

const useStyles = makeStyles((theme) => ({
    container: {
        overflow: "hidden"
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

type FormikErrorType = {
    name?: string
}

type addCategoryType = {
    close: () => void
    category?: CategoryType
}

export default function AddCategory(props: addCategoryType) {
    const classes = useStyles();
    const categories = useSelector<AppRootStateType, Array<CategoryType>>(state => state.categories)
    const dispatch = useDispatch()

    const findParentCategory = (id: number) => {
        let result = 0
        categories.forEach(el => {
            el.id === id
                ? result = 0
                : el.subCategory.forEach(sub => {
                    if (sub.id === id) {
                        result = el.id
                    }
                })
        })
        return result
    }

    const momorizeSelectedCategoryId = props.category ?findParentCategory(props.category.id) :0

    const formik = useFormik({
        initialValues: (props.category
            ? {...props.category, selectedCategoryId: momorizeSelectedCategoryId}
            : {
                id: 0,
                name: '',
                subCategory: [],
                selectedCategoryId: 0,
            }),
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.name) {
                errors.name = 'Required';
            }
            return errors;
        },
        onSubmit: values => {
            const newCategory = {
                id: values.id,
                name: values.name,
                subCategory: props.category ?props.category.subCategory :[],
            } as CategoryType


            if (props.category){
                if (props.category?.name !== newCategory.name && momorizeSelectedCategoryId === values.selectedCategoryId) {
                    dispatch(renameCategory(newCategory.name, newCategory.id))
                } else {
                    dispatch(removeCategoryAC(values.id))
                    dispatch(addCategory(newCategory, values.selectedCategoryId))
                }
            } else {
                dispatch(addCategory(newCategory, values.selectedCategoryId))
            }


            formik.resetForm()
            props.close()
        },
    })

    const showCategoriesSelect = () => {
        return categories.map((el, key) => {
            const items = el.subCategory.map((sub, key) => {
                return <MenuItem key={key} value={sub.id} disabled><span
                    style={{paddingLeft: 10}}>{sub.name}</span></MenuItem>
            })
            return [<MenuItem key={key} value={el.id}><span style={{
                color: 'darkgray',
                fontStyle: 'italic',
                fontWeight: 'bolder'
            }}>{el.name}</span></MenuItem>, items]
        })
    }


    return (
        <Container component="main" className={classes.container}>
            <div className={classes.paper}>
                <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Наименование"
                                name="name"
                                autoComplete="off"
                                size='small'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                                error={formik.values.name === '' && formik.touched.name}
                                helperText={formik.touched.name && formik.errors.name}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type="number"
                                variant="outlined"
                                required
                                fullWidth
                                id="id"
                                label="id"
                                name="id"
                                autoComplete="off"
                                size='small'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.id}
                                // error={formik.values.id === '' && formik.touched.id}
                                helperText={formik.touched.id && formik.errors.id}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl size='small' variant="outlined" fullWidth>
                                <InputLabel htmlFor="outlined-age-native-simple">Категория</InputLabel>
                                <Select
                                    id="outlined-age-native-simple"
                                    name='selectedCategoryId'
                                    label="Категория"
                                    value={formik.values.selectedCategoryId}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <MenuItem value={0}>
                                        <span style={{paddingLeft: 10}}>...</span>
                                    </MenuItem>
                                    {showCategoriesSelect()}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                size='small'
                            >
                                Сохранить
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="inherit"
                                className={classes.submit}
                                size='small'
                                onClick={props.close}
                            >
                                Отмена
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}
