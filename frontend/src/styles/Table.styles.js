import styled from "styled-components";
import { Column, Flex } from "./Essentials.styles";

export const OptionsColumn = styled(Column)``;
export const Search = styled.input`
  width: 314px;
  border: none;
  border-bottom: 1px solid #f1f1f1;
  outline: none;
  padding: 5px 9px;
`;

export const Table = styled.table`
  width: 100%;
`;
export const Tr = styled.tr`
    transition: var(--main-transition);
    &:hover {
        background: #f3f3f3;
    }
`;
export const Th = styled.th`
  text-align: start;
  line-height: 1.428571429;
  color: #777 !important;
  padding: 10px !important;
  border-bottom: 1px solid #f1f1f1 !important;
  font-weight: bold;
  cursor: pointer;
  background: #f3f3f3;
`;
export const Td = styled.td`
    border-bottom: 1px solid #f1f1f1;
    padding: 10px;
    vertical-align: middle;
    height: 55px;
`;


export const Actions = styled.div`
    ${Flex}
    & > * {
        margin: 0px 5px;
    }
`