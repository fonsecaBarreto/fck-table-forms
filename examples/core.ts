import { get_estado  } from '@lib/services'

export async function main() {
    const data = await get_estado(22)
    console.log("\n  -> Regiao IBGE: ", data)
}

main()