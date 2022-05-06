
import React, { useEffect, useRef, useState } from 'react'
import './styles/main.css'
import HeaderRow from './Table/Rows/HeaderRow'
import InputRow from './Table/Rows/BodyRow'
import { normalizeEntries, normalizeSingleEntry, serializeErrors } from './normalize'
import ErrorLogPanel from './LogPanel'
import { TableForms } from './protocols'
export * from "./protocols"

export const TableFormsComponent: React.FunctionComponent<TableForms.Params> = ({ entries, errors, headers, onChange }) =>{
    if(!headers) return <div> Carregando Tabela... </div>

    const [ data, setData ] = useState<TableForms.Data>([])
    const [ parsedErrors, setParsedErrors ] = useState<TableForms.Errors>({})
    /* Ao entrar data deve ser sanitizada, de movo a ganhar uma identificação unica */
    useEffect(()=> { if(entries){ setData(normalizeEntries(entries, headers)); }}, [entries])
    /* Erros devem da mesma forma serem serializados para sincronizar com suas respectivas referencias de dados */
    useEffect(()=> { if(errors) setParsedErrors(serializeErrors(errors, data))},[errors])
    /* Quando data é alterado, seus valores são emitidos para o componente externo */
    useEffect(()=> { onChange && onChange(data) },[data]) 

    /* Adiciona uma nova linha normalizada */
    const addNewRow = () => {
        setData((prev:any[]) => [ normalizeSingleEntry({}, headers), ...prev ])
    }

    /* subistitui linha ao indice x */
    const pushRow = (index: number, data: any) =>{
        setData((prev:any[]) => {
            var result_list = [ ...prev ]; result_list.splice(index, 1, data);
            return result_list;
        })
    }

    /* Remove linha ao indice x */
    const removeRow = (index: number) =>{
        setData((prev:any[]) => {
            var result_list = [ ...prev ]; result_list.splice(index, 1);
            return result_list;
        })
    }

    const handleActions = ( key:string, p: any) =>{ 
        switch(key){
            case "PUSH":{ 
                if( p.data == null ) return addNewRow();
                pushRow(p.index, p.data);
            };break;
            case "REMOVE": removeRow(p.index);break;
            case "CLEAR": setData((prev: any) => (normalizeEntries([{}], headers)));break;
            default: console.log("-");
        }
    }
    return (
        <React.Fragment>
            <div className={`table-forms ${false? "freeze": ""}`}>
                <section className='mform-grid'>
                    <HeaderRow headers={headers} onChange={handleActions}></HeaderRow> 
                    { data.map((d: any, i: number)=>(
                        <InputRow errors={ parsedErrors?.[d.key] } index={i+1} key={d.key}
                            onChange={ (k,p)=>handleActions(k,{index:i,data: p})  } headers={headers} entry={d}>
                        </InputRow>
                    ))} 
                </section> 
            </div>  
            <ErrorLogPanel errors={parsedErrors}></ErrorLogPanel>
        </React.Fragment>
    )
}

export default TableFormsComponent