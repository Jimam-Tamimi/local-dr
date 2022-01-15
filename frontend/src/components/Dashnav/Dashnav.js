import React from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { Link } from 'react-router-dom'
import { FirstSection, NavWrap, SecondSection } from './Dashnav.styles'

export default function Dashnav({showDash, setShowDash}) {
    return (
        <>
            <NavWrap>
                <FirstSection>
                    <GiHamburgerMenu onClick={e => setShowDash(!showDash)} />
                    <Link to="/admin/">Local Doctor</Link>
                </FirstSection>
                <SecondSection>
                    <p>Logout</p>
                </SecondSection>
            </NavWrap>
        </>
    )
}
