import styled from "styled-components";
import { Column, Flex } from "../../../styles/Essentials.styles";

export const Wrap = styled.div`
  width: 100vw;
  ${Flex}
  flex-direction: column;

`;

export const Form = styled.form`
  width: 600px;
  @media (max-width: 620px) {
    width: 90%;
  }
  padding: 30px;
  padding-top: 0px;
  height: 800px; 
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
    width: 7rem;
    height: 7rem;
    margin-right: 10px;
    border-radius: 100%;
    object-fit: cover;
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
