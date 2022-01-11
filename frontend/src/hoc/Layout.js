import React, {  } from "react";
import PrivateComponent from "./PrivateComponent";
import GuestComponent from "./GuestComponent";
import GlobalStyle from "../globalStyles";
import Navbar from "../components/Navbar/Navbar";

export default function Layout({ children }) {
  return (
    <>
    <GlobalStyle />
      <PrivateComponent></PrivateComponent>
      <GuestComponent>
        <Navbar />
      </GuestComponent>
        {children}
    </>
  );
}
