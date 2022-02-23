import React from 'react'
import { useState } from 'react'
import '../mapa.css'
import { UFS } from './UFS'

const UfComponent = ({children, id, onClick, selected}:any) => {
  return (
      <a onClick={()=>onClick(id)} className={`${selected? "uf-selected": ""}`}>
        {children}
      </a>
  )
}

const passo = 0.1
export default ({onClick, entry}: any) => {
  const [ zoom, setZoom] = useState(1) 
  const [ pos, setPos] = useState([0,0]) 

  return (
    <div className='mapa-container'>
      <div className='mapa-container-buttons'>
        <button onClick={() => setZoom(zoom-passo)}> - </button>
        <button onClick={() => setZoom(zoom+passo)}> + </button> 
      </div> 
      <svg style={{transform:`scale(${zoom}) translate(${pos[0]},${pos[1]})`}} version="1.1" id="svg-map" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="auto" viewBox="0 0 450 460" enableBackground="new 0 0 450 460" xmlSpace="preserve">
        <g>
          { UFS.map(({id, component}:any)=>{
              return (<UfComponent key={id} id={id} onClick={onClick} selected={false}>
                {component}
              </UfComponent>)
          })}
        </g>
      </svg> 
    </div>
  )
}
