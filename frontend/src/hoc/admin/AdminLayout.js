import React, { useEffect } from "react";
import { useState } from "react";
import { Route, useLocation } from "react-router-dom";
import styled from "styled-components";
import Dashboard from "../../components/Dashboard/Dashboard";
import Dashnav from "../../components/Dashnav/Dashnav";
import { AdminGlobalStyle } from "../../globalStyles";
import AdminComponent from "./AdminComponent";
import {
  AccountWrap,
  LoginForm,
} from "../../components/Account/Account.styles";
import { Button, Column, Grid } from "../../styles/Essentials.styles";
import { FormTitle, Input, InputDiv, Label } from "../../styles/Form.styles";
import { useDispatch, useSelector } from "react-redux";
import { checkAdmin } from "../../redux/adminAuth/actions";
import { login, refreshToken } from "../../redux/auth/actions";
import SyncLoader from "react-spinners/SyncLoader";
import DotLoader from "react-spinners/DotLoader";
import BeatLoader from "react-spinners/BeatLoader";
import AlertComponent from "../../components/Alert/AlertComponent";
import axios from "axios";

export default function AdminLayout({ children }) {
  const adminAuth = useSelector((state) => state.adminAuth);
  const dispatch = useDispatch();
  const location = useLocation();
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
 
  }, []);
  const [showDash, setShowDash] = useState(
    window.innerWidth > 850 ? true : false
  );
  window.onresize = () => {
    setShowDash(window.innerWidth > 850 ? true : false);
  };

  

  return (
    <>
      {location.pathname.startsWith("/admin") && (
        <>
          <AlertComponent />

          <AdminGlobalStyle />
          <AdminComponent>
            <Dashnav setShowDash={setShowDash} showDash={showDash} />
            <Dashboard setShowDash={setShowDash} showDash={showDash} />
          </AdminComponent>
          {adminAuth.isAdmin === true ? (
            <Content showDash={showDash}>{children}</Content>
          ) : adminAuth.isAdmin === "loading" ? (
            <Column
              style={{
                height: "100vh",
                position: "absolute",
                top: 0,
                left: 0,
                width: "100vw",
              }}
            >
              <SyncLoader size={30} color="#39b27c" />
            </Column>
          ) : (
            <AdminLogin />
          )}
        </>
      )}
    </>
  );
}

const Content = styled.main`
  border: 25px solid #f3f3f3;
  border-top: 25px solid #f3f3f3;

  height: auto;
  min-height: calc(100vh - 60px);
  ${(window.onresize = () => {
    return window.innerWidth > 850 ? `margin-left: 215px;` : "";
  })}

  transition: var(--main-transition);
  ${({ showDash }) => !showDash && `margin-left: 0px;`}
`;

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const dispatch = useDispatch();
  const onSubmit = async (e) => {
    e.preventDefault();
    await dispatch(login(email, password));
    await dispatch(checkAdmin());
  };
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  return (
    <>
      <AccountWrap
        style={{
          margin: "auto",
          height: "100vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Grid direction="column">
          <LoginForm onSubmit={onSubmit}>
            <FormTitle>Enter Email And Password to Login</FormTitle>
            <InputDiv>
              <Label>Enter Your Email</Label>
              <Input
                type="email"
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
                name="password"
                placeholder="Enter Password"
                value={password}
                onChange={onChange}
              />
            </InputDiv>
            <InputDiv>
              <Button green block>
                Login
              </Button>
            </InputDiv>
            <InputDiv style={{ alignItems: "center" }}>
              {/* <p>New To Local Doctor? <b style={{ cursor: 'pointer' }} onClick={(e) => { setTimeout(() => { setForm('signUp') }, 1) }}  >Create An Account</b></p> */}
            </InputDiv>
          </LoginForm>
        </Grid>
      </AccountWrap>
    </>
  );
};
