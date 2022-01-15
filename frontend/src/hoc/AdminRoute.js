import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { AccountWrap, LoginForm } from '../components/Account/Account.styles'
import { Button, Grid } from '../styles/Essentials.styles'
import { FormTitle, Input, InputDiv, Label } from '../styles/Form.styles'

export default function PrivateRoute({children}) {
    const auth = useSelector(state => state.auth)

    if(auth.isAuthenticated){            
        return (
            <>
            {children}
            </>
        )
    } 

    else {
        return(
            <>
                <AdminLogin />
            </>
        )
    }
}



const AdminLogin = () => {
    return (
        <>
            <AccountWrap>
                <Grid direction="column">
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
                            <Button block>Login</Button>
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