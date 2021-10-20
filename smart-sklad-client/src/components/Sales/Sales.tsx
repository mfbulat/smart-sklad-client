import React from 'react'
import ComponentsHeader from '../common/ComponetsHeader'
import SalesHeaderButtons from './SalesHeaderButtons'
import SalesBody from './SalesBody'

const Sales = () => {
    return (
        <div>
            <ComponentsHeader title={'Отгрузки'}><SalesHeaderButtons/></ComponentsHeader>
            <SalesBody/>
        </div>
    )
}

export default Sales;