import {combineReducers, createStore} from "redux";
import {productsReducer} from "./products-reducer";
import {categoriesReducer} from "./categories-reducer";
import {appReducer} from "./app-reducer";


const rootReducer = combineReducers({
    products: productsReducer,
    categories: categoriesReducer,
    app: appReducer,
})

export const store = createStore(rootReducer)
export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;