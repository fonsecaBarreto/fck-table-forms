import React, { useEffect, useRef, useState } from 'react'
import { TableForms } from '../../protocols'
import CellInput from '../Cells/Inputs'
import TableRow from './TableRow'

export namespace InputRow {
    export type Params = {
        headers: TableForms.Header[], 
        onChange?: (key:string, p?: any) => void,
        entry: any,
        index: number
        errors?: any,
        success?: boolean
    }
}

export const InputRow: React.FunctionComponent<InputRow.Params> = ({ index, headers, onChange, entry, errors={}, success=false}) => {

    const firstRef = useRef(false);
    const [ inputs, setInputs ] = useState(entry)

    useEffect(() => { 
        if(firstRef.current == false) {firstRef.current = true; return;}
        onChange && onChange("PUSH",inputs) 
    },[inputs])

    const handleInputs = (name: string, value: string) => {
        setInputs((prev:any) => ({ ...prev, [name]: value }))
    }

    return (
        <TableRow columns={headers.length} warning={ ( Object.keys(errors).length > 0 ) ? true : false}>
            <React.Fragment>{index}</React.Fragment>
            <React.Fragment>
                <button className={`row-status-btn ${ success ? "success" : ""}`}> 
                    {   
                        ( Object.keys(errors).length > 0 ) 
                        ? <span> &#9888; </span>
                        : success ? <span> &check; </span>
                        : <span> &#9900; </span>
                    } 
                </button>
            </React.Fragment>
            <React.Fragment>
               {   
                    headers.map((h: TableForms.Header, i: number)=> {
                        let { value: name, list, convert } = h
                        return (
                            <div key={i} style={{gridColumn: `span ${h.columns ?? 3}`}}> 
                                 <CellInput convert={convert} list={list} error={errors?.[name]} value={inputs[name]} name={name} onInput={handleInputs}>
                                </CellInput> 
                            </div>
                        )
                    })
                }
            </React.Fragment>
            <React.Fragment> 
                <button onClick={()=>onChange&& onChange("REMOVE")}> &#10006; </button> 
            </React.Fragment>
        </TableRow>
    )
}
export default InputRow


{/* <React.Fragment>
                <button className={`row-status-btn ${success ? "success": ""}`} onClick={()=>onClick(formState)}>
                    <span>
                    {   
                        ( Object.keys(formState.errors.get).length > 0 ) 
                        ? <RiErrorWarningLine/> 
                        : success ? <AiOutlineCloudSync/>
                        :<AiOutlineCheckCircle/>    
                    } 
                    </span>
                </button>
            </React.Fragment> */}