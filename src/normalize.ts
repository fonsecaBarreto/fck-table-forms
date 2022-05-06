import {TableForms} from "."; 
import { v4 } from 'uuid'

export const serializeErrors = (errors: any, data: any) =>{
    if(!errors || !data) return {}
    var final_errors:any ={}
    Object.keys(data).map((d, i)=>{
        var { key } = data[d];
        if(errors[i]) final_errors[key]=errors[i];
    })
    return final_errors
}

export const normalizeEntries = (entry: any[], headers: TableForms.Header[]) =>{
    var final_data: any[] = [];
    final_data = entry.map((entry_unit: any)=>{
        return normalizeSingleEntry(entry_unit, headers)
    })
    console.log("final data", final_data)
    return final_data 
}

export const normalizeSingleEntry = (entry_unit: any, headers: TableForms.Header[]) =>{
    var data_row: any = {}
    data_row['key']= v4();

    headers.map( (header:  TableForms.Header)=>{
        let { list } = header;
        let name = header.value;
        var rec_value: any = entry_unit[name] ?? "";
        var value: any ="";
        if(list && list?.length > 0 ){
            let listValues = list.map(v=> v[0]);
            var indexOf = listValues.findIndex((v:string)=> v === rec_value );
            value = (indexOf != -1 ) ? list[indexOf][0] : "";
        }else{
            value = rec_value;
        }
        data_row[name] = value
    })
    return data_row 
}