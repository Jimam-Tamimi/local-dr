import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Button, Grid } from '../../styles/Essentials.styles'
import { Input, InputDiv, Label } from '../../styles/Form.styles'
import Modal from '../Modal/Modal'
import { AccountWrap, ColumnTab, LoginForm, SignupForm } from './Account.styles'

export default function Account() {
    const [form, setForm] = useState('login')
    const location = useLocation()
    const history = useHistory()
    let search = location.search
    let params = new URLSearchParams(search) 
    const [showModal, setShowModal] = useState(params.get('show-account') === 'true')
    useEffect(() => { 
        setShowModal(params.get('show-account') === 'true')
        
    }, [location])
    useEffect(() => { 
        if(!showModal && params.get('show-account') === 'true' ){
            history.goBack()
        }
    }, [showModal])
    return (
        <>
            <Modal setShow={setShowModal} show={showModal} >
                <AccountWrap>
                    <Grid>
                        <ColumnTab onClick={e => setForm('login')}  className={form==='login' && 'active'} lg={6} >Login</ColumnTab>
                        <ColumnTab onClick={e => setForm('signUp' )}  className={form==='signUp' && 'active'} lg={6} >Signup</ColumnTab>
                    </Grid>
                    <Grid direction="column">
                        {
                            form === 'login' ?
                            <LoginForm>
                            <InputDiv>
                                <Label>Enter Your Email</Label>
                                <Input type='email' name="email" placeholder='Enter Your Email'/>
                            </InputDiv>
                            <InputDiv>
                                <Label>Enter Password</Label>
                                <Input type='password' name="password" placeholder='Enter Password'/>
                            </InputDiv>
                            <InputDiv>
                                <Button block>Login</Button>
                            </InputDiv>
                        </LoginForm> 
                        :  form === 'signUp' &&
                        <SignupForm>
<InputDiv>
                                <Label>Enter Your Email</Label>
                                <Input type='email' name="email" placeholder='Enter Your Email'/>
                            </InputDiv>
                            <InputDiv>
                                <Label>Enter Password</Label>
                                <Input type='password' name="password" placeholder='Enter Password'/>
                            </InputDiv>
                            <InputDiv>
                                <Label>Confirm Password</Label>
                                <Input type='password' name="cpassword" placeholder='Confirm Password'/>
                            </InputDiv>
                            <InputDiv>
                                <Button block>Login</Button>
                            </InputDiv>
                        </SignupForm>
}
                    </Grid>
                       
                </AccountWrap>
            </Modal>
        </>
    )
}
