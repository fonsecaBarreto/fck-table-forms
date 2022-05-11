import React, { useEffect, useState } from 'react'
import '../../../styles/cell-input.css'

export namespace CellInput {
    export type Params = {
        name: string, 
        value: string,
        onInput: any,
        list?: any,
        placeHolder?: string,
        error?: any,
        convert?: string
    }
}

export const SelectionInput: React.FunctionComponent<any> = ({ value, name, list, onInput }) => {

    const [ options, setOptions ] = useState<any[]>([])

    useEffect(()=>{
        setOptions(()=>{
            let ops = list.map((l: any)=>({ value: l[0], label: l[0]}))
            return [ {value: "", label: "Nenhum selecionado"}, ...ops]
        })
    }, list)

    return (
        <React.Fragment>  
            <select onChange={ (e: any)=> onInput(name, e.target.value) } value={value}>
                { options.map((b: any, i :number)=>( <option key={i} value={b.value}> {b.label}</option> ))}
            </select>                
        </React.Fragment>
    )
}

export const TextInput: React.FunctionComponent<any> = ({ placeHolder, value, name, onInput, type}) => {
    return (
        <React.Fragment>
            <input type={type} placeholder={placeHolder ?? ""} value={value} onInput={(e: any)=>onInput(name, e.target.value)}></input> 
        </React.Fragment>
    )
}

/* export const DatePicker: React.FunctionComponent<any> = ({ value, name, onInput}) => {
    return (
        <React.Fragment>
            <input type="date" value={value} onInput={(e: any)=>onInput(name, e.target.value)}></input> 
        </React.Fragment>
    )
} */

export const CellInput: React.FunctionComponent<CellInput.Params> = ({ error, list, convert, ...rest }) =>{
    return (
        <div className={`m-form-row-input ${error ? "error": ""}`} > 
            <React.Fragment >
                {list ? 
                    <SelectionInput {...rest} list={list}></SelectionInput> :
                    <TextInput { ...rest} type={convert ?? "text"}></TextInput>
                }
            </React.Fragment>
           {/*  { error && <span className={`float-status-error`}> <RiErrorWarningLine/> </span> }  */}
        </div>  
    )
}

export default CellInput 


