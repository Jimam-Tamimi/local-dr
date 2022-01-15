import React from 'react'
import { useState } from 'react'
import { Route, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Dashboard from '../../components/Dashboard/Dashboard'
import Dashnav from '../../components/Dashnav/Dashnav'
import { AdminGlobalStyle } from '../../globalStyles'
import AdminComponent from './AdminComponent'
import { AccountWrap, LoginForm } from '../../components/Account/Account.styles'
import { Button, Grid } from '../../styles/Essentials.styles'
import { FormTitle, Input, InputDiv, Label } from '../../styles/Form.styles'
import { useSelector } from 'react-redux'

export default function AdminLayout({ children }) {
    const location = useLocation()
    const [showDash, setShowDash] = useState(
        window.innerWidth > 850 ? true : false
    )
    window.onresize = () => {
        setShowDash(window.innerWidth > 850 ? true : false)
    }
    const auth = useSelector(state => state.auth)
    return (
        <>
            {
                location.pathname.startsWith("/admin") &&
                <>
                        <AdminGlobalStyle />
                    <AdminComponent >

                        <Dashnav setShowDash={setShowDash} showDash={showDash} />
                        <Dashboard setShowDash={setShowDash} showDash={showDash} />
                    </AdminComponent>
                    {
                        true ?
                        <Content showDash={showDash}>
                        {children}
                        </Content> : 
                        <AdminLogin />


}       
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




const AdminLogin = () => {
    return (
        <>
            <AccountWrap style={{    margin: "auto", height: "100vh", display:'flex', alignItems:'center'}}>
                <Grid  direction="column">
                    <LoginForm>
                        <FormTitle>Enter Email And Password to Login</FormTitle>
                        <InputDiv>
                            <Label>Enter Your Email</Label>
                            <Input
                                type="email"
                                name="email"
                                placeholder="Enter Your Email"
                            />
                        </InputDiv>
                        <InputDiv>
                            <Label>Enter Password</Label>
                            <Input
                                type="password"
                                name="password"
                                placeholder="Enter Password"
                            />
                        </InputDiv>
                        <InputDiv>
                            <Button green block>Login</Button>
                        </InputDiv>
                        <InputDiv style={{ alignItems: 'center' }}>
                            {/* <p>New To Local Doctor? <b style={{ cursor: 'pointer' }} onClick={(e) => { setTimeout(() => { setForm('signUp') }, 1) }}  >Create An Account</b></p> */}
                        </InputDiv>
                    </LoginForm>

                </Grid>
            </AccountWrap>
        </>
    )
}