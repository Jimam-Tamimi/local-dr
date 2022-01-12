import styled from "styled-components";
import { SearchColumnNav } from "../components/Navbar/Navbar.styles";
import { Column } from "./Essentials.styles";

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
    & > button {
        @media screen and (min-width: 715px) {
            position: absolute;
            right: 0;
            bottom: 5px;
        }
        @media screen and (max-width: 715px) {
            font-size: .8rem;

        }

    }
`;

export const SearchColumnSearch = styled(SearchColumnNav)`
    width: 50%;
    @media screen and (max-width: 768px) {
        width: 100%;

    }
`