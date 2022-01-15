import styled from "styled-components";
import { Column, Flex } from "../../../styles/Essentials.styles";

export const HeadingColumn = styled(Column)`
    width: 100%;
    padding: 15px;
    & > h1 {
        color: #428BCA;
    font-weight: 500;
    font-size: 1.6rem;
    }
    & > a {
        ${Flex}
        
    }
    & > a > svg {
        margin-right: 5px;
    }
`


export const Form = styled.form`
    padding: 15px;
    border: 1px solid #eff2f7;
    border-radius: 5px;
    background: #fff;
    max-width: 760px;
    width: 82vw;
    min-width: 350px;
    & > h1 {
        color: #428BCA;
    font-weight: 500;
    font-size: 1.6rem;
    }
`
export const InputDivW   = styled.div`
& > div {

    width: 100%;
}

`