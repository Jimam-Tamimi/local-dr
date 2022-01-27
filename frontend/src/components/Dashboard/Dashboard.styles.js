import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";

export const DashboardWrap = styled.aside`
width: 215px;
    height: calc(100vh - 60px);
    position: fixed;
    left: 0;
    bottom: 0;
    background: #112233;
    padding: 20px 0px;
    transform: translateX(-100%);
    transition: var(--main-transition); 
    ${({showDash}) => showDash ? `transform: translateX(0);`: `transform: translateX(-100%);`}
    `
export const DashLink = styled(NavLink)`
    color: #b8c7ce;
    display: flex;
    align-items: center;
    align-items: center;
    padding: 10px 0px;
    padding-left: 20px;
    transition: var(--main-transition);
    & > svg {
        margin-right: 13px;
        font-size: 18px;
    }
    &.active {
        background: #2a3537;
        color: white;
    }
    &:hover {
        background: #2a3537;
        color: white;
    }
`