import styled from "styled-components";
import { SearchColumnNav } from "../../../components/Navbar/Navbar.styles";
import { Column } from "../../../styles/Essentials.styles";

export const ProvidersWrap = styled('div')`
    width: 100vw;
    padding: 1rem 0;
`;

export const ProviderColumn = styled(Column)`
    justify-content: flex-start;
    border-top: 1px solid #0000001f;
    padding: 20px 0px;

`;
export const LeftCol = styled.div`
    margin-right: 40px;
    & > img{
        width: 100%;
    }
    width: 210px;

    @media screen and (max-width: 600px) {
        margin-right: 10px;
        &{
            width: 150px;
        }
    }
`;
export const RightCol = styled.div`
    width: inherit;
    position: relative;
    & > * {
        margin: 3px 0px;
    }
    & > a {
        font-weight: 600;
        text-decoration: underline;
        position: absolute;
        right: 0;
        @media screen and (max-width: 715px) {
            font-size: .8rem;

        }

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
    background: #3c3fd8;
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
`