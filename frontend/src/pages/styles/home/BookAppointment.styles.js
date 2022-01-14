import styled from "styled-components";
import { Column, Flex } from "../../../styles/Essentials.styles";

export const Wrap = styled.div`
  width: 100vw;
  ${Flex}
`;

export const Form = styled.form`
  width: 500px;
  padding: 30px;
  height: 800px;
  background-color: #f7f8f9;
`;
export const TimeColumn = styled(Column)`
  background: white;
  margin: 8px 0px;
  padding: 11px 0px;
  font-size: 1.1rem;
  border-radius: 5px;
  font-size: 1rem;
  border: 1px solid #0000001f;
  font-weight: 600;
  cursor: pointer;
  transition: var(--main-transition);
  ${({ selected }) => selected && `    background: var(--primary-color); border-color: transparent;`}
  ${({ disabled }) => disabled && `opacity: .5; cursor: not-allowed;`}
  
`;
export const ProfileColumn = styled(Column)`
    color: var(--primary-text-color);
  & > img {
    width: 100px;
    margin-right: 10px;
  } 
  & > h3 {
    font-size: 1.5rem;
    font-weight: 600;
  } 
  & > p {
    font-size: .9rem;
    font-weight: 400;
  } 
`;
