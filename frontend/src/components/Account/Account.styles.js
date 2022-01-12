import styled from "styled-components";
import { Column } from "../../styles/Essentials.styles";


export const AccountWrap = styled.div`
    width: 470px;
    /* height: 500px; */
    background-color: white;
    padding: 35px;
`

export const ColumnTab = styled(Column)`
transition: var(--main-transition);
    &.active {
        background: var(--info-color);
        color: var(--info-text-color);
    border: 2px solid transparent;

    }
    cursor: pointer;
    border: 2px solid var(--info-color);
    font-size: 1rem;
    font-weight: 700;
    padding: 12px 0px;
`


const Form = styled.form`
    width: 100%;

`
export const LoginForm = styled(Form)`

`
export const SignupForm = styled(Form)`

`

