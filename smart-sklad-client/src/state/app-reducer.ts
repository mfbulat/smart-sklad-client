import {ProductType} from "../components/Products/ProductsBody";

export type AppStateType = {
    categoryClickedId: number
    selectedItemsId: Array<string>
    showAddProduct: boolean
    showUpdateProduct: boolean,
    showAddGroup: boolean
    categoryIdForChange: number
    initialStateAddProduct: ProductType
    saleDocumentId: number
}

const initialState: AppStateType = {
    categoryClickedId: 0,
    selectedItemsId: [],
    showAddProduct: false,
    showUpdateProduct: false,
    showAddGroup: false,
    categoryIdForChange: 0,
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
    saleDocumentId: 1,
}

export const appReducer = (state = initialState, action: ActionsType): AppStateType => {
    switch (action.type) {
        case 'SET_CATEGORY_CLICKED_ID':
            return {...state, categoryClickedId: action.id}
        case 'SET_SELECTED_ITEMS_ID':
            return {...state, selectedItemsId: action.productsId}
        case 'SET_SHOW_ADD_PRODUCT':
            return {...state, showAddProduct: action.showAddProduct}
        case 'SET_SHOW_UPDATE_PRODUCT':
            return {...state, showUpdateProduct: action.showUpdateProduct}
        case 'SET_SHOW_ADD_GROUP':
            return {...state, showAddGroup: action.showAddGroup}
        case "SET_CATEGORY_ID_FOR_CHANGE":
            return {...state, categoryIdForChange: action.id}
        case "SET_SALE_DOCUMENT_ID":
            return {...state, saleDocumentId: action.id}
        default:
            return {...state}
    }
}

export const setCategoryClickedId = (id: number) => ({type: 'SET_CATEGORY_CLICKED_ID', id} as const)
export const setSelectedItemsId = (productsId: Array<string>) => ({type: 'SET_SELECTED_ITEMS_ID', productsId} as const)
export const setShowAddProduct = (showAddProduct: boolean) => ({type: 'SET_SHOW_ADD_PRODUCT', showAddProduct} as const)
export const setShowUpdateProduct = (showUpdateProduct: boolean) => ({
    type: 'SET_SHOW_UPDATE_PRODUCT',
    showUpdateProduct
} as const)
export const setShowAddGroup = (showAddGroup: boolean) => ({type: 'SET_SHOW_ADD_GROUP', showAddGroup} as const)
export const setCategoryIdForChange = (id: number) => ({type: 'SET_CATEGORY_ID_FOR_CHANGE', id} as const)
export const setSaleDocumentId = (id: number) => ({type: 'SET_SALE_DOCUMENT_ID', id} as const)

export type SetCategoryClickedIdActionType = ReturnType<typeof setCategoryClickedId>
export type SetSelectedItemsIdActionType = ReturnType<typeof setSelectedItemsId>
export type SetShowAddProductActionType = ReturnType<typeof setShowAddProduct>
export type SetShowUpdateProductActionType = ReturnType<typeof setShowUpdateProduct>
export type SetShowShowAddGroupActionType = ReturnType<typeof setShowAddGroup>
export type SetCategoryIdForChangeActionType = ReturnType<typeof setCategoryIdForChange>
export type SetSaleDocumentIdActionType = ReturnType<typeof setSaleDocumentId>

type ActionsType =
    | SetCategoryClickedIdActionType
    | SetSelectedItemsIdActionType
    | SetShowAddProductActionType
    | SetShowUpdateProductActionType
    | SetShowShowAddGroupActionType
    | SetCategoryIdForChangeActionType
    | SetSaleDocumentIdActionType
