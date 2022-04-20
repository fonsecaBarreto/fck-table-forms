
import React, { useEffect, useState } from 'react'
import './styles/main.css'
import HeaderRow from './Table/Rows/HeaderRow'
import InputRow from './Table/Rows/BodyRow'
import { normalizeEntries, normalizeSingleEntry } from './normalize'
/* Paginas */

export namespace TableForms{
    export type Header = {  
        label: string, value: string, columns?: number, 
        type?: string | "text" | "select", 
        list?: {label: string, value: string}[]
    }
    export type Params = {
        entries: any[]
        errors: any,
        headers: Header[],
        onChange?: any
    }
}

export const MkHeader = (label: string ="", value="", type="text", columns=1, list =[]): TableForms.Header =>{
    return ({ label, value, type, columns, list })
}

export const TableForms: React.FunctionComponent<TableForms.Params> = ({ entries=[], errors, headers, onChange }) =>{
    if(!headers) return <div> Carregando Tabela... </div>
    const [ freeze, setFreeze ] = useState(false);
    const [ data, setData ] = useState<any>([]);

    useEffect(()=> { setData(normalizeEntries(entries, headers)); }, [entries])
    useEffect(()=> onChange && onChange(data),[data])
    const pushDataRow = (index: number, data: any) =>{
        setData((prev:any[]) => {
            var result_list = [ ...prev ];
            if(data) { 
                result_list.splice(index, 1, data);
            }else{
                result_list.splice(index, 1);
            }
            return result_list;
        })
    }

    const handleActions = (key:string, p: any) =>{ 
        console.log(key, p)
        switch(key){
            case "ADD": setData((prev:any)=>( [ normalizeSingleEntry({}, headers) , ...prev ] ));break;
            case "REMOVE": pushDataRow(p.index, null);break;
            case "PUSH": pushDataRow(p.index, p.data);break;
            case "CLEAR": setData((prev: any) => (normalizeEntries([{}], headers)));break;
            default: console.log("nenhuma ação")
        }
    }

    return (
        <div className={`table-forms ${freeze? "freeze": ""}`}>
           <section className='mform-grid'>
           <HeaderRow headers={headers} onChange={handleActions}></HeaderRow> 
                { data.map((d: any, i: number)=>(
                    <InputRow errors={errors} index={i+1} onChange={(k,p)=>handleActions(k,{index:i,data: p})} key={d.key} headers={headers} entry={d}></InputRow>
                ))} 
           </section> 
        </div>
    )
}

export default TableForms



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
    