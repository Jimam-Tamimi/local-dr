import styled from "styled-components";
import { Column, Flex } from "../../../styles/Essentials.styles";

export const ProvidersWrap = styled("div")`
  width: 100vw;
  padding: 1rem 0;
  padding-left: 30px;
  ${Flex}
  justify-content: center;
  position: relative;
  align-items: flex-start;
  @media screen and (max-width: 830px) {
    padding: 0px 0;
  }

  justify-content: flex-start;

  
  
  
`;

export const ProviderColumn = styled(Column)`
  justify-content: flex-start;
  border-top: 1px solid #0000001f;
  padding: 20px 0px;
  @media screen and (max-width: 615px) {
    align-items: flex-start;
  }
`;
export const LeftCol = styled.div`
  margin-right: 40px;
  & > img {
    width: 8.5rem;
    height: 8.5rem;
    OBJECT-FIT: COVER;
    border-radius: 100%;
    @media screen and (max-width: 615px) {
      width: 6.5rem;
    height: 6.5rem;
  }
  }
  width: 210px;

  @media screen and (max-width: 615px) {
    margin-right: 10px;

    width: 130px;
  }
  @media screen and (max-width: 515px) {
    width: 100px;
  }
`;
export const RightCol = styled.div`
  width: inherit;
  position: relative;
  & > * {
    margin: 3px 0px;
  }
   
  & > h2 {
    font-size: 1.8em;
    font-weight: 500;
    margin-bottom: 5px;
    @media screen and (max-width: 715px) {
      font-size: 1.7rem;
    }
  }
  & > p > b {
    font-weight: 600;

    @media screen and (max-width: 715px) {
      /* font-size: 1rem; */
    }
  }
  & > p.consultation {
    ${Flex}
    justify-content: start;
    color: #00569e;
    text-decoration: underline;
    margin: 10px 0px;
  }
  & > p.consultation > svg {
    color: rgb(15, 157, 239) !important;
    margin-right: 5px;
  }
  & > button , & > a.btn{
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;

    background-color: #ffc107;
    margin-top: 2rem;
    padding: 0.7rem 0px;
    width: 320px;
    font-size: 1.1rem;
    font-weight: 400;
    transition: var(--main-transition);
    &:hover {
      background-color: gold;

    }

  }
  & > p {
    font-size: 1.1rem;

  }
`;

export const SearchColumnSearch = styled.div`
  display: flex;
  position: relative;

  & > input {
    min-height: 46px;
    width: 100%;
    padding: 0px 15px;
    font-size: 1rem;
    border: 1px solid #0000001f;
    font-weight: 600;
    outline: none;
  }

  & > button {
    padding: 0 10px;
    border: 0;
    outline: none;
    background: var(--primary-color);
    color: var(--primary--text-color);
    color: white;
    font-size: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 15px;
  }

  & > button {
  }
  width: 50%;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const Tab = styled.div`
  ${Flex}
  font-size: 1rem;
  font-weight: 400;
  padding: 8px 20px;
  border: 1px solid #00234b6b;
  border-radius: 20px;
  cursor: pointer;
  margin-right: 15px;
`;
export const DropdownDiv = styled.form`
  flex-direction: column;
  ${Flex}
  width: 150px;
  /* height: 200px;  */
  background: white;
  padding: 10px 0px;
  box-shadow: 0px 0px 9px 0px #00214654;
  & > button {
    position: relative;
    left: 38px;
    box-shadow: none;
    /* margin: 20px 0px; */
    margin-bottom: 15px;
  }
  & > hr {
    width: 100%;
    margin: 10px 0px;
    border: 1px solid #0021461a;
  }
`;
export const DropdownOption = styled.div`
  ${Flex}
  justify-content: flex-start;
  width: 100%;
  height: 20px;
  transition: var(--main-transition);
  &:hover {
    background: #00234b17;
  }
  padding: 14px 0px;
  padding-left: 20px;
  cursor: pointer;
  & > * {
    cursor: pointer;
    margin-right: 12px;
    font-weight: 400;
  }
`;

export const TabUnderline = styled.p`
  font-size: 1rem;
  font-weight: 400;
  cursor: pointer;
  position: relative;
  padding: 10px 5px;
  margin-right: 10px;
  color: #797579;


  &::after {
    transition: var(--main-transition);
    background-color: var(--primary-text-color);
    position: absolute;
    content: "";
    width: 0%;
    height: 2px;
    border-radius: 1px;
    bottom: 0;
    left: 0;
    opacity: 0;
  }
  ${({ activeTab }) =>
    activeTab &&
    `
  &::after {
  width: 100%;
     
  opacity: 1;
  
  }


  `}
`;

export const ProviderHeading = styled.h1`
    color: #000000;
    text-align: start;
    width: 100%;
    margin-top: 2rem;
    margin-bottom: 5px;
    font-weight: 400;
`;
