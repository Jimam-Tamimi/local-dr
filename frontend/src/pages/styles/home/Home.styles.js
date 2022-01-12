import styled from 'styled-components';
import { Column } from '../../../styles/Essentials.styles';



export const Wrap = styled.div`
width: 100vw;
padding: 130px 0px;
background: var(--secondary-color);


`

export const ColumnOne = styled(Column)`
    & > h1 {
        font-size: 3.6rem;
    }
    & > * {
        margin-top: 20px;
        margin-bottom: 20px;
    }
    & > input {
        
    }
` 
export const ColumnTwo = styled(Column)`
    & > img {
        width: 80%;
    }
    @media only screen and (max-width: 992px) {
        & > img {
            display: none;
        }
    }
` 
export const SearchColumn = styled.form`
    width: 90%;

    & > input {
        border: none;
    font-size: 1rem;
    padding: 1.3rem 1.1rem;
    font-weight: 600;
    outline: none;
    border-radius: 4px;
}
position: relative;

   
    & > span {
    background: #0000001f;
    height: 58%;
    position: absolute;
    top: 13px;
    z-index: 1;
    width: 1.5px;
    border-radius: 35px;
    }
    display: flex;
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
    
` 