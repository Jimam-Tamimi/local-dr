import { Column } from "../../../styles/Essentials.styles";
import styled, { keyframes } from 'styled-components'; 

export const HeroWrap = styled.div`
  width: 100vw;
  padding: 130px 0px;
  background: var(--secondary-color);
  @media only screen and (max-width: 992px) {
  padding: 50px 0px;
  padding-top: 0px;

  }
`;

export const ColumnOne = styled(Column)`
  & > h1 {
    font-size: 4.4rem;
    color: var(--primary-text-color);
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
  background: white;
  & > div > input {
    border: none;
      width: 100% !important;
    font-size: 1rem;
    padding: 1.3rem 2.1rem;
    font-weight: 600;
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
    font-weight: 600;
    outline: none;
    border-radius: 4px;
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
    font-size: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  & > div > svg {
    position: absolute;
    top: 19px;
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
    border-bottom: 1px solid #0000003b;
    margin: 5px 0px;
  }
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