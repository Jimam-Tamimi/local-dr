import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { Flex } from "../../styles/Essentials.styles";

export default function Modal({ show, setShow, children, zoom }) {
  const modalRef = useRef(null);
  useEffect(() => {
    const toggleOpen = (e) => { 
      if (!modalRef.current.contains(e.target) && show) {
        setShow(false);
      }
    };
    window.addEventListener("click", toggleOpen);
    return () => {
      window.removeEventListener("click", toggleOpen);
    };
  }, [show]);
  return (
    <>
      <ModalWrap show={show}>
        <ModalDiv zoom={zoom} show={show} ref={modalRef}>
          {children}
        </ModalDiv>
      </ModalWrap>
    </>
  );
}

const ModalWrap = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: #00000087;
  top: 0;
  left: 0;
  overflow-y: scroll;

  z-index: 2;
  ${Flex}
  ${({ show }) =>
    show
      ? `
    opacity: 1;
    visibility: visible;
    `
      : `
    opacity:0;
    visibility: hidden;
    `}
    transition: var(--main-transition);
    align-items: flex-start;

padding: 30px 0px;
`;

const ModalDiv = styled.div`
  min-height: calc(100vh - 60px);
  min-width: 100px;
  width: auto;
  height: auto;
  transition: var(--main-transition);
  align-items: center;
    justify-content: center;
    display: flex;
  ${({ show, zoom }) =>
    show
      ? `
        opacity: 1;
        ${zoom && `transform: scale(1);`}
        
        
        `
      : `
      ${zoom && `transform: scale(.9);`}
        opacity: 0;
    `
    }
`;
