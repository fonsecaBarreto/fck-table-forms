

import React, { useEffect, useState } from 'react'
import '../cidades.css'
import { get_regioes, get_municipios_uf } from '../../core/ibge-services'  
import { Abrangencia } from '../'
/* Ao clicar deve selecionar multiplos tal e enviar com o função onEnd */
const CidadesPage = ({id, entry, onEnd}:{ id: number; onEnd:any, entry: Abrangencia | undefined}) =>{

    const [selectedItem, setSelectedItem] = useState<string[]>([])
    const [cidades_ibge, setCidadesIbge] = useState<any>([])

    useEffect(()=>{ 
        console.log("Nova entrada encontrada",  entry)
    },[entry])

    useEffect(()=>{  get_municipios_uf(id).then(setCidadesIbge) },[id])

    const handleClick = (id:any) =>{
        console.log("Trugnn to slseswss ", id)
        setSelectedItem((prev)=>{
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
                <h3> Cidades para o uf { id }  </h3> 
                <input></input> PEsquise aqui
            </section>

            <section>
                { cidades_ibge.map((c:any)=>(
                    <div onClick={() => handleClick(c.id)} key={c.id}>
                        <input readOnly value={c.id} type="checkbox" checked={selectedItem.includes(c.id)}/>
                        <label>{c.nome}</label>
                    </div>
                ))}
            </section>

            <section> 
                <span> Total Selecionado: {selectedItem.length}</span>     
                <button onClick={()=>onEnd(selectedItem)}> Ok</button>   
            </section>       

        </div>
    )
}

export default CidadesPage