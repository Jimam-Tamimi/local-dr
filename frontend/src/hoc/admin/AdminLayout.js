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
import { Button, Column, Flex, Grid } from "../../styles/Essentials.styles";
import { FormTitle, Input, InputDiv, Label } from "../../styles/Form.styles";
import { useDispatch, useSelector } from "react-redux";
import { checkAdmin } from "../../redux/adminAuth/actions";
import { login, logout, refreshToken } from "../../redux/auth/actions";
import SyncLoader from "react-spinners/SyncLoader";
import DotLoader from "react-spinners/DotLoader";
import BeatLoader from "react-spinners/BeatLoader";
import AlertComponent from "../../components/Alert/AlertComponent";
import axios from "axios";
import { appendLink, removeLink } from "../../helpers";
import drImage from "../../assets/images/doctor-image-admin.jpg";

export default function AdminLayout({ children }) {
  const adminAuth = useSelector((state) => state.adminAuth);
  const dispatch = useDispatch();
  const location = useLocation();
  const auth = useSelector((state) => state.auth);
  useEffect(() => {}, []);
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
  useEffect(() => {
    let links = appendLink([
      "https://fonts.googleapis.com/css?family=Karla:400,700&display=swap",
    ]);
    return () => {
      removeLink(links);
    };
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const dispatch = useDispatch();
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("login login");
    await dispatch(login(email, password));
    await dispatch(checkAdmin());
  };
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  return (
    <>
      <AdminFormWrap >
        <div className="login-cart">
          <div className="first-column">
            <img src={drImage} />
          </div>
          <div className="second-column">
            <div className="brand-wrapper">
              <h1>MY City Doc</h1>
            </div>
            <p className="login-card-desc">Hospitals login</p>
            <form onSubmit={onSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                id="email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
              <label htmlFor="password">Password</label>

                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="********"
                  value={password}
                  onChange={onChange}
                />
              </div>
              <button className="login">Login</button>
            </form>
          </div>
        </div>
      </AdminFormWrap>
    </>
  );
};

const AdminFormWrap = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  background-color: #d0d0ce;
  ${Flex}
  & * {
    font-family: "Karla", sans-serif;
  }

  div.login-cart {
    background-color: white;
    border: 0;
    box-shadow: 0 10px 30px 0 rgba(172, 168, 168, 0.43);
    overflow: hidden;
    width: 1110px;
    height: 600px;
    ${Flex}
    justify-content: space-between;

    @media (max-width: 1200px) {
      max-width: 930px;
    }  
    @media (max-width: 992px) {
      max-width: 690px;
    }  
    @media (max-width: 768px) {
      max-width: 80%;
    } 
    div.first-column {
      border: 0;
      border-radius: 27.5px;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      box-shadow: 0 10px 30px 0 rgba(172, 168, 168, 0.43);
      overflow: hidden;
      width: 42%;
      @media (max-width: 768px) {
      display: none;
    } 

      img {
        width: 100%;
        height: 100%;
        height: 600px;
        object-fit: cover;
      }
    }

    div.second-column {
      width: 58%;
      padding: 85px 60px 60px;
      @media (max-width: 768px) {
      width: 100%;

    } 

      div.brand-wrapper {
        margin-bottom: 19px;
      }

      p.login-card-desc {
        font-size: 25px;
        color: #000;
        font-weight: normal;
        margin-bottom: 23px;
      }
      form.login-form {
        max-width: 326px;

        div.form-group {
          margin-bottom: 1rem;

          input {
            display: block;
            width: 100%;
            height: calc(1.5em + 0.75rem + 2px);
            padding: 0.375rem 0.75rem;
            font-size: 1rem;
            font-weight: 400;
            line-height: 1.5;
            color: #495057;
            background-color: #fff;
            background-clip: padding-box;
            border: 1px solid #ced4da;
            border-radius: 0.25rem;
            transition: border-color 0.15s ease-in-out,
              box-shadow 0.15s ease-in-out;

            border: 1px solid #d5dae2;
            padding: 15px 25px;
            margin-bottom: 20px;
            min-height: 45px;
            font-size: 13px;
            line-height: 15;
            font-weight: normal;
            margin-top: 10px;


            &:focus {
              color: #495057;
              background-color: #fff;
              border-color: #80bdff;
              outline: 0;
              box-shadow: 0 0 0 0.2rem rgb(0 123 255 / 25%);
            }
          }
        }
        button.login {
          transition: color 0.15s ease-in-out,
            background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
            box-shadow 0.15s ease-in-out;
          user-select: none;
          text-align: center;
          /* vertical-align: middle; */
          display: block;
          margin-bottom: 1.5rem !important;
          cursor: pointer;
          padding: 13px 20px 12px;
          background-color: rgb(0, 0, 128);
          border-radius: 4px;
          font-size: 17px;
          font-weight: bold;
          line-height: 20px;
          color: #fff;
          width: 100%;
          border: 1px solid transparent;
          &:hover {
            border: 1px solid rgb(0, 0, 128);
            background-color: transparent;
            color: #000;
          }
        }
      }
    }
  }
`;
