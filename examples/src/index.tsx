import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Component from 'fck-br-location-selector' 
import './style.css'

const App = () =>{
    const [ data, setData ] = useState([])
    const handleEmitData = (data: any) =>{
        setData(data)
    }
    return (
        <div className='fck-examples'> 
            <h1> fck-location-selector</h1>
            <h3> GitHub Repository:
                <a target="__blank" href={"https://github.com/fonsecaBarreto/"}> @fonsecaBarreto/...  </a>
            </h3>
            <Component/>
        </div>
    )
}

ReactDOM.render(<React.StrictMode> <App></App></React.StrictMode>, document.getElementById("root") );





