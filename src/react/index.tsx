
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

    const [ currentEntry, setCurrentEntry ] = useState<LocationSelector.Estato | null>(null) 
    const [ selectedUF, setSelectedUF ] = useState<number | null>(null)
    const [ page, setPage ] = useState(0) 
    const [ abrengencia, setAbrengencia ] = useState<Abrangencia[]>([]) 

    // Right after a uf were selected 
    useEffect(()=>{ 
        setCurrentEntry(findOutUf())   // Update the current Entry to the edit page
        setPage(!selectedUF ? 0 : 1)   // Change page when a uf is selected
    },[ selectedUF])

    // after the changes where made
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
        return setSelectedUF(null) // it will go backwats to map page
    }
    
    // Find out if the uf exists in the current 'abrangencia'
    const findOutUf = ():LocationSelector.Estato | null => {
        const indexOf = abrengencia.findIndex( (v:any) => v.id === selectedUF);
        if(indexOf === -1) return null;
        const estado: any= abrengencia[indexOf]
        return estado;
    }

    return (
        <div className='react-fck-br-location-selector'>
            <SelectorCarousel index={page}>
                <MapaEstados entry={abrengencia} onClick={(id: number ) => setSelectedUF(id)}/>
                <CidadesPage onEnd={after} id={selectedUF ?? -1} entry={currentEntry}></CidadesPage> 
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