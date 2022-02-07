import styled from "styled-components";
import { Container } from "./Essentials.styles";

export const ContentContainer = styled(Container)`
    flex-direction: column;
    align-items: baseline;
    margin-top: 2rem;   

`
export const ContentTitle = styled.h2`
    font-weight: 600;
    font-size: 1.2rem;
`

export const Content = styled.p`
    margin-bottom: 1rem;
`