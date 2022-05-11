import React from 'react'
import "../../styles/header-row.css"
import TableRow from './TableRow'

import { TableForms } from '../..'

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
            <button onClick={() => onChange && onChange("PUSH",{ index: 0 , data: null })}>
                &#10010;
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
                C
            </button>
        </React.Fragment>
    </TableRow>
    // className="mform-header" 
)

export default HeaderRow