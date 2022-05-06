import React, { useEffect } from 'react';

const ErrorLogPanel = ({errors}: any) =>{

    useEffect(()=>{
        console.log("entrada de erros", errors)
    },[errors])

    return (
        <div>
            {/* { !errors || Object.keys(errors).length == 0 ? " Nenhum erro encontrado ":
                <ul>
                    { 
                        Object.keys(errors).map((e:any) => {
                            const err = errors[e];
                            console.log(err)
                            return (
                                <li key={err.key}>
                                    <span> {e}</span> 
                                    <span> {JSON.stringify(err)}</span>
                                </li>
                            )
                    })
                    }
                </ul>
            } */}
        </div>
    )
}

export default ErrorLogPanel