import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import ReactComponent from 'fck-br-location-selector/react' 

const App = () =>{

    return (
        <div className='fck-examples'> 
            <h1> fck-location-selector</h1>
            <h3> GitHub Repository:
                <a target="__blank" href={"https://github.com/fonsecaBarreto/fck-brasil-location-selector"}> @fonsecaBarreto/fck-brasil-location-selector  </a>
            </h3>

            <ReactComponent/>
        </div>
    )
}

ReactDOM.render(<React.StrictMode> <App></App></React.StrictMode>, document.getElementById("root") );





