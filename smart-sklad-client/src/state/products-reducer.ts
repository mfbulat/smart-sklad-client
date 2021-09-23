import {ProductType} from "../components/Products/ProductsBody";
import {v1} from "uuid";

const initialState: Array<ProductType> = [
    {
        id: '1',
        categoryId: 11,
        name: 'Коленвал Восход',
        code: '252',
        supplierCode: 'r-585',
        unit: 'шт',
        qt: 12,
        purchasePrice: 1400,
        salePrice: 1800
    },
    {
        id: '2',
        categoryId: 11,
        name: 'Цилиндр Восход',
        code: '252',
        supplierCode: 'r-585',
        unit: 'шт',
        qt: 15,
        purchasePrice: 2000,
        salePrice: 2500
    },
    {
        id: '3',
        categoryId: 11,
        name: 'Карбюратор Восход',
        code: '252',
        supplierCode: 'r-585',
        unit: 'шт',
        qt: 22,
        purchasePrice: 1000,
        salePrice: 1800
    },
    {
        id: '4',
        categoryId: 11,
        name: 'Амортизатор Восход',
        code: '252',
        supplierCode: 'r-585',
        unit: 'пара',
        qt: 18,
        purchasePrice: 1400,
        salePrice: 1800
    },
    {
        id: '11',
        categoryId: 12,
        name: 'Коленвал Минск',
        code: '252',
        supplierCode: 'r-585',
        unit: 'шт',
        qt: 6,
        purchasePrice: 1400,
        salePrice: 1800
    },
    {
        id: '12',
        categoryId: 12,
        name: 'Цилиндр Минск',
        code: '252',
        supplierCode: 'r-585',
        unit: 'шт',
        qt: 12,
        purchasePrice: 500,
        salePrice: 2000
    },
    {
        id: '13',
        categoryId: 12,
        name: 'Вилки пер Минск',
        code: '252',
        supplierCode: 'r-585',
        unit: 'пара',
        qt: 9,
        purchasePrice: 300,
        salePrice: 600
    },
    {
        id: '25',
        categoryId: 21,
        name: 'АКБ 12',
        code: '252',
        supplierCode: 'r-585',
        unit: 'шт',
        qt: 50,
        purchasePrice: 900,
        salePrice: 1100
    },
    {
        id: '27',
        categoryId: 21,
        name: 'АКБ 6',
        code: '252',
        supplierCode: 'r-585',
        unit: 'шт',
        qt: 60,
        purchasePrice: 900,
        salePrice: 1100
    },
]

export const productsReducer = (products = initialState, action: UnionActionType): Array<ProductType> => {

    switch (action.type) {
        case "ADD_PRODUCT":
            return [{...action.product, id: v1()}, ...products]
        case "UPDATE_PRODUCT":
            return products.map((prod) => prod.id === action.product.id ? action.product : prod)
        case "REMOVE_MULTIPLE_PRODUCTS":
            return products.filter((prod) => {
                let count = true
                action.productsId.forEach(item => {
                    if (item === prod.id) {
                        count = false
                    }
                })
                return count
            })
        case "REMOVE_PRODUCT":
            return products.filter(prod => prod.id !== action.productsId)
        default:
            return products
    }
}

export const addProduct = (product: ProductType) => ({type: 'ADD_PRODUCT', product} as const)
export const updateProduct = (product: ProductType) => ({type: 'UPDATE_PRODUCT', product} as const)
export const removeMultipleProducts = (productsId: Array<string>) => ({
    type: 'REMOVE_MULTIPLE_PRODUCTS',
    productsId
} as const)
export const removeProduct = (productsId: string) => ({type: 'REMOVE_PRODUCT', productsId} as const)

export type AddProductType = ReturnType<typeof addProduct>
export type UpdateProductType = ReturnType<typeof updateProduct>
export type RemoveMultipleProductType = ReturnType<typeof removeMultipleProducts>
export type RemoveProductType = ReturnType<typeof removeProduct>

export type UnionActionType = AddProductType | RemoveProductType | UpdateProductType | RemoveMultipleProductType