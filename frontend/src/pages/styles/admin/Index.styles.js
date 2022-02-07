 
import { Link } from 'react-router-dom'
import styled from 'styled-components'


export const BoxesWrap = styled.div`
    display: flex;
    justify-content: baseline;
    flex-wrap: wrap;
`

export const Box = styled(Link)`
    background: ${props => props.background};
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px 20px;
    border-radius: 5px;
    width: 300px;
    height: 150px;
    @media screen and (max-width: 730px) {
        width: 90%;
        margin: 10px auto ;
    }
    & > h3 {   
    font-size: 2.3rem;
    letter-spacing: 2px;
    margin-bottom: 3px;
text-align: center;
    width: 100%;


    }
    & > p {   
        font-size: 1.2rem;
        text-align: center;
    width: 100%;
    }
`