
import React, { useEffect, useState } from 'react'
import './style.css'
/* Paginas */
import MapaEstados from './Mapa/Brasil-Estados'
import CidadesPage from './CidadeUf'
import { Abrangencia, EstadoIBGE } from '@/core'
import { UF_LIST } from './Mapa/UFS'

export namespace SelectorComponent{
    export type Params = {
        emitData: (arg: any) => void,
        initialData?: Abrangencia
    }
}

export const SelectorComponenet: React.FunctionComponent<SelectorComponent.Params> = ({ emitData, initialData=[] }) =>{

    const [ selectedUF, setSelectedUF ] = useState<UF_LIST | null>(null)
    const [ abrengencia, setAbrengencia ] = useState<Abrangencia>([]) 
    const [ page, setPage ] = useState(0) 

    useEffect(() => { console.log("nova dados iniciais"); setAbrengencia(initialData) },[initialData]);
    useEffect(() => { emitData(abrengencia) },[ abrengencia ]);
    useEffect(() => { setPage(!selectedUF ? 0 : 1) },[ selectedUF ])

    const after = (cidades_result?: string[]) =>{
        if(!cidades_result) return setSelectedUF(null);
        const id = selectedUF?.id;
        var payload: any = { id, cidades: cidades_result };
        setAbrengencia((prev: any)=>{
            var new_state = [ ...prev]
            let indexExists = ( prev.findIndex((s:any)=> s.id == id));
            if (indexExists == -1) new_state.push(payload)
            else { new_state.splice(indexExists, 1, payload)}
            return new_state; 
        })
        return setSelectedUF(null) // it will go backwats to map page */
    }

    return (
        <div className='react-fck-br-location-selector'>
            <SelectorCarousel index={page}>
                <MapaEstados current_state={abrengencia} onClick={setSelectedUF}/>
                <CidadesPage current_state={abrengencia} id={ (selectedUF?.id) ? selectedUF.id : -1} onEnd={after} ></CidadesPage> 
            </SelectorCarousel>
        </div>
    )
}

export const SelectorCarousel: React.FunctionComponent<any> = ({ children, index=0 }) =>{
    return (
        <div className='react-fck-br-location-selector-carousel-frame'>
            { React.Children.map(children, (x,i) =>{ 
                  if(index === i ) return <React.Fragment key={i}> {(x)} </React.Fragment>
            })}
        </div>
    )
}

export default SelectorComponenet
