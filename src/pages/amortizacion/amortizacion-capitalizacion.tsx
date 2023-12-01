import React, { useState } from 'react'
import AmortizacionComponent from './amortizacion';
import CapitalizacionComponent from './capitalizacion';


const amortizacionTab = {
    id: 'amortizacion',
    label: 'Amortización',
};
const capitalizacionTab = {
    id: 'capitalizacion',
    label: 'Capitalización',
};

const tabOptions = [
    amortizacionTab,
    capitalizacionTab
];

const AmortizacionCapitalizacionComponent:React.FC = () => {

    const [selectedTab, setSelectTab] = useState(amortizacionTab.id);


    const setAnotherTabDefault = (tabId: string) => {
        setSelectTab(tabId);
    };

  return (
    <>
      
        {
            <AmortizacionComponent />
        }
    </>
  )

}

export default AmortizacionCapitalizacionComponent