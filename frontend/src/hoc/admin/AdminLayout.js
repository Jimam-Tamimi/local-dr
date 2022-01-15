import React from 'react'
import { useState } from 'react'
import { Route, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Dashboard from '../../components/Dashboard/Dashboard'
import Dashnav from '../../components/Dashnav/Dashnav'
import { AdminGlobalStyle } from '../../globalStyles'

export default function AdminLayout({ children }) {
    const location = useLocation()
    const [showDash, setShowDash] = useState(
        window.innerWidth > 850 ? true : false
    )
    window.onresize = () => {
        setShowDash(window.innerWidth > 850 ? true : false)
    }
    return (
        <>
            {
                location.pathname.startsWith("/admin") &&
                <>
                    <AdminGlobalStyle />
                    <Dashnav setShowDash={setShowDash} showDash={showDash} />
                    <Dashboard setShowDash={setShowDash} showDash={showDash} />
                    <Content showDash={showDash}>
                    {children}
                    </Content>
                </>
            }
        </>
    )
}

const Content = styled.main`
    border: 25px solid #f3f3f3;
    border-top: 25px solid #f3f3f3;


    height: auto;
    min-height: calc(100vh - 60px)  ;
    ${window.onresize = () => {
       return  window.innerWidth > 850 ? `margin-left: 215px;` : ''
     }}
    
    transition: var(--main-transition);
    ${({showDash}) => !showDash && `margin-left: 0px;`}

`
