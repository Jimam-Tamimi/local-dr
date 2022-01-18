import styled from 'styled-components';
import { SearchColumn } from '../../pages/styles/home/Home.styles';
import { Flex } from '../../styles/Essentials.styles';


export const NavWrap = styled.header`
    ${Flex}
    width: 100vw;
    height: 100px;
    /* border-bottom: 2px solid #0000001f; */
    &.bg-color{
       background: var(--secondary-color);
    }

`;
export const Logo = styled.div`


`;
 
export const Account = styled.div`
 ${Flex}
    flex-direction: column;
 position: relative;
`

export const Menu = styled.div`
 ${Flex}
 margin: 5px 0px;
 & > p {
    font-size: 1.1rem;
    font-weight: 700;
 }
 cursor: pointer;
 padding: 3px 3px;
 & > svg {
    position: relative;
    top: 1.26px;
    left: 3px;
 }
`

export const DropdownDiv = styled.div`
    width: 308px;
    min-height: 100px;
    background-color: white;
    box-shadow: 0px 0px 8px 2px #00000036;
`

export const Logout = styled.button`
      width: 100%;
      font-size: 1rem;
      font-weight: 700;
      cursor: pointer;
      outline: none;
      width: 100%;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    outline: none;
    border: none;
    padding: 5px 0px;
    background: var(--info-color);
    color: var(--info-text-color);
    position: absolute;
    bottom: 0;

`

export const SearchColumnNav = styled(SearchColumn)`
 &  div > input {
    min-height: 46px;
    width: 100%;
    padding: 0px 15px;
    font-size: 1rem;
    border: 1px solid #0000001f;
    font-weight: 600;
    outline: none;
  }
  & > div {
    padding: 0px 0px;
  }
  & > div > div {
    top: initial;
    padding-top: 0;
    padding-bottom: 0;

  }
  /* width: 100%; */

   
  & > button {
    font-size: 15px;
  }
`

export const SearchMobileColumn = styled.div`
    min-height: 46px;
    width: 100%;
    font-size: 1rem;
    border: 1px solid #0000001f;
    font-weight: 600;
    outline: none; 
    ${Flex}
    justify-content: flex-start;
    padding: 5px 0px;
    padding-left: 20px;
    background: #f3f3f4;
    border-radius: 6px;
    cursor: pointer;
  & > svg { 
   font-size: 1.3rem;
    margin-right: 10px;
  }
  & > div { 
      ${Flex}
      flex-direction: column;
      align-items: flex-start;
  }
  & > div b { 
   font-size: 1rem;
   font-weight: 500;
  }
  & > div p { 
   font-size: .88rem;
    font-weight: 500;
    color: #00234bbf;
  }
   
`

export const SearchModal = styled.div`

width: 550px;
    padding-top: 30px;  
    padding-bottom: 30px;
    @media screen and (max-width: 570px) {
      width: 450px;
    }
    @media screen and (max-width: 470px) {
      width: 350px;
    }

`



export const MobileMenu = styled.div`
   /* position: relative; */
   
`

export const MobileMenuDiv = styled.div`
   position: fixed;
   background: white;
   z-index: 1;
   box-shadow: -1px 0px 8px #0000002b;

    transition: var(--main-transition);
    opacity: 0; 
    visibility: hidden;

    width: 100%;
    top: 0;
    min-height: 100px;
    justify-content: center;
    left: 0;

   ${({show}) => show && `
    opacity: 1;
    visibility: visible;

   `}
       display: flex;
    align-items: center;
    padding: 20px;
   
`