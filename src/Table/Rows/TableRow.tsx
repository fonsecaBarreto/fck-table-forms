import React, { ReactNode, useEffect } from 'react'
import '../../styles/table-row.css'

export namespace TableRow {
    export type Params = {
        columns: number, 
        children: any,
        isHeader?: boolean, 
        freeze?: boolean 
        warning?: boolean
    }
}
export const TableRow: React.FunctionComponent<TableRow.Params> = ({ columns, children, isHeader=false, freeze=false, warning= false }) =>{
    return (
        <div className={`mform-row ${isHeader ? 'mform-header' : '' } ${freeze? "freeze" : ""} ${warning ? "warning" : ""}`}>
            { 
                React.Children.map(children, (x: ReactNode,i) =>(
                    <section key={i} 
                        style={ i != 2 ? {} : { gridTemplateColumns: `repeat(${columns * 3}, 1fr)` } }> 
                        {x} 
                    </section>
                ))
            }         
        </div>
    )
}

export default TableRow