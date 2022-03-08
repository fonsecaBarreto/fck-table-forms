import React, { useEffect, useState } from 'react'
import { EstadoIBGE, get_estado } from '../../services'
import '../../styles/cidades.css'

const UseIbgeState =({ id }: { id: any }) =>{

    const [ estado_ibge, setEstado_ibge ] = useState<EstadoIBGE | null>(null);
    const [ cidades_ibge, setCidades_ibge] = useState<any[]>([]);
    const [ searchText, setSearchText] = useState("")

    useEffect(()=>{  get_estado(id).then(setEstado_ibge)  },[id])

    useEffect(()=>{ handleFilter() },[estado_ibge])

    const handleFilter = (withText: boolean = false) => 
    {   
        var cidades = estado_ibge?.cidades ?? []
        if(withText == false ) return setCidades_ibge(cidades);

        var text = searchText;
        var sanitized_value = text.toLowerCase().trim();
        var resultado = cidades.filter((x:any) => x.nome.toLowerCase().includes(sanitized_value))
        return setCidades_ibge(resultado);
    }

    return {
        estado_ibge,
        cidades_ibge,
        searchText, setSearchText,
        handleFilter
    }
}

export namespace CidadesPages {
    export type Params = {
        onEnd:any, 
        id: number,
        current_state: any
    }
}

const CidadesPage = ({ id, onEnd, current_state }:CidadesPages.Params) =>{

    const [ selectedList, setSelectedList ] = useState<string[]>([]) // Cidades selecionadas
    const { cidades_ibge, estado_ibge, searchText, setSearchText, handleFilter } = UseIbgeState({ id });

    useEffect( ()=> { 
        const indexOf = current_state.findIndex( (v:any) => v.id === id);
        if(indexOf === -1) return;
        const estado: any= current_state[indexOf];
        return setSelectedList(estado.cidades)
    },[current_state])

    const handleClick = (id:any) =>{
        setSelectedList((prev)=>{
            if(id == -1) {
                if(selectedList.length === cidades_ibge.length) return [];
                var all_selected = cidades_ibge.map((c:any)=>c.id);
                return all_selected
            }
            var prevData: any = [ ...prev ];
            let sliced = prevData.filter((c:any)=> c != id); 
            prevData = sliced.length < prevData.length ? sliced : [ ...prevData, id ] 
            return (prevData)
        }) 
    } 


    if(estado_ibge?.cidades.length == 0 ) return <span> "Loading..." </span> 
    return (
        <div className='cidade-page-container'>
         
            <section>    
                <header>
                    <button onClick={()=>onEnd()}> Voltar </button>
                    <span>{ estado_ibge?.nome }</span>
                </header>
                <div className="cidade-page-container-search-bar" >
                    <input value={searchText} onInput={(e:any)=>setSearchText(e.target.value)}></input> 
                    <button onClick={() => handleFilter(true)}> pesquisar </button>
                </div> 
            </section>

            <section>
                <div className='city-check-box' onClick={() => handleClick(-1)} key={-1}>
                    <input readOnly value={-1} type="checkbox" checked={selectedList.length == cidades_ibge.length}/>
                    <label>Todos</label>
                </div>
                { cidades_ibge.map((c:any)=>(
                    <div className='city-check-box' onClick={() => handleClick(c.id)} key={c.id}>
                        <input readOnly value={c.id} type="checkbox" checked={selectedList.includes(c.id)}/>
                        <label>{c.nome}</label>
                    </div>
                ))} 
            </section>

            <section> 
                <span> Total Selecionado: {selectedList.length}/{cidades_ibge.length }</span>     
                <button onClick={()=>onEnd(selectedList)}> Ok</button>   
            </section>    

        </div>
    )
}

export default CidadesPage