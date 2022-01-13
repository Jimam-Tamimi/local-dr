import React, {  } from "react";
import PrivateComponent from "./PrivateComponent";
import GuestComponent from "./GuestComponent";
import GlobalStyle from "../globalStyles";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

export default function Layout({ children }) {
  return (
    <>
    <GlobalStyle />
      <PrivateComponent></PrivateComponent>
      <GuestComponent>
        <Navbar />
        <main style={{minHeight: 'calc(100vh - (100px + 76.3906px))'}}>
        {children}
        </main>
        <Footer/>
      </GuestComponent>
    </>
  );
}
