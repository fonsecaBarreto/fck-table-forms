
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



/*  const data = useData([]) */
/*  useEffect(()=>{ 
        trigger.setCallBack( async ()=>{ 
            setFreeze(true)
            counter.setCount(0);
            while(counter.getCount() < data.get().length){
                await new Promise(res=>{ setTimeout(()=>res(true),100)})
            }
            setFreeze(false)
            return { data: data.get(), conflicts, checkList }
        }) 
    },[data, checkList, conflicts ])

    useEffect(()=>{ 
        var final_data = normalizeEntries(entries, headers) 
        data.set(final_data)
        counter.setCount(final_data.length)
    }, [entries])

    const addBlankData = () =>{ 
        var prev = [ normalizeSingleEntry({}, headers), ...data.get()]
        data.set(prev)
        counter.setCount(counter.getCount()+1)
    }

    const rmDataFrom = (index:number) =>{
        var prev = [ ...data.get()]
        prev.splice(index, 1)
        data.set(prev)
        counter.setCount(counter.getCount()-1)
    }

    const validateData = async (object: any): Promise<SchemaValidator.Errors | null> =>{
        return await validator.validate(schema, object);
    }

    const onDataEmited = async ( data_entry: any ) =>{
        var localData = [ ...data.get() ]
        const indexof = localData.findIndex((v:any)=>v._id==data_entry._id);
        const count = counter.getCount() + 1;
        localData.splice(indexof, 1, data_entry);
        data.set(localData);
        counter.setCount(count)   
    }

    const itemClick = (formState: any) =>{
        console.log("Item clicado")
        context.dialog.push(MakeDialogConfig( ({onAction}) =>(
                <FormModal 
                        onAction={onAction} 
                        initial_errors={formState.errors.get} 
                        initial_data={formState.data.get} 
                        headers={headers}>
                </FormModal>
            ), (data) =>{
                if(data !== -1){ formState.data.set(data); }
                return -1;
            }, "Editar Item")
        )
    } */
    