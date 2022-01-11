import React from 'react'
import { Button, ButtonLink, Column, Container, Grid } from '../../styles/Essentials.styles'
import {Logo, NavWrap} from './Navbar.styles'

import logo from '../../assets/images/logo.svg'

export default function Navbar() {
    return (
        <>
            <NavWrap>
                <Container>

                <Grid lg={6} >
                    <Column justify='start'   >
                        <img src={logo} />
                    </Column>
                    <Column  justify="end"  spacing={10}  >
                        <ButtonLink to='/account/' >Login/Signup</ButtonLink>
                        <p>Account</p>
                    </Column>
                </Grid>
                </Container>
            </NavWrap>
        </>
    )
}
