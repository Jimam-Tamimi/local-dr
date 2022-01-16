import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { login, signup } from "../../redux/auth/actions";
import { Button, Grid } from "../../styles/Essentials.styles";
import { FormTitle, Input, InputDiv, Label } from "../../styles/Form.styles";
import Modal from "../Modal/Modal";
import {
  AccountWrap,
  ColumnTab,
  LoginForm,
  SignupForm,
} from "./Account.styles";
import { useDispatch } from 'react-redux'


export default function Account() {
  const [form, setForm] = useState("login");
  const location = useLocation();
  const history = useHistory();
  let search = location.search;
  let params = new URLSearchParams(search);
  const [showModal, setShowModal] = useState(
    params.get("show-account") === "true"
  );
  useEffect(() => {
    setShowModal(params.get("show-account") === "true");
  }, [location]);
  useEffect(() => {
    if (!showModal && params.get("show-account") === "true") {
      history.goBack();
    }
  }, [showModal]);







  return (
    <>
      <Modal zoom setShow={setShowModal} show={showModal}>
        <AccountWrap>
          <Grid direction="column">
            {form === "login" ? (
              <Login setForm={setForm} />

            ) : (
              form === "signUp" && (
                <Signup setForm={setForm} />
              )
            )}
          </Grid>
        </AccountWrap>
      </Modal>
    </>
  );
}



function Login({ setForm }) {
  const dispatch = useDispatch()

  // login
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  })
  const { email, password } = loginFormData;
  const history = useHistory()
  const onLoginFormChange = (e) => setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value })
  const loginSubmit = e => {
    e.preventDefault();
    console.log(loginFormData)
    let action = dispatch(login(email, password))
    console.log(action, 'action')
    action.then(res => { res && history.push('/'); setLoginFormData({ email: '', password: '' }) })
  }

  return (
    < >

      <LoginForm onSubmit={loginSubmit}>
        <FormTitle>Enter Email And Password to Login</FormTitle>
        <InputDiv>
          <Label>Enter Your Email</Label>
          <Input
            type="email"
            name="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={onLoginFormChange}
          />
        </InputDiv>
        <InputDiv>
          <Label>Enter Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={onLoginFormChange}
            value={password}

          />
        </InputDiv>
        <InputDiv>
          <Button block>Login</Button>
        </InputDiv>
        <InputDiv style={{ alignItems: 'center' }}>
          <p>New To Local Doctor? <b style={{ cursor: 'pointer' }} onClick={(e) => { setTimeout(() => { setForm('signUp') }, 1) }}  >Create An Account</b></p>
        </InputDiv>
      </LoginForm>



    </>
  )
}


function Signup({ setForm }) {

  // signup
  const [signupForm, setSignupForm] = useState({
    email: "",
    password: "",
    cpassword: "",
  })
  const { email, password, cpassword } = signupForm;
  const dispatch = useDispatch()
  const onSubmit = e => {
    e.preventDefault();
    console.log(signupForm)
    dispatch(signup(email, password, cpassword))
    setSignupForm({ email: '', password: '', cpassword: '' })
  }
  const onChange = e => setSignupForm({ ...signupForm, [e.target.name]: e.target.value })
  
  return (
    < >

      <SignupForm onSubmit={onSubmit}>
        <FormTitle>Enter Email And Password and Create Account</FormTitle>

        <InputDiv>
          <Label>Enter Your Email</Label>
          <Input
            type="email"
            required
            name="email"
            placeholder="Enter Your Email"
            onChange={onChange}
            value={email}
          />
        </InputDiv>
        <InputDiv>
          <Label>Enter Password</Label>
          <Input
            type="password"
            required
            name="password"
            placeholder="Enter Password"
            value={password}
            onChange={onChange}

          />
        </InputDiv>
        <InputDiv>
          <Label>Confirm Password</Label>
          <Input
            type="password"
            required
            name="cpassword"
            placeholder="Confirm Password"
            value={cpassword}
            onChange={onChange}

          />
        </InputDiv>
        <InputDiv>
          <Button block>Login</Button>
        </InputDiv>
        <InputDiv style={{ alignItems: 'center' }}>
          <p>Already have an account? <b style={{ cursor: 'pointer' }} onClick={(e) => { setTimeout(() => { setForm('login') }, 1) }} >Login</b></p>
        </InputDiv>
      </SignupForm>
    </>
  )
}
