import React from 'react';
import ComponentsHeader from "../../common/ComponetsHeader";
import SaleHeaderButtons from './SaleHeaderButtons';
import {useForm, SubmitHandler} from "react-hook-form";
import {SaleDocumentType} from "../SalesBody";
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../../state/store';
import {ReceivingProductsType} from '../../../state/sale-products-reducer';

type Gender = {
    female: "female",
    male: "male",
    other: "other",
}

type ReceivingPropsType = {
    saleDocumentId?: number | null
}

const Sale: React.FC<ReceivingPropsType> = ({saleDocumentId}) => {
    const {register, handleSubmit} = useForm<SaleDocumentType>();
    const saleProducts = useSelector<AppRootStateType, ReceivingProductsType>((state) => state.saleProducts)
    const saleDocuments = useSelector<AppRootStateType, Array<SaleDocumentType>>((state) => state.sale)
    const document = saleDocuments.find(el=>+el.id===saleDocumentId)


    const onSubmit: SubmitHandler<SaleDocumentType> = (data) => console.log(data);
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <ComponentsHeader>
                    <SaleHeaderButtons/>
                </ComponentsHeader>
                <label>Отгрузка №</label>
                <input {...register("number")} value={document && document.id}/>
                <label>от</label>
                <input {...register("time")} value={document && document.time}/>
                <label>Контрагент</label>
                <input {...register("supplier")} value={document && document.supplier}/>
                <input {...register("paid")} value={document && document.paid}/>

                {/*<label>от</label>*/}
                {/*<select {...register("time")} >*/}
                {/*    <option value="female">female</option>*/}
                {/*    <option value="male">male</option>*/}
                {/*    <option value="other">other</option>*/}
                {/*</select>*/}
                {/*<input type="submit" />*/}
            </form>
            {saleDocumentId && saleProducts[saleDocumentId].map((el, index) => {
                return (
                    <div key={index}>
                        <span>{el.name}</span>
                        <span>{el.unit}</span>
                        <span>{el.qt}</span>
                        <span>{el.price}</span>
                        <span>{el.sum}</span>
                    </div>
                )
            })}
        </div>
    );
};

export default Sale;