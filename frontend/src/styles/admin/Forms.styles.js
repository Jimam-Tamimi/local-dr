import styled from "styled-components";
import { Flex } from "../Essentials.styles";

export const Label = styled.label`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 10px;
  
`;

export const Input = styled.input`
  min-height: 46px;
  width: 100%;
  padding: 0px 15px;
  font-size: 1rem;
  border: 1px solid #0000001f;
  font-weight: 600;
  outline: none;

`;
export const InputDiv = styled.div`
  ${Flex}
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  color: rgb(0, 35, 75);
  margin: 20px 0px;
  & > * {
    width: 100%;
  }
  ${({ icon }) =>
    icon &&
    `
        position: relative;
    & > svg {

            top: 40.8px;
        position: absolute;
        font-size: 20px;
        left: 13px;
        @media screen and (max-width: 768px) {
          top: 36.8px;
    
        }
        @media screen and (max-width: 480px) {
          font-size: 18px;
          top: 36.6px;

        }
    }
    & > input {
        padding-left: 40px;
    }

    `}
    position: relative;
`;
export const FormTitle = styled.h3`
  font-size: 1.6rem;
`;



export const DropdownSelectWrap = styled.div`
    width: 100%;
    position: absolute;    
    z-index: 2;
    min-height: 63px;

    top: 79px;
    background: white;

    max-height: 180px;
    overflow-y: scroll;
`

export const DropdownSelect = styled.div`
    border: 1px solid #00000033;
    padding: 8px 15px;
    cursor: pointer;

`