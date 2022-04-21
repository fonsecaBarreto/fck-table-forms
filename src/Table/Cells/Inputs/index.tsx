import React from 'react'
import '../../../styles/cell-input.css'
import { RiErrorWarningLine } from 'react-icons/ri'

export namespace CellInput {
    export type Params = {
        name: string, 
        value: string,
        onInput: any,
        placeHolder?: string,
        error?: any
    }
}


export const CellInput: React.FunctionComponent<CellInput.Params> = ({ error, name, value, onInput, placeHolder }) =>{
    return (
        <div className={`m-form-row-input ${error ? "error": ""}`} > 
            <React.Fragment >
                <input placeholder={placeHolder ?? ""} value={value} onInput={(e: any)=>onInput(name, e.target.value)}></input> 
            </React.Fragment>
            { error && <span className={`float-status-error`}> <RiErrorWarningLine/> </span> } 
        </div>  
    )
}

export default CellInput 