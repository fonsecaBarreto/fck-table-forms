

import React, { useEffect, useState } from 'react'
import '../cidades.css'
import { get_regioes, get_municipios_uf } from '../../core/ibge-services'  
import { LocationSelector } from '../'
/* Ao clicar deve selecionar multiplos tal e enviar com o função onEnd */

const CidadesPage = ({id, entry, onEnd}:{ id: number; onEnd:any, entry: LocationSelector.Estato | null}) =>{

    const [selectedItems, setSelectedItems] = useState<string[]>([])
    const [cidades_ibge, setCidadesIbge] = useState<any>([])

    useEffect(()=>{ 
        // if a empty entry it will continue;
        if(!entry) return; 

         // if the same entry if will do nothing as well
        var cidades_entry = entry.cidades;
        if( cidades_entry.every((value, index) =>(
            value === selectedItems[index]))
        ) return; 
    
        setSelectedItems(cidades_entry)
    },[entry])

    useEffect(()=>{  get_municipios_uf(id).then(setCidadesIbge) },[id])

    const handleClick = (id:any) =>{
        setSelectedItems((prev)=>{
            var prevData: any = [ ...prev ]
            let sliced = prevData.filter((c:any)=> c != id); 
            prevData = sliced.length < prevData.length ? sliced : [ ...prevData, id ] 
            return (prevData)
        })
    }

    if(cidades_ibge.length == 0 ) return <span> "Loading..." </span> 
    return (
        <div className='cidade-page-container'>
            <section>    
                <button onClick={()=>onEnd()}> Voltar </button>
                <h3> Cidades para o uf codigo: { id }  </h3> 
                <div className="cidade-page-container-search-bar" >
                    <input></input> 
                    <button> pesquisar </button>
                </div>
            </section>

            <section>
                { cidades_ibge.map((c:any)=>(
                    <div onClick={() => handleClick(c.id)} key={c.id}>
                        <input readOnly value={c.id} type="checkbox" checked={selectedItems.includes(c.id)}/>
                        <label>{c.nome}</label>
                    </div>
                ))}
            </section>

            <section> 
                <span> Total Selecionado: {selectedItems.length}/{cidades_ibge.length }</span>     
                <button onClick={()=>onEnd(selectedItems)}> Ok</button>   
            </section>       

        </div>
    )
}

export default CidadesPage