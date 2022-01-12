import React from 'react'
import { Button, ButtonLink, Column, Container, Grid } from '../../styles/Essentials.styles'
import {Account, DropdownDiv, Logo, Menu, NavWrap} from './Navbar.styles'
import {IoIosArrowDown} from 'react-icons/io'
import logo from '../../assets/images/logo.svg'
import { useState } from 'react'
import Dropdown from '../Dropdown/Dropdown'

export default function Navbar() {
    const [showDropdown, setShowDropdown] = useState(false)
    
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
                        <Account>
                            <Menu onClick={e => setShowDropdown(!showDropdown)}>
                                <p>Account</p>
                                <IoIosArrowDown />
                            </Menu>
                            <Dropdown show={showDropdown}>
                                <DropdownDiv>

                                </DropdownDiv>
                            </Dropdown>
                        </Account>
                    </Column>
                </Grid>
                </Container>
            </NavWrap>
        </>
    )
}
