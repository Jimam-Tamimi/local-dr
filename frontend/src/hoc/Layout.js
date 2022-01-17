import React, { } from "react";
import PrivateComponent from "./PrivateComponent";
import GuestComponent from "./GuestComponent";
import GlobalStyle from "../globalStyles";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { useLocation } from "react-router-dom";
import AlertComponent from "../components/Alert/AlertComponent";

export default function Layout({ children }) {
  const location = useLocation()
  return (
    <>
      {
        location.pathname.startsWith("/") && !location.pathname.startsWith("/admin") &&
        <>
          <GlobalStyle />
          <PrivateComponent></PrivateComponent>
          <Navbar />
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
