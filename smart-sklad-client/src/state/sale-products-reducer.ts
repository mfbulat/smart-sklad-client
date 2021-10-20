
export type ReceivingProductsType = {
    [key: number]: Array<{ name: string, unit: string, qt: number, price: number, sum: number, }>
}

const initialState: ReceivingProductsType = {
    [1]: [
        {
            name: 'Orange',
            unit: 'шт',
            qt: 5,
            price: 215,
            sum: 1075,
        },
        {
            name: 'Apple',
            unit: 'шт',
            qt: 5,
            price: 20,
            sum: 100,
        },
        {
            name: 'Cucumber',
            unit: 'пара',
            qt: 2,
            price: 30,
            sum: 60,
        },
    ],
    [2]: [
        {
            name: 'Orange',
            unit: 'шт',
            qt: 5,
            price: 215,
            sum: 1075,
        },
        {
            name: 'Spaghetti',
            unit: 'шт',
            qt: 3,
            price: 20,
            sum: 60,
        },
        {
            name: 'Milk',
            unit: 'in',
            qt: 2,
            price: 50,
            sum: 100,
        },
    ],
}

export const saleProducts = (state = initialState, action: UnionActionType): ReceivingProductsType => {
    switch (action.type) {

        default:
            return state
    }
}

export const addReceivingProduct = () => ({type: 'ADD_RECEIVING_PRODUCT'} as const)


export type addReceivingProductType = ReturnType<typeof addReceivingProduct>

export type UnionActionType = addReceivingProductType