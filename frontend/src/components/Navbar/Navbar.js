import React, { useEffect, useRef } from "react";
import {
  Button,
  ButtonLink,
  Column,
  Container,
  Grid,
} from "../../styles/Essentials.styles";
import {
  Account,
  DropdownDiv,
  Logo,
  Logout,
  Menu,
  NavWrap,
} from "./Navbar.styles";
import { IoIosArrowDown } from "react-icons/io";
import logo from "../../assets/images/logo.svg";
import { useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import { useSelector } from "react-redux";

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropDownRef = useRef(null);
  useEffect(() => {
    const toggleOpen = (e) => {
      if (!dropDownRef.current?.contains(e.target) && showDropdown) {
        setShowDropdown(false);
      }
    };
    window.addEventListener("click", toggleOpen);
    return () => {
      window.removeEventListener("click", toggleOpen);
    };
  }, [showDropdown]);

  const auth = useSelector((state) => state.auth);

  return (
    <>
      <NavWrap>
        <Container>
          <Grid lg={6}>
            <Column justify="start">
              <img src={logo} />
            </Column>
            <Column justify="end" spacing={10}>
              {/* {auth.isAuthenticated ? ( */}
                <Account>
                  <Menu onClick={(e) => setShowDropdown(!showDropdown)}>
                    <p>Account</p>
                    <IoIosArrowDown />
                  </Menu>
                  <Dropdown show={showDropdown}>
                    <DropdownDiv ref={dropDownRef}>
                      <Logout>Logout</Logout>
                    </DropdownDiv>
                  </Dropdown>
                </Account>
              {/* :  */}
                <ButtonLink to="?show-account=true">Login/Signup</ButtonLink>
              {/* )} */}
            </Column>
          </Grid>
        </Container>
      </NavWrap>
    </>
  );
}
