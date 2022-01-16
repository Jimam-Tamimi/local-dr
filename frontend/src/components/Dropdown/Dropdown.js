import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

export default function Dropdown({show, setShow, children, style}) {
    const dropdownRef = useRef(null)
    useEffect(() => {
        const toggleOpen = (e) => { 
          if (!dropdownRef?.current?.contains(e.target) && show) {
            try{

              setShow(false);
            } catch(e) {}
          }
        };
        window.addEventListener("click", toggleOpen);
        return () => {
          window.removeEventListener("click", toggleOpen);
        };
      }, [show]);
    return (
        <>
            <DropdownWrap ref={dropdownRef} style={style} show={show} >
                {children}
            </DropdownWrap>
        </>
    )
}

export const DropdownWrap = styled.div`
    position: absolute;
    z-index: 1;

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
