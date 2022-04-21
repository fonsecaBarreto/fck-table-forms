import {TableForms} from "."; 

export const serializeErrors = (errors: any, data: any) =>{
    if(!errors || !data) return {}
    console.log("entrada erros")
    var final_errors:any ={}
    Object.keys(data).map((d, i)=>{
        var { key } = data[d];
        if( errors[i] ){
            final_errors[key]=errors[i]
        }
    })
    return final_errors
}

export const normalizeEntries = (entry: any[], headers: TableForms.Header[]) =>{
    var final_data: any[] = [];
    final_data = entry.map((entry_unit: any)=>{
        return normalizeSingleEntry(entry_unit, headers)
    })
    return final_data 
}

export const normalizeSingleEntry = (entry_unit: any, headers: TableForms.Header[]) =>{
    var data_row: any = {}
    data_row['key']= Date.now()+""
    headers.map( (header:  TableForms.Header)=>{
        let { list, type='text' } = header
        let name = header.value;
        var value:any=  entry_unit[name] ?? "" 
        if(type == "select"){
            list = (list && list.length > 0) ? list: [];
            let list_labels = list.map(v=>v.label.toUpperCase()) ?? []
            var indexOf = list_labels.findIndex((v_name:string)=> v_name === value.toUpperCase() );
            value = indexOf != -1 ? list[indexOf] : { label: "", value: ""}
        }
        data_row[name] = value
    })
    return data_row 
}