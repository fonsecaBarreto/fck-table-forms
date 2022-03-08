import React, { useState } from 'react'
import { Abrangencia, UF_LIST} from '../../services';
import '../../styles/mapa.css'
import { UFS } from './UFS'

const PASSO = 0.1, WIDTH = 450, HEIGHT = 460;

export default ({ onClick, current_state=[] }: { onClick: Function, current_state: Abrangencia}) => {

  const [ zoom, setZoom] = useState(1) 

  const handleZoom = (value: number) =>{
    var result = zoom + value;
    if(result < 1 || result > 1.4)return;
    setZoom(result)
  }

  return (
    <div className='mapa-container'>
      <section>
        <div style={{ transform:`scale(${zoom}) translateX(${((zoom-1)*100)/2}%) translateY(${((zoom-1)*100)/2}%) `}} > 
            <svg version="1.1" id="svg-map" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve" x={`0px`} y={"0px"} width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
              <g>
                { 
                  UFS.map((payload:UF_LIST, i: number)=>{

                    var indexof = current_state.findIndex((v: any)=>v.id == payload.id);
                    var selectedItem: any = (indexof === -1) ? null : current_state[indexof];
                    let isSelected = !selectedItem ? false : selectedItem?.cidades.length > 0 ? true : false
                    
                    return (
                      <a key={i} onClick={()=>onClick(payload)} className={`${isSelected? "uf-selected": ""}`}>
                        {payload.component}
                      </a>)
                  })
                }
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

