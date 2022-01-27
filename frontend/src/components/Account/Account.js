import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { login, signup } from "../../redux/auth/actions";
import { Button, Grid } from "../../styles/Essentials.styles";
import { FormTitle, Input, InputDiv, Label } from "../../styles/Form.styles";
import Modal from "../Modal/Modal";
import {
  AccountWrap,
  Form,
} from "./Account.styles";
import { useDispatch } from 'react-redux'
import axios from "axios";
import alert from "../../redux/alert/actions";
import { setProgress } from "../../redux/progress/actions";
import {appendLink, removeLink } from '../../helpers'

export default function Account() {

  useEffect(() => {
    let links = appendLink([
      "https://fonts.googleapis.com/css?family=Lato:300,400,700&display=swap",
    ]);
    return () => {
      removeLink(links);
    };
  }, []);
  
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
  const loginSubmit = async e => {
    e.preventDefault();
    dispatch(setProgress(20))
    console.log(loginFormData)
    let action = await dispatch(login(email, password))
    dispatch(setProgress(100))
    if(action){
      setLoginFormData({ email: '', password: '' }) 
      history.push(location.pathname); 
    }
    console.log(action, 'action')
  }

  return (
    < >

      <Form onSubmit={loginSubmit}>
        <h2 className="form-heading">Sign In</h2>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={onLoginFormChange}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={onLoginFormChange}
            value={password}
          />
        </div>
        <div className="form-group">
          <button block>Login</button>
        </div>

        <div className="form-group">
          <p onClick={e => setTimeout(() => { setForm('forgotPassword') }, 1) }  style={{textAlign: "end"}} >Forgot Password</p>
        </div>

        <div  className="form-group m-0" >
          <p className="center">Not a member? <p className="link" onClick={e => setTimeout(() => { setForm('signUp') }, 1) }   >Sign Up</p></p>
        </div>
      </Form>



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
  const onSubmit = async e => {
    e.preventDefault();
    dispatch(setProgress(20))
    console.log(signupForm)
    const action = await dispatch(signup(email, password, cpassword, name, number))
    dispatch(setProgress(100))
    if(action){
      setSignupForm({ email: '', password: '', cpassword: '', name: '', number: '' }) 
      history.push(location.pathname); 
    } 



  }
  const onChange = e => setSignupForm({ ...signupForm, [e.target.name]: e.target.value })

  return (
    < >

      <Form  onSubmit={onSubmit}>
        <h2 className="form-heading">Sign Up</h2>

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            required
            name="name"
            placeholder="Name"
            onChange={onChange}
            value={name}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            required
            name="email"
            placeholder="Email"
            onChange={onChange}
            value={email}
          />
        </div>

        <div className="form-group">
          <label>Mobile  Number</label>
          <input
            type="tel"
            required
            name="number"
            placeholder="Mobile Number"
            onChange={onChange}
            value={number}
          />
        </div>
        <div className="form-group">
          <label>Enter Password</label>
          <input
            type="password"
            required
            name="password"
            placeholder="Enter Password"
            value={password}
            onChange={onChange}

          />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            required
            name="cpassword"
            placeholder="Confirm Password"
            value={cpassword}
            onChange={onChange}

          />
        </div>
        <div className="form-group">
          <button block>Create Account</button>
        </div>
        <div className="form-group">
          <p onClick={e => setTimeout(() => { setForm('forgotPassword') }, 1) }  style={{textAlign: "end"}} >Forgot Password</p>
        </div>

        <div  className="form-group m-0" >
          <p className="center">Already have an account? <p className="link" onClick={e => setTimeout(() => { setForm('login') }, 1) }   >Login</p></p>
        </div> 
      </Form>
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
    dispatch(setProgress(20))
    console.log(formData)
    try {

      const res = await axios.post(`${process.env.REACT_APP_API_URL}api/account/forgot_password/`, { email })
      console.log(res)
      dispatch(setProgress(90))
      if (res?.status == 200) {
        setCodeSent(true)
        setCodeResendAble(false)
        setForm('forgotPasswordCode')
        setTimeout(() => {
          setCodeResendAble(true)
        }, 20000);
      }
    } catch (err) {
    }
    dispatch(setProgress(100))
  }
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

  const verifyCode = async e => {
    dispatch(setProgress(20))
    e.preventDefault()
    try {

      const res = await axios.post(`${process.env.REACT_APP_API_URL}api/account/verify_reset_password_code/`, { code, code })
      console.log(res);
      dispatch(setProgress(60))
      if (res.status === 200) {
        setForgotPasswordEmail(email)
        setForm('resetPassword')
      }
    } catch (err) {
      dispatch(alert(err?.response?.data?.error, 'danger'))
    }
    dispatch(setProgress(100))


  }



  return (
    < >

      <Form  onSubmit={onSubmit}>
        <h2 className="form-heading">Forgot Password</h2>

        <div className="form-group">
          <label>Enter Your Email</label>
          <input
            type="email"
            required
            name="email"
            placeholder="Enter Your Email"
            onChange={onChange}
            value={email}
          />
        </div>
        {
          codeSent &&
          <div className="form-group">
          <label>Enter the Code Send to Your Email</label>
            <input
              type="text"
              required
              name="code"
              placeholder="Enter the Code Send to Your Email"
              onChange={e => setCode(e.target.value)}
              value={code}
            />
          </div>
        }
        <div className="form-group">
          {
            codeSent ?
              <button onClick={e => { e.preventDefault(); verifyCode(e) }} block>Request Reset</button> :
              <button type="submit" block>Send Reset Code</button>
          }
        </div>


        <div className="form-group">
          {
            codeSent &&
              <p onClick={e => setTimeout(() => { codeResendAble && onSubmit(e) }, 1) }  style={{textAlign: "end"}} >{codeResendAble ? "Resend Code": "Can Resend After 20s"}</p>

          }
        </div>

        <div  className="form-group m-0" >
          <p className="center">Already have an account? <p className="link" onClick={e => setTimeout(() => { setForm('login') }, 1) }   >Login</p></p>
        </div> 

      </Form>
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
    dispatch(setProgress(20))
    e.preventDefault();
    console.log(formData)
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}api/account/reset_password/`, formData)
      console.log(res)
      dispatch(setProgress(70))
      if (res?.status == 200) {
        setFormData({ email: '' })
        setForm('login')
      }
    } catch (err) {
    }
    dispatch(setProgress(100))
  }
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

  return (
    < >

      <Form  onSubmit={onSubmit}>
        <h2 className="form-heading">Reset Password</h2>

        <div className="form-group">

          <label>New Password</label>
          <input
            type="password"
            required
            name="password"
            placeholder="New Password"
            onChange={onChange}
            value={password}
          />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            required
            name="cpassword"
            placeholder="Confirm Password"
            onChange={onChange}
            value={cpassword}
          />
        </div>
        <div className="form-group">
          <button block>Reset Password</button>
        </div>

        <div  className="form-group m-0" >
          <p className="center">Not a member? <p className="link" onClick={e => setTimeout(() => { setForm('signUp') }, 1) }   >Sign Up</p></p>
        </div>
         
      </Form>
    </>
  )
}
