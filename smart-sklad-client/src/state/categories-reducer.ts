import {CategoryType} from "../components/Categories/Categories";

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

export const categoriesReducer = (categories = initialState, action: UnionActionType): Array<CategoryType> => {
    switch (action.type) {
        case 'ADD_CATEGORY':
            debugger
            let findSelectedCategoryId = false
            const mapedCategories = categories.map(el => el.id === action.selectedCategoryId
                ? (findSelectedCategoryId = true, {...el, subCategory: [...el.subCategory, action.category]})
                : el)
            return findSelectedCategoryId ? mapedCategories : [...categories, action.category]

        case 'REMOVE_CATEGORY':
            let categoriesCopy: CategoryType[] = []
            for (let i = 0; i < categories.length; i++) {
                if (categories[i].id !== action.categoryId) {
                    let subCategoryCopy: CategoryType[] = []
                    for (let j = 0; j < categories[i].subCategory.length; j++) {
                        if (categories[i].subCategory[j].id !== action.categoryId) {
                            subCategoryCopy.push(categories[i].subCategory[j])
                        }
                    }
                    categoriesCopy = [...categoriesCopy, {...categories[i], subCategory: subCategoryCopy}]
                }
            }
            return categoriesCopy

        case 'RENAME_CATEGORY':
            return categories.map(el => {
                if (action.categoryId === el.id) {
                    return {...el, name: action.categoryName}
                }
                if (el.subCategory.length > 0) {
                    const mappedSubCategories = el.subCategory.map(sub => {
                        if (sub.id === action.categoryId) {
                            return {...sub, name: action.categoryName}
                        }
                        return sub
                    })
                    return {...el, subCategory: mappedSubCategories}
                }
                return el
            })
        default:
            return categories
    }
}

export const addCategory = (category: CategoryType, selectedCategoryId: number) => ({
    type: 'ADD_CATEGORY',
    category,
    selectedCategoryId
} as const)

export const removeCategoryAC = (categoryId: number) => ({
    type: 'REMOVE_CATEGORY',
    categoryId,
} as const)

export const renameCategory = (categoryName: string, categoryId: number) => ({
    type: 'RENAME_CATEGORY',
    categoryName,
    categoryId
} as const)

export type AddCategoryType = ReturnType<typeof addCategory>
export type RemoveCategoryType = ReturnType<typeof removeCategoryAC>
export type renameCategoryType = ReturnType<typeof renameCategory>

export type UnionActionType = AddCategoryType | RemoveCategoryType | renameCategoryType


