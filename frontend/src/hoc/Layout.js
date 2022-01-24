import React, { } from "react";
import PrivateComponent from "./PrivateComponent";
import GuestComponent from "./GuestComponent";
import GlobalStyle from "../globalStyles";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { useLocation } from "react-router-dom";
import AlertComponent from "../components/Alert/AlertComponent";
import Loader from "react-spinners/SyncLoader";
import styled from "styled-components";
import { Flex } from "../styles/Essentials.styles";

export default function Layout({ children }) {
  const location = useLocation()

  return (
    <>
      {
        location.pathname.startsWith("/") && !location.pathname.startsWith("/admin") &&
        <>
          <GlobalStyle />
          <PrivateComponent></PrivateComponent>
          <Navbar  />
          <AlertComponent />
          <main style={{ minHeight: 'calc(100vh - (100px + 76.3906px))' }}>
            {children}
          </main>
          <Footer /> 
        </>
      }
    </>
  );
}



// const LoaderDiv = styled.div`
//   position: fixed;
//   top: 0;
//   right: 0;
//   width: 100vw;
//   height: 100vh;
//   background: #0000008c;
//   ${Flex}

//   ${({ show }) => show ? `
//   visibility: show;
//     opacity: 1;
//   `: `
//   visibility: hidden;
//     opacity: 0;
//   `} {
  
  
// `