import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Component, { TableForms, MkHeader } from 'fck-table-forms' 
import './style.css'

export const TEST_HEADERS: TableForms.Header[] = [   
    MkHeader("EAN *", "ean", "text", 2),
    MkHeader("Especificação *", "specification", "text", 4), 
    MkHeader("Outro *", "outro", "text", 3), 
    MkHeader("Mais um *", "maisum", "text", 3), 
   /*  MkHeader("Marca *", "brand", "select", 3, []),  */
]
 
const App = () =>{
    const [ data, setData ] = useState([])
    const handleEmitData = (data: any) =>{
        setData(data)
    }
    return (
        <div className='fck-examples'> 
            <h1> fck-table-forms</h1>
            <h3> GitHub Repository:
                <a target="__blank" href={"https://github.com/fonsecaBarreto/fck-table-forms"}> @fonsecaBarreto/fck-table-forms </a>
            </h3>
            
            <Component entries={[{}]} headers={TEST_HEADERS}/> 
        </div>
    )
}

ReactDOM.render(<React.StrictMode> <App></App></React.StrictMode>, document.getElementById("root") );





