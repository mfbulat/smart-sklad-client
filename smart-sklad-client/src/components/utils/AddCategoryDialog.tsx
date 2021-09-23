import Dialog from '@material-ui/core/Dialog/Dialog';
import React from 'react';
import {DialogTitle} from "@material-ui/core";
import AddCategory from "../Categories/AddCategory";
import {CategoryType} from "../Categories/Categories";

type AddPoductDialog = {
    dialogTitle: string
    showAddGroup: boolean
    onAddGroup: () => void
    category?: CategoryType
}

const AddCategoryDialog = (props: AddPoductDialog) => {
    // let opts = {
    //     close: props.onAddProduct,
    //     product: props.product
    // }
    return (

        <Dialog open={props.showAddGroup}
                onClose={props.onAddGroup}
                aria-labelledby='add-product-popup'>
            <DialogTitle style={{textAlign: 'center'}} id='add-product-popup'>
                {props.dialogTitle}
            </DialogTitle>
            <AddCategory {...props.category ? {close: props.onAddGroup, category: props.category} :{close: props.onAddGroup}}/>
            {/*<AddProduct {...opts}/>*/}
            {/*<AddProduct close={props.onAddProduct} product={props.product}/>*/}
        </Dialog>

    );
};

export default AddCategoryDialog;