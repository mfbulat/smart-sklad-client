import Dialog from '@material-ui/core/Dialog/Dialog';
import React from 'react';
import {DialogTitle} from "@material-ui/core";
import AddProduct from "../Products/AddProduct";
import {ProductType} from "../Products/ProductsBody";

type AddPoductDialog = {
    dialogTitle: string
    showAddProduct: boolean
    onAddProduct: () => void
    product?: ProductType
}

const AddProductDialog = (props: AddPoductDialog) => {
    let opts = {
        close: props.onAddProduct,
        product: props.product
    }
    return (

        <Dialog open={props.showAddProduct}
                onClose={props.onAddProduct}
                aria-labelledby='add-product-popup'>
            <DialogTitle style={{textAlign: 'center'}} id='add-product-popup'>
                {props.dialogTitle}
            </DialogTitle>
            <AddProduct {...props.product ? {close: props.onAddProduct, product: props.product} :{close: props.onAddProduct}}/>
            {/*<AddProduct {...opts}/>*/}
            {/*<AddProduct close={props.onAddProduct} product={props.product}/>*/}
        </Dialog>

    );
};

export default AddProductDialog;