
import React, { useEffect, useState } from 'react'
import './styles/main.css'
import { Abrangencia, EstadoIBGE, UF_LIST } from '@/services'
/* Paginas */
import MapaEstados from './pages/mapa'
import CidadesPage from './pages/cidades'

export namespace LocationSelector{
    export type Params = {
        initialData: Abrangencia,
        emitData: (coverage : Abrangencia) => void
    }
}

export const LocationSelector: React.FunctionComponent<LocationSelector.Params> = ({ initialData = [], emitData }) =>{

    const [ page, setPage ] = useState(0) 
    const [ coverage, setCoverage ] = useState<Abrangencia>(initialData) 
    const [ selectedUF, setSelectedUF ] = useState<UF_LIST | null>(null)

    useEffect(() => { setPage(!selectedUF ? 0 : 1) },[ selectedUF ])
    useEffect(() => { emitData(coverage) },[ coverage ]);

    const after = (cidades_result?: string[]) =>{
        if(!cidades_result) return setSelectedUF(null);
        const id = selectedUF?.id;
        var payload: any = { id, cidades: cidades_result };
        setCoverage((prev: any)=>{
            var new_state = [ ...prev]
            let indexExists = ( prev.findIndex((s:any)=> s.id == id));
            if (indexExists == -1) new_state.push(payload)
            else { new_state.splice(indexExists, 1, payload)}
            return new_state; 
        })
        return setSelectedUF(null) 
    } 

    return (
        <div className='react-fck-br-location-selector'>
           <SelectorCarousel index={page}>
                <MapaEstados current_state={coverage} onClick={setSelectedUF}/>
                <CidadesPage current_state={coverage} id={ (selectedUF?.id) ? selectedUF.id : -1} onEnd={after} ></CidadesPage> 
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

export default LocationSelector
