export namespace TableForms{
    export type Header = {  
        label: string, 
        value: string, 
        columns?: number, 
        type?: string | "text" | "select", 
        list?: {label: string, value: string}[]
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

export const MkHeader = (label: string ="", value="", type="text", columns=1, list =[]): TableForms.Header =>{
    return ({ label, value, type, columns, list })
}
