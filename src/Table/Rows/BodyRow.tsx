import React, { useEffect, useRef, useState } from 'react'
import { TableForms } from '../../protocols'
import CellInput from '../Cells/Inputs'
import TableRow from './TableRow'
/* icones */
import { GrStatusDisabled, GrStatusUnknown } from 'react-icons/gr'
import { RiErrorWarningLine } from 'react-icons/ri'
import { AiOutlineCheckCircle } from 'react-icons/ai'

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
                        ? <RiErrorWarningLine/> 
                        : success ? <AiOutlineCheckCircle/>
                        :<GrStatusUnknown/>    
                    } 
                </button>
            </React.Fragment>
            <React.Fragment>
               {   
                    headers.map((h: TableForms.Header, i: number)=> {
                        let { value: name, list } = h
                        return (
                            <div key={i} style={{gridColumn: `span ${h.columns ?? 3}`}}> 
                                 <CellInput list={list} error={errors?.[name]} value={inputs[name]} name={name} onInput={handleInputs}>
                                </CellInput> 
                            </div>
                        )
                    })
                }
            </React.Fragment>
            <React.Fragment> 
                <button onClick={()=>onChange&& onChange("REMOVE")}> <GrStatusDisabled/> </button> 
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