 
import styled from 'styled-components'


export const BoxesWrap = styled.div`
    display: flex;
    justify-content: baseline;
`

export const Box = styled.div`
    background: ${props => props.background};
    padding: 25px 60px;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px 20px;
    border-radius: 5px;
    & > h3 {   
    font-size: 2.3rem;
    letter-spacing: 2px;
    margin-bottom: 3px;

    }
    & > p {   
        font-size: 1.2rem;

    }
`