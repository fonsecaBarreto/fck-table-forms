import App from './app'

export type EstadoIBGE = { id: number, sigla: string, nome: string, cidades: any }
export type CidadeIBGE = { id: number, sigla: string, nome: string }
export type Abrangencia = { id: number, cidades: string[]}[]

export default App