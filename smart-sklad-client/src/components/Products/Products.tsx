import React, {CSSProperties, useState} from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from '@material-ui/core/Box';
import Categories from "../Categories/Categories";
import ProductsBody from "./ProductsBody";
import ComponentsHeader from "../common/ComponetsHeader";
import ProductsHeaderButtons from "./ProductsHeaderButtons";

let categoriesStyles = {
    position: 'sticky',
    top: '60px',
    height: '80vh',
    overflowY: 'auto',
} as CSSProperties

const Products = () => {
    let [styles, setStyles] = useState(categoriesStyles);

    window.onscroll = magic

    function magic() {
        if (window.pageYOffset > 60) {
            setStyles({...styles, height: '90vh'})
        }
    }

    return <>
        <ComponentsHeader title='Товары'><ProductsHeaderButtons/></ComponentsHeader>
            <Container fixed>
                <Grid container
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="flex-start"
                >
                    <Box style={styles}>
                        <Categories/>
                    </Box>
                    <Box>
                        <ProductsBody/>
                    </Box>
                </Grid>
            </Container>
        </>
};

export default Products;