import { get_municipios_uf, get_regioes, get_ufs_regiao } from './ibge-services'
export const App = async () =>{

    const regioes = await get_regioes()

    console.log("\n - Regioes: ", regioes)

    console.log("\n > Aqui vou mostrar para as regioes Norte:\n")

    const ufs = await get_ufs_regiao(1);
    console.log("\n - UFS:", ufs)

    const cidades = await get_municipios_uf(22)
    console.log("\n  - Cidades: ", cidades)
}

export default App