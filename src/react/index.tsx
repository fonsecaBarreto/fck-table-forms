
import React, { useEffect, useState } from 'react'
import { get_regioes } from '../core/ibge-services'  

export const SelectorComponenet: React.FunctionComponent<any> = () =>{
  const [ regioes, setRegioes ] = useState([]) 

    useEffect(()=>{
        get_regioes().then(setRegioes)
    },[]) 

    return (
        <div>
            Testando integração aqui
            <h3> A baixo as Regioes do Brasil</h3>
            {JSON.stringify(regioes)}
        </div>
    )
}

export default SelectorComponenet