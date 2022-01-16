import React from 'react'
import { useSelector } from 'react-redux' 

export default function AdminRoute({children}) {
    const adminAuth = useSelector(state => state.adminAuth)

    if(adminAuth.isAdmin ===true   ){            
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





