import React from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { FirstSection, NavWrap, SecondSection } from './Dashnav.styles'
import {logout} from '../../redux/auth/actions'

export default function Dashnav({showDash, setShowDash}) {
    const dispatch = useDispatch()

    return (
        <>
            <NavWrap>
                <FirstSection>
                    <GiHamburgerMenu onClick={e => setShowDash(!showDash)} />
                    <Link to="/admin/">Local Doctor</Link>
                </FirstSection>
                <SecondSection>
            
                    <p onClick={e => {dispatch(logout()); dispatch({ type: "IS_NOT_ADMIN" }) }} >Logout</p>
                </SecondSection>
            </NavWrap>
        </>
    )
}
