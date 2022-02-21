import axios from 'axios'

export const get_regioes = async () => {
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/regioes`
    try{
        const { data } = await axios.get(url)
        return data
    }catch(err){
        console.log('deu ruin')
    }finally{
        console.log("dione")
    }
}

export const get_ufs_regiao = async (regiao: number) =>{ 
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/regioes/${regiao}/estados`
    try{
        const { data } = await axios.get(url)
        return data
    }catch(err){
        console.log('deu ruin')
    }finally{
        console.log("dione")
    }
}

export const get_municipios_uf = async (uf: number) =>{ 
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
    try{
        const { data } = await axios.get(url)
        return data
    }catch(err){
        console.log('deu ruin')
    }finally{
        console.log("dione")
    }
}

