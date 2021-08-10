import {ProductType} from "../components/Products/ProductsBody";

type AppStateType = {
    categoryClickedId: number
    selectedItemsId: Array<string>
    showAddProduct: boolean,
    initialStateAddProduct: ProductType
}

const initialState: AppStateType = {
    categoryClickedId: 0,
    selectedItemsId: [],
    showAddProduct: false,
    initialStateAddProduct: {
        id: '',
        categoryId: 1,
        name: '',
        code: '',
        supplierCode: '',
        unit: 'шт',
        qt: 0,
        purchasePrice: 0,
        salePrice: 0,
    },
}

export const appReducer = (state = initialState, action: ActionsType): AppStateType => {
    switch (action.type) {
        case 'SET_CATEGORY_CLICKED_ID':
            return {...state, categoryClickedId: action.id}
        case 'SET_SELECTED_ITEMS_ID':
            return {...state, selectedItemsId: action.productsId}
        case 'SET_SHOW_ADD_PRODUCT':
            return {...state, showAddProduct: action.showAddProduct}
        default:
            return {...state}
    }
}

export const setCategoryClickedId = (id: number) => ({type: 'SET_CATEGORY_CLICKED_ID', id} as const)
export const setSelectedItemsId = (productsId: Array<string>) => ({type: 'SET_SELECTED_ITEMS_ID', productsId} as const)
export const setShowAddProduct = (showAddProduct: boolean) => ({type: 'SET_SHOW_ADD_PRODUCT', showAddProduct} as const)

export type SetCategoryClickedIdActionType = ReturnType<typeof setCategoryClickedId>
export type SetSelectedItemsIdActionType = ReturnType<typeof setSelectedItemsId>
export type SetShowAddProductActionType = ReturnType<typeof setShowAddProduct>

type ActionsType =
    | SetCategoryClickedIdActionType
    | SetSelectedItemsIdActionType
    | SetShowAddProductActionType

