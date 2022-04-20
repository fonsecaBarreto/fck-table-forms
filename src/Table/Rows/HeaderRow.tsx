import React from 'react'
import "../../styles/header-row.css"
import TableRow from './TableRow'
import { AiOutlinePlusSquare, AiOutlineClear } from 'react-icons/ai'
import TableForms from '../..'

export namespace HeaderRow {
    export type Params = {
        headers: TableForms.Header[], 
        onChange?: (key:string, p?: any) => void
    }
}

export const HeaderRow: React.FunctionComponent<HeaderRow.Params>= ({ headers, onChange }) =>(
    <TableRow columns={headers.length} isHeader>
        <React.Fragment> </React.Fragment>
        <React.Fragment>
            <button onClick={() => onChange && onChange("ADD")}>
                <AiOutlinePlusSquare />
            </button>
        </React.Fragment>
        <React.Fragment>
            {headers.map((h: any, i: number) => (
                <div key={i} style={{ gridColumn: `span ${h.columns ?? 3}` }}>
                     {h.label}
                </div>
            ))}
        </React.Fragment>
        <React.Fragment>
            <button onClick={() => onChange && onChange("CLEAR")}>
                <AiOutlineClear />
            </button>
        </React.Fragment>
    </TableRow>
    // className="mform-header" 
)

export default HeaderRow