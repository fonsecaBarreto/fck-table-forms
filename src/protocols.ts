export namespace TableForms{
    export type Header = {  
        label: string, 
        value: string, 
        columns?: number, 
        list?: string[][],
        convert?: "date" | "number"
    }
    export type Params = {
        entries: any[]
        errors: any,
        headers: Header[],
        onChange?: any
    }
    export type Data = Record<string, any>[]
    export type Errors = Record<string, Record<string, any>>
}

export const MkHeader = (label: string ="", value="", columns=1, list: any[]): TableForms.Header =>{
    return ({ label, value, columns, list })
}
