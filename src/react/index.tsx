
import React, { useEffect, useState } from 'react'
import './style.css'
/* Paginas */
import MapaEstados from './Mapa/Brasil-Estados'
import CidadesPage from './CidadeUf'

export namespace LocationSelector {
    export type Estato = {id: string, cidades: string[] }
    export type Cidades = string
}

export type Abrangencia = LocationSelector.Estato[]

export const SelectorComponenet: React.FunctionComponent<any> = () =>{
    const [ selectedUF, setSelectedUF ] = useState<any>(null)
    const [ page, setPage ] = useState(0) 
    const [ abrengencia, setAbrengencia ] = useState<Abrangencia[]>([]) 

    useEffect(()=>{ setPage(!selectedUF ? 0 : 1) },[ selectedUF])

    const after = (result?: string[]) =>{
        if(!result) return setSelectedUF(null) // it will go backwats to map page
        const id = selectedUF;
        var payload:any = { id, cidades: result };
        setAbrengencia((prev: any)=>{
            var new_state = [ ...prev]
            let indexExists = (abrengencia.findIndex((s:any)=>s.id == id)) ;
            if (indexExists == -1) new_state.push(payload)
            else { new_state.splice(indexExists, 1, payload)}
            return new_state;
        })
    }


    return (
        <div className='react-fck-br-location-selector'>
            <SelectorCarousel index={page}>
                <MapaEstados entry={abrengencia} onClick={(id:string) => setSelectedUF(id)}/>
                <CidadesPage onEnd={after} id={selectedUF} entry={abrengencia.find((v:any)=>v.id == selectedUF)}></CidadesPage> 
            </SelectorCarousel>
            {JSON.stringify(abrengencia)}
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