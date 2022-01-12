import React from 'react'
import { Column, Container, Grid } from '../../styles/Essentials.styles'
import { ColumnOne, ColumnTwo, SearchColumn, Wrap } from '../styles/home/Home.styles'
import hero from '../../assets/images/hero.svg'
import {FaSearch} from 'react-icons/fa'
export default function Home() {
    return (
        <>
            <Wrap>
                <Container>
                    <Grid  >
                        <ColumnOne direction="column" lg={6} sm={12} align="start">
                            <h1>Find local OB-GYNs <br/> who take your insurance</h1>
                            <SearchColumn>
                                <input style={{width: '60%', borderTopRightRadius: 0, borderBottomRightRadius: 0, borderRight: '2px solid #0000001f'}} type="text" placeholder="Doctor Name" />
                                <input style={{width: '40%', borderTopLeftRadius: 0, borderBottomLeftRadius: 0}} type="text" placeholder="Address" />
                                <button><FaSearch/></button>
                            </SearchColumn>
                        </ColumnOne >
                        <ColumnTwo sm={0} lg={6}   >
                            <img src={hero} alt="hero" />
                        </ColumnTwo>
                    </Grid>
                </Container>
            </Wrap>
        </>
    )
}
