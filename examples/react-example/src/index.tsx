import React from "react";
import ReactDOM from "react-dom";
import {test} from 'fck-br-location-selector/react'

/* 
    Nota: O Problema aqui é a recursividade do link e a falta do packge.json quando direcionado direto para a pasta lib

*/

console.log("teste", test)
ReactDOM.render(
    <React.StrictMode>
        <div className='fck-examples'> 
            <h1> fck-location-selector</h1>
            <h3> Autor: 
                <a href={"https://github.com/fonsecaBarreto"}> Lucas Fonseca </a>
            </h3>
        
        </div>
</React.StrictMode>, document.getElementById("root") );





