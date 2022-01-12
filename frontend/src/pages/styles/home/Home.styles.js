import styled from "styled-components";
import { Column } from "../../../styles/Essentials.styles";

export const HeroWrap = styled.div`
  width: 100vw;
  padding: 130px 0px;
  background: var(--secondary-color);
`;

export const ColumnOne = styled(Column)`
  & > h1 {
    font-size: 4.4rem;
  }
  & > * {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  & > input {
  }
`;
export const ColumnTwo = styled(Column)`
  & > img {
    width: 80%;
    animation:  heroAnimation 10s ease 0s infinite;
  }
  @keyframes heroAnimation {
      0% {
        transform: translateY(30px);

      }
      50% {
        transform: translateY(-30px);

      }
      100% {
        transform: translateY(30px);

      }
  }
  @media only screen and (max-width: 992px) {
    & > img {
      display: none;
    }
  }
`;
export const SearchColumn = styled.form`
  width: 100%;
  display: flex;
  position: relative;

  & > input {
    border: none;
    font-size: 1rem;
    padding: 1.3rem 1.1rem;
    font-weight: 600;
    outline: none;
    border-radius: 4px;
  }

  & > span {
    background: #0000001f;
    height: 58%;
    position: absolute;
    top: 13px;
    z-index: 1;
    width: 1.5px;
    border-radius: 35px;
  }
  & > button {
    padding: 0 10px;
    border: 0;
    outline: none;
    background: #3c3fd8;
    color: white;
    font-size: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

`;


export const FeatureWrap = styled.div`
  width: 100vw;
  background-color: #F5F8FA;
  padding: 60px 0px;

`

export const HeadingColumn = styled(Column)`
margin-bottom: 20px;
margin-top: 20px;
  & > * {
    text-align: center;
    margin-bottom: 10px;
    margin-top: 10px;
  }
  & > h1 {
    font-size: 2.3rem;
    font-weight: 500;
  }
  & > p {
    font-size: 1.33rem;
    font-weight: 300;
  }
`
export const BoxColumn = styled(Column)`
margin-bottom: 20px;
margin-top: 20px;
`
export const FeatureBox = styled(Column)`
    box-shadow: 0px 0px 17px 4px #0000002e;
    padding: 45px 60px;
    min-height: 345px;
    margin-bottom: 20px;
    margin-top: 20px;

  & > * {
    text-align: center;
    margin: 5px 0px;
  }
  & > h4 {
    font-size: 1.5rem;
    color: #e74e84;
  }
  & > p {
    line-height: 1.39rem;
  }
`