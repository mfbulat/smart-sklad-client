import {ProductType} from "../components/Products/ProductsBody";
import {SaleDocumentType} from "../components/Sales/SalesBody";

const initialState: Array<SaleDocumentType> = [
    {
        id: '1',
        number: '001',
        time: '123456',
        supplier: 'Yandex',
        sum: 105200,
        paid: 'paid',
        sent: 'sent',
        printed: 'true',
        comment: 'lorem ipsum',
    },
    {
        id: '2',
        number: '002',
        time: '123587',
        supplier: 'MailRu Group',
        sum: 200552,
        paid: 'no paid',
        sent: 'sent',
        printed: 'true',
        comment: 'Mail ru',
    },
    {
        id: '3',
        number: '003',
        time: '1236546',
        supplier: 'Google',
        sum: 220055,
        paid: 'paid',
        sent: 'sent',
        printed: 'true',
        comment: 'lorem ipsum',
    },
    {
        id: '4',
        number: '004',
        time: '123324',
        supplier: 'Apple',
        sum: 105207,
        paid: 'paid',
        sent: 'sent',
        printed: 'true',
        comment: 'I want to buy Imac',
    },
]
export const saleReducer = (state = initialState, action: UnionActionType): Array<SaleDocumentType> => {

    switch (action.type) {

        default:
            return state
    }
}

export const addSaleDocument = (product: ProductType) => ({type: 'ADD_PRODUCT', product} as const)


export type AddSaleDocumentType = ReturnType<typeof addSaleDocument>

export type UnionActionType = AddSaleDocumentType