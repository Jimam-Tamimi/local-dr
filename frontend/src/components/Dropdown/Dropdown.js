import React from 'react'
import styled from 'styled-components'

export default function Dropdown({show, children, style}) {

    return (
        <>
            <DropdownWrap style={style} show={show} >
                {children}
            </DropdownWrap>
        </>
    )
}

export const DropdownWrap = styled.div`
    position: absolute;
    ${({show}) => show ? `
    opacity: 1;
    visibility: visible;    
    ` : `
    opacity:0;
    visibility: hidden;  
    `}
        top: calc(100% + 10px);
    right: 10px;
    transition: var(--main-transition);

`
