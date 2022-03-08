import axios from 'axios'

export type EstadoIBGE = { id: number, sigla: string, nome: string, cidades: any }
export type CidadeIBGE = { id: number, sigla: string, nome: string }
export type Abrangencia = { id: number, cidades: string[]}[]

export interface UF_LIST {
    id: number, 
    sigla: string, 
    nome: string, 
    component: any 
}


export const get_estado = async (uf: number): Promise<EstadoIBGE> =>{ 
    var estado = { id: -1,  sigla: "", nome: "", cidades: [] };
    const get_estado_url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}`
    const get_municipios_url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
    try{
        await axios.get(get_estado_url).then(result => estado={ ...estado, ...result.data}),
        await axios.get(get_municipios_url).then(result => estado.cidades = result.data)
    }catch(err){ console.log(err) }
    return estado;
}
