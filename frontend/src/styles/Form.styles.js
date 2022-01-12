import styled from "styled-components";
import { Flex } from "./Essentials.styles";


export const Label = styled.label`
        font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 5px;
`

export const Input = styled.input`
    min-height: 46px;
    width: 100%;
    padding: 0px 15px;
    font-size: 1rem;
    border: 1px solid rgb(0 0 0 / 35%);
    font-weight: 600;
    outline: none;
`
export const InputDiv = styled.div`

${Flex}
flex-direction: column;
justify-content: center;
align-items: flex-start;
color: rgb(0, 35, 75);
margin: 20px 0px;


`