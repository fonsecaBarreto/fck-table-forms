import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import ReactComponent from 'fck-br-location-selector/react' 

/* 
    Nota: O Problema aqui é a recursividade do link e a falta do packge.json quando direcionado direto para a pasta lib
    - Usar npm pack para gerar um .tar.gz depois linkar pode ser uma solução
    - Pode ser que entregue melhora da distribuição tb
*/
const App = () =>{


    return (
        <div className='fck-examples'> 
            <h1> fck-location-selector</h1>
            <h3> Autor: 
                <a href={"https://github.com/fonsecaBarreto"}> Lucas Fonseca </a>
            </h3>
            <ReactComponent/>
        </div>
    )
}

ReactDOM.render(
    <React.StrictMode>

        <App></App>
        
</React.StrictMode>, document.getElementById("root") );





