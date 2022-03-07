import { get_estado } from './ibge-services'
export const App = async () =>{
    const data = await get_estado(22)
    console.log("\n  -> Regiao IBGE: ", data)
}

export default App