import React from 'react'
import { useState } from 'react'
import { Abrangencia, LocationSelector } from '..'
import '../mapa.css'
import { UFS } from './UFS'

const UfComponent = ({children, id, onClick, selected}:any) => {
  return (
      <a onClick={()=>onClick(id)} className={`${selected? "uf-selected": ""}`}>
        {children}
      </a>
  )
}

const PASSO = 0.1;
const WIDTH = 450;
const HEIGHT = 460;
//
//
export default ({onClick, entry=[] }: { onClick: Function, entry: Abrangencia[]}) => {
  const [ zoom, setZoom] = useState(1) 
  const [ pos, setPos] = useState([0,0]) 

  const handleZoom = (value: number) =>{
    var result = zoom + value;
    if(result < 1 || result > 1.4)return;
    setZoom(result)
  }

  return (
    <div className='mapa-container'>
      <section>
        <div style={{transform:` 
          scale(${zoom}) 
          translateX(${((zoom-1)*100)/2}%)
          translateY(${((zoom-1)*100)/2}%)  `
          }} > 
            <svg  version="1.1" id="svg-map" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve" 
              x={`0px`} y={"0px"} width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}}`}>
              <g>
                { UFS.map(({id, component}:any)=>{
                  var indexof = entry.findIndex((v: any)=>v.id == id);
                  var selectedItem: any = (indexof === -1) ? null : entry[indexof];
                  let isSelected = !selectedItem ? false : selectedItem?.cidades.length > 0 ? true : false
                  return (
                    <UfComponent key={id} id={id} onClick={onClick} selected={isSelected}>
                      {component}
                    </UfComponent>)
                })}
              </g>
            </svg> 
        </div>
      </section>

      <section>
        <button onClick={ () => handleZoom(PASSO) }> + </button> 
        <button onClick={ () => handleZoom(PASSO*-1)}> - </button>
      </section> 
    </div>
  )
}
