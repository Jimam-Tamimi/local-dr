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
import axios from "axios";
import alert from "../../redux/alert/actions";


export default function Account() {
  const [form, setForm] = useState("login");
  const location = useLocation();
  const history = useHistory();
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
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
      history.push(location.pathname);
    }
  }, [showModal]);







  return (
    <>
      <Modal zoom setShow={setShowModal} show={showModal}>
        <AccountWrap>
          <Grid direction="column">
            {
              form === "login" ? <Login setForm={setForm} /> :
                form === "signUp" ? <Signup setForm={setForm} /> :
                  form === "forgotPassword" || form === "forgotPasswordCode" ? <ForgotPassword setForgotPasswordEmail={setForgotPasswordEmail} setForm={setForm} /> :
                    form === "resetPassword" ? <ResetPassword forgotPasswordEmail={forgotPasswordEmail} setForm={setForm} /> : ""




            }
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
  const location = useLocation()
  const onLoginFormChange = (e) => setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value })
  const loginSubmit = e => {
    e.preventDefault();
    console.log(loginFormData)
    let action = dispatch(login(email, password))
    console.log(action, 'action')
    action.then(res => { res && history.push(location.pathname); setLoginFormData({ email: '', password: '' }) })
  }

  return (
    < >

      <LoginForm onSubmit={loginSubmit}>
        <FormTitle>Enter Email And Password to Login</FormTitle>
        <InputDiv>
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={onLoginFormChange}
          />
        </InputDiv>
        <InputDiv>
          <Label>Password</Label>
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
          <p>Forgot Password? <b style={{ cursor: 'pointer' }} onClick={(e) => { setTimeout(() => { setForm('forgotPassword') }, 1) }} >Reset Password</b></p>

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
    name: '',
    number: "",
  })
  const { email, password, cpassword, name, number } = signupForm;
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const onSubmit = e => {
    e.preventDefault();
    console.log(signupForm)
    const action = dispatch(signup(email, password, cpassword, name, number))
    action.then(res => { res && history.push(location.pathname); setSignupForm({ email: '', password: '', cpassword: '', name: '', number: '' }) })



  }
  const onChange = e => setSignupForm({ ...signupForm, [e.target.name]: e.target.value })

  return (
    < >

      <SignupForm onSubmit={onSubmit}>
        <FormTitle>Enter Email And Password and Create Account</FormTitle>

        <InputDiv>
          <Label>Name</Label>
          <Input
            type="text"
            required
            name="name"
            placeholder="Name"
            onChange={onChange}
            value={name}
          />
        </InputDiv>
        <InputDiv>
          <Label>Email</Label>
          <Input
            type="email"
            required
            name="email"
            placeholder="Email"
            onChange={onChange}
            value={email}
          />
        </InputDiv>
       
        <InputDiv>
          <Label>Mobile  Number</Label>
          <Input
            type="tel"
            required
            name="number"
            placeholder="Mobile Number"
            onChange={onChange}
            value={number}
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
          <Button block>Create Account</Button>
        </InputDiv>
        <InputDiv style={{ alignItems: 'center' }}>
          <p>Already have an account? <b style={{ cursor: 'pointer' }} onClick={(e) => { setTimeout(() => { setForm('login') }, 1) }} >Login</b></p>
        </InputDiv>
      </SignupForm>
    </>
  )
}

function ForgotPassword({ setForm, setForgotPasswordEmail }) {

  const [codeSent, setCodeSent] = useState(false);
  const [codeResendAble, setCodeResendAble] = useState(false);


  const [code, setCode] = useState(null);

  const [formData, setFormData] = useState({
    email: "",
  });

  const { email } = formData;
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const onSubmit = async e => {
    e.preventDefault();
    console.log(formData)
    const res = await axios.post(`${process.env.REACT_APP_API_URL}api/account/forgot_password/`, { email })
    console.log(res)
    if (res?.status == 200) {
      setCodeSent(true)
      setCodeResendAble(false)
      setForm('forgotPasswordCode')
      setTimeout(() => {
        setCodeResendAble(true)
      }, 20000);
    }
  }
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

  const verifyCode = async e => {
    e.preventDefault()
    try {

      const res = await axios.post(`${process.env.REACT_APP_API_URL}api/account/verify_reset_password_code/`, { code, code })
      console.log(res);
      if (res.status === 200) {
        setForgotPasswordEmail(email)
        setForm('resetPassword')
      }
    } catch (err) {
      dispatch(alert(err?.response?.data?.error, 'danger'))
    }

  }



  return (
    < >

      <SignupForm onSubmit={onSubmit}>
        <FormTitle>Forgot Password</FormTitle>

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
        {
          codeSent &&
          <InputDiv>
            <Label>Enter the Code Send to Your Email</Label>
            <Input
              type="text"
              required
              name="code"
              placeholder="Enter the Code Send to Your Email"
              onChange={e => setCode(e.target.value)}
              value={code}
            />
          </InputDiv>
        }
        <InputDiv>
          {
            codeSent ?
              <Button onClick={e => { e.preventDefault(); verifyCode(e) }} block>Request Reset</Button> :
              <Button type="submit" block>Send Reset Code</Button>
          }
        </InputDiv>
        <InputDiv style={{ alignItems: 'center' }}>
          <p>Already have an account? <b style={{ cursor: 'pointer' }} onClick={(e) => { setTimeout(() => { setForm('login') }, 1) }} >Login</b></p>
          {
            codeSent &&

            <p>Verification code sent to your email.
              {
                codeResendAble ?
                  <b style={{ cursor: 'pointer' }} onClick={onSubmit} > Resend Code</b> :
                  <b style={{ cursor: 'not-allowed', opacity: '.7' }} > Can Resend After 20s</b>
              }
            </p>
          }
        </InputDiv>
      </SignupForm>
    </>
  )
}

function ResetPassword({ setForm, forgotPasswordEmail }) {

  // signup 
  const [formData, setFormData] = useState({
    email: forgotPasswordEmail,
    password: '',
    cpassword: '',
  });
  const { email, password, cpassword } = formData;
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const onSubmit = async e => {
    e.preventDefault();
    console.log(formData)
    const res = await axios.post(`${process.env.REACT_APP_API_URL}api/account/reset_password/`, formData)
    console.log(res)
    if (res?.status == 200) {
      setFormData({ email: '' })
      setForm('login')
    }
  }
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

  return (
    < >

      <SignupForm onSubmit={onSubmit}>
        <FormTitle>Reset Password</FormTitle>


        <InputDiv>
          <Label>New Password</Label>
          <Input
            type="password"
            required
            name="password"
            placeholder="New Password"
            onChange={onChange}
            value={password}
          />
        </InputDiv>
        <InputDiv>
          <Label>Confirm Password</Label>
          <Input
            type="password"
            required
            name="cpassword"
            placeholder="Confirm Password"
            onChange={onChange}
            value={cpassword}
          />
        </InputDiv>
        <InputDiv>
          <Button block>Reset Password</Button>
        </InputDiv>
        <InputDiv style={{ alignItems: 'center' }}>
          <p>Already have an account? <b style={{ cursor: 'pointer' }} onClick={(e) => { setTimeout(() => { setForm('login') }, 1) }} >Login</b></p>
        </InputDiv>
      </SignupForm>
    </>
  )
}
