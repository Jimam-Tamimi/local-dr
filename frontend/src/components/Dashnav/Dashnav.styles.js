import styled from "styled-components";
import { Flex } from "../../styles/Essentials.styles";

export const NavWrap = styled.header`
  ${Flex}
  justify-content: space-between;
  max-height: 60px;
    height: 60px;
    padding: 0px 1.39rem;
    background-color: #fff;
    position: sticky;
    top: 0;
`;
export const FirstSection = styled.div`
  ${Flex}
  & > svg {
    font-size: 23px;
    margin-right: 20px;
    cursor: pointer;

  }
  & > a {
    font-size: 2rem;
    cursor: pointer;
    font-weight: 700;
    color: #112233;
  }
`;
export const SecondSection = styled.div`
  ${Flex}
  cursor: pointer;
  & > p {
      text-decoration: underline;
    font-size: 1.1rem;
    font-weight: 700;
  }
`;
