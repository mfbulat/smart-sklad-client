import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {useFormik} from "formik";
import {CategoryType} from "../Categories/Categories";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {ProductType} from "./ProductsBody";
import {addProduct, updateProduct} from "../../state/products-reducer";

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
    code?: string
    qt?: number
    purchasePrice?: number
    salePrice?: number
}

type addProductType = {
    close: () => void
    product?: ProductType
}

export default function AddProduct(props: addProductType) {
    const classes = useStyles();
    const categories = useSelector<AppRootStateType, Array<CategoryType>>(state => state.categories)
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: (props.product ? props.product : {
            id: '',
            categoryId: 1,
            name: '',
            code: '',
            supplierCode: '',
            unit: 'шт',
            qt: 0,
            purchasePrice: 0,
            salePrice: 0,
        }) as ProductType,
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.name) {
                errors.name = 'Required';
            }
            if (!values.code) {
                errors.code = 'Required';
            }
            return errors;
        },
        onSubmit: values => {
            //TODO Написпть нормально  props.product?.id
            props.product?.id === '' ? dispatch(addProduct(values)) : dispatch(updateProduct(values))
            formik.resetForm()
            props.close()
        },
    })

    const showCategoriesSelect = () => {
        return categories.map((el, key) => {
            const items = el.subCategory.map((sub, key) => {
                return <MenuItem key={key} value={sub.id}><span style={{paddingLeft: 10}}>{sub.name}</span></MenuItem>
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
                        <Grid item xs={12} sm={6}>
                            <FormControl size='small' variant="outlined" fullWidth>
                                <InputLabel htmlFor="outlined-age-native-simple">Категория</InputLabel>
                                <Select
                                    id="outlined-age-native-simple"
                                    name='categoryId'
                                    label="Категория"
                                    value={formik.values.categoryId}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    {showCategoriesSelect()}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl size='small' variant="outlined" fullWidth>
                                <InputLabel htmlFor="outlined-age-native-simple">ед. измерения</InputLabel>
                                <Select
                                    id="outlined-age-native-simple"
                                    name='unit'
                                    label="ед. измерения"
                                    value={formik.values.unit}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <MenuItem value='шт'>шт</MenuItem>
                                    <MenuItem value='пара'>пара</MenuItem>
                                    <MenuItem value='комп'>комп</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="off"
                                name="code"
                                variant="outlined"
                                required
                                fullWidth
                                id="code"
                                label="Код"
                                size='small'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.code}
                                error={formik.values.code === '' && formik.touched.code}
                                helperText={formik.touched.code && formik.errors.code}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="supplierCode"
                                label="Артикул"
                                name="supplierCode"
                                autoComplete="off"
                                size='small'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.supplierCode}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                type="number"
                                autoComplete="off"
                                name="salePrice"
                                variant="outlined"
                                fullWidth
                                id="salePrice"
                                label="Закупочная Цена"
                                size='small'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.salePrice}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                type="number"
                                variant="outlined"
                                fullWidth
                                id="purchasePrice"
                                label="Цена продажи"
                                name="purchasePrice"
                                autoComplete="off"
                                size='small'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.purchasePrice}
                            />
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
