/* 
    OnChange:

    Importante que o estado de data inicial seja limpo




*/
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Component, { TableForms, MkHeader } from 'fck-table-forms' 
import './style.css'

export const TEST_HEADERS: TableForms.Header[] = [   
    MkHeader("Nome", "name", "text", 3),
    MkHeader("Idade", "age", "text", 3),
    MkHeader("Altura", "height", "text", 3),
    MkHeader("Outro", "outro", "text", 3)
]

const ENTRADA_EXTERNA = [
    { name: "teste"},{ age: 2, name: "meu nome"}
]

const ERROS_EXTERNOS = [
    { name: "ruim aqui"}
]
 
const App = () =>{
    const [ initial_data, setInitial_data ] = useState<any>(null)
    const [ result_data, setResultData ] = useState(null)
    const [ errors, setErrors ] = useState<any>(null)

    const handleEntry = () => { setInitial_data(ENTRADA_EXTERNA) }
    const handleErrors = () => { setErrors(ERROS_EXTERNOS) }

    const dataChanged = (data: any) => {
        /* POr que data esta sendo mutada duas vezes? */
       /*  console.log("data chagned outside", data) */
        setResultData(data)
        setInitial_data(null)
        setErrors(null)
    }

    return (
        <div className='fck-examples'> 
            <h1> fck-table-forms</h1>
            <h3> GitHub Repository:
                <a target="__blank" href={"https://github.com/fonsecaBarreto/fck-table-forms"}> @fonsecaBarreto/fck-table-forms </a>
            </h3>
            
            <div>
                <button onClick={handleEntry}> Simular Entrada Externa </button>
                <button onClick={handleErrors}> Simular Erros </button>
            </div>
            <br/>
            
            <Component onChange={dataChanged} errors={errors} entries={initial_data} headers={TEST_HEADERS}/> 

            <div>
                <label> Resultado: </label>
                <span>{JSON.stringify(result_data)}</span>
            </div>
        </div>
    )
}

ReactDOM.render(<React.StrictMode> <App></App></React.StrictMode>, document.getElementById("root") );





