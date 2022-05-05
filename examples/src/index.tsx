import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Component, { TableForms, MkHeader } from 'fck-table-forms' 
import './style.css'

export const TEST_HEADERS: TableForms.Header[] = [   
    MkHeader("Nome", "name", "text", 3),
    MkHeader("Idade", "age", "text", 3),
    MkHeader("Altura", "height", "text", 3),
    MkHeader("Outro", "outro", "text", 3),
   /*  MkHeader("Especificação *", "specification", "text", 4), 
    MkHeader("Outro *", "outro", "text", 3), 
    MkHeader("Mais um *", "maisum", "text", 3),  */
   /*  MkHeader("Marca *", "brand", "select", 3, []),  */
]
 
const App = () =>{
    const [ initial_data, setInitial_data ] = useState([{}])
    const [ result_data, setResultData ] = useState(null)
    const [ errors, setErrors ] = useState<any>(null)
    
 /*     useEffect(()=>{
        setTimeout(()=>{
            setErrors({ 0: { outro: "rersasd"} })
        },100)
    },[])  */
    return (
        <div className='fck-examples'> 
            <h1> fck-table-forms</h1>
            <h3> GitHub Repository:
                <a target="__blank" href={"https://github.com/fonsecaBarreto/fck-table-forms"}> @fonsecaBarreto/fck-table-forms </a>
            </h3>
            
            <Component
                onChange={setResultData}
                errors={errors} entries={initial_data} headers={TEST_HEADERS}/> 

            <div>
                <label> Resultado: </label>
                <span>{JSON.stringify(result_data)}</span>
            </div>
        </div>
    )
}

ReactDOM.render(<React.StrictMode> <App></App></React.StrictMode>, document.getElementById("root") );





