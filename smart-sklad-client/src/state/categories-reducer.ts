import {ProductType} from "../components/Products/ProductsBody";
import {CategoryType} from "../components/Products/Categories";


export type RemoveProduct = {
    type: "REMOVE_PRODUCT"
    productId: number
}

export type UnionActionType = RemoveProduct


const initialState: Array<CategoryType> = [
    {
        id: 1,
        name: "Мотозапчасти",
        subCategory: [
            {id: 11, name: "Восход", subCategory: []},
            {id: 12, name: "Минск", subCategory: []},
            {id: 13, name: "Иж Юпитер, Иж Планета", subCategory: []}
        ]
    },
    {
        id: 2,
        name: "Аккумуляторы",
        subCategory: [
            {id: 21, name: "АКБ Россия", subCategory: []},
            {id: 22, name: "АКБ импорт", subCategory: []},
        ]
    },
    {
        id: 3,
        name: "Петрошина",
        subCategory: []
    }
]

export const categoriesReducer = (categories=initialState, action: UnionActionType): Array<CategoryType> => {
            return categories
    }


