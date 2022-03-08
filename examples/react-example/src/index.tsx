import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ReactComponent from 'fck-br-location-selector' 
import './style.css'
const INITIAL_DATA:any[] = [ { id: 23, cidades: ["2300606"] } ]
const App = () =>{
    const [ data, setData ] = useState([])
    const handleEmitData = (data: any) =>{
        setData(data)
    }
    return (
        <div className='fck-examples'> 
            <h1> fck-location-selector</h1>
            <h3> GitHub Repository:
                <a target="__blank" href={"https://github.com/fonsecaBarreto/fck-brasil-location-selector"}> @fonsecaBarreto/fck-brasil-location-selector  </a>
            </h3>

            <ReactComponent emitData={handleEmitData} initialData={[{ id:31, cidades:["3100104"]}]}/>

            <h3> Modelo </h3>

            <div>
                {`[`}<br/>
                &emsp;{`{`}<br/>
                &emsp;&emsp;{`id: integer (idenficação do estados segundo o IBGE)`}<br/>
                &emsp;&emsp;{`cidades: interger[0...n] ( Idenficação das cidades selecionadas) `}<br/>
                &emsp;{`} 0...n`}<br/>
                {`]`}<br/>        
            </div>
            <h3> Resultado </h3>

            {`[`}<br/>
                { data.map((c: any)=>{
                    return (
                        <div>
                            &emsp;{`{`}<br/>
                            &emsp;&emsp;{`id: ${c.id}`}<br/>
                            &emsp;&emsp;{`cidades: ${JSON.stringify(c.cidades)}`}<br/>
                            &emsp;{`}`}<br/>
                        </div>
                    )
                })}
            {`]`}<br/>       
        </div>
    )
}

ReactDOM.render(<React.StrictMode> <App></App></React.StrictMode>, document.getElementById("root") );





