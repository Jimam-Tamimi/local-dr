import { Column, Flex } from "../../../styles/Essentials.styles";
import styled from "styled-components";
import HeroBg from "../../../assets/images/hero-bg.jpg";
export const HeroWrap = styled.div`
  width: 100vw;
  padding: 200px 0px;
  background: var(--secondary-color);
  background-image: url(${HeroBg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  @media only screen and (max-width: 992px) {
    padding: 50px 0px;
    padding-top: 0px;
  }
`;

export const ColumnOne = styled(Column)`
  & > h1 {
    font-size: 4.4rem;
    color: var(--primary-text-color);
    font-weight: 600;
    @media only screen and (max-width: 992px) {
      font-size: 2.2rem;
    }
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
    animation: heroAnimation 10s ease 0s infinite;
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
  background: white;
  border-radius: 5px;

  & > div > input {
    border: none;
      width: 100% !important;
    font-size: 1rem;
    padding: 1.3rem 2.1rem;
    font-weight: 400;
    outline: none;
    border-radius: 4px;
  }
  & > div  {
    position: relative;
    padding: 0px 20px;
  }
  & > div > div.location-input  {
     top: 0;
     position: unset;

         padding: 0px 0px;
         overflow-y: unset;


  }
  & > div > div > input  {
    border: none;
      width: 100% !important;
    font-size: 1rem;
    padding: 1.3rem 2.1rem;
    outline: none;
    border-radius: 4px;
    font-weight: 400;

  }
  & > div > div {
    background: white;
    width: 100%;
    max-height: 15rem;
    top: 63px;
    left: 0;
    position: absolute;
    z-index: 1;
    overflow-y: scroll;
    padding: 5px 0px;
    @media screen and (max-width: 992px) {
      top: 100%;
    }
  }
  & > div > div > div {
    padding: 8px 0px;
    font-weight: 600;
    padding-left: 22px;
    cursor: pointer;
    transition: var(--main-transition); 
    font-size: .86rem; 
    box-shadow: 0px 0px 1px 0px #00000099;
}
  }
  & > div > div > div:hover {
    background: #FFECF1;
  }

  /* & > span {
    background: #0000001f;
    height: 58%;
    position: absolute;
    top: 13px;
    z-index: 1;
    width: 1.5px;
    border-radius: 35px;
  } */
  & > button {
    padding: 0 10px;
    border: 0;
    outline: none;
    background: var(--primary-color);
    color: var(--primary-text-color);
    font-size: 17px !important;
    font-weight: 500 !important;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    padding: 0.77rem 2.5rem !important;
  }

  & > div > svg {
    position: absolute;
    top: 20px;
    font-size: 25px;
  }
  @media screen  and (max-width: 768px) {
    & > div > svg {
    top: 17px;
    font-size: 23px; 
    }
  }
  @media screen  and (max-width: 768px) {
    & > div > svg {
      top: 13px;

    }
  }
  @media screen and (max-width: 992px) {
    
    flex-direction: column;
    background: white;
    padding: 15px;
      & > div > input {
        width: 100% !important;
        
      }
      & > div  {
        width: 100% !important;
        padding: 0px 0px;

    }
      & > button {
        width: 100% !important;
        padding: 10px 10px;
      font-size: 21px;
      font-weight: 600;
      margin-top: 10px;
    }
    & > div > input {
      padding: 1rem 2.1rem;
      border-bottom: 1px solid rgb(0 0 0 / 25%);
      margin: 5px 0px;
    }
  }

  & > div.search-hospital{
    border-right: 2px solid #0000001f;
    @media screen and (max-width: 992px) {
      border-right: none;
    }
  }
  & > div{
    @media screen and (max-width: 992px) {
      margin: 3px 0px;
    }
  }

`;

export const CtaSection = styled.div`
  ${Flex}
  margin: 50px auto;

  div.second-div {
    @media screen and (max-width: 992px) {
      flex-direction: column-reverse;
    }
  }
`;
export const ColumnCta1 = styled(Column)`
  flex-direction: column;
  align-items: baseline;
  padding-left: 65px;

  @media screen and (max-width: 992px) {
    align-items: center;
    padding-left: 0;

  }
  margin: 30px 0px;
  p {
    margin: 20px 0px;
  }
`;
export const ColumnCta2 = styled(Column)`
margin: 30px 0px;

&.second-div{
  padding-left: 65px;

  img {
    max-width: 80%;
    height: 450px;
    object-fit: cover;
}
@media screen and (max-width: 992px) {
  padding-left: 0px;
justify-content: center;
}
  }
}

`;
