import styled from 'styled-components';
import { Flex } from '../../styles/Essentials.styles';


export const NavWrap = styled.div`
    ${Flex}
    width: 100vw;
    height: 100px;
    background: var(--secondary-color);
    border-bottom: 2px solid #0000001f;

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