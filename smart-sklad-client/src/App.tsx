import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import Header from "./components/Header/Header";
import Products from "./components/Products/Products";
import Sales from "./components/Sales/Sales";
import Receivings from "./components/Receivings/Receivings";
import Sale from "./components/Sales/Sale/Sale";
import {useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';


function App() {
    const saleDocumentId = useSelector<AppRootStateType, number>(state => state.app.saleDocumentId)

    return (
        <div>
            <Header/>
            <Switch>
                <Route exact path={'/'} render={() => <Products/>}/>
                <Route path={'/products'} render={() => <Products/>}/>
                <Route path={'/sales'} render={() => <Sales/>}/>
                <Route path={'/receivings'} render={() => <Receivings/>}/>
                <Route path={'/sale'} render={() => <Sale saleDocumentId={saleDocumentId}/>}/>
                <Route path={'/addSale'} render={() => <Sale/>}/>
                {/*<Route path={'/addProduct'} render={() => <AddProduct/>}/>*/}
                <Redirect from={'*'} to={'/404'}/>
            </Switch>


        </div>
    );
}

export default App