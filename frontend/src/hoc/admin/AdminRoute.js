import React from 'react'
import { useSelector } from 'react-redux' 

export default function AdminRoute({children}) {
    const auth = useSelector(state => state.auth)

    if(true){            
        return (
            <>
            {children}
            </>
        )
    } 

    else {
        return(
            <>
            </>
        )
    }
}





