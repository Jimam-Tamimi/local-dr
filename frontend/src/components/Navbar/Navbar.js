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
  SearchColumnNav,
} from "./Navbar.styles";
import { IoIosArrowDown } from "react-icons/io";
import logo from "../../assets/images/logo.svg";
import { useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { SearchColumn } from "../../pages/styles/home/Home.styles";
import { FaSearch } from "react-icons/fa";

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSearch, setShowSearch] = useState(
    window.innerWidth > 965 ? true : false
  )
  
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

  useEffect(() => {
      window.addEventListener("resize", () => {
        if(window.innerWidth > 965 ){
          setShowSearch(true)
        } else {
          setShowSearch(false)

        }
      })
  }, [showSearch])

  const location = useLocation();

  const auth = useSelector((state) => state.auth);
  console.log(location);
  
  return (
    <>
      <NavWrap className={location.pathname === "/" && "bg-color"}>
        <Container>
          <Grid wrap="no-wrap" justify="space-between" >
            <Column justify="start" lg={2}  >
              <Link to='/'>
              <img src={logo} />
              </Link>
            </Column>
            {
              showSearch && location.pathname !== "/" && 
            <Column   justify="start" lg={8}   spacing={10}>
              <SearchColumnNav>
                <input
                  style={{
                    width: "60%",
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    borderRight: "2px solid #0000001f",
                  }}
                  type="text"
                  placeholder="Doctor Name"
                />
                <input
                  style={{
                    width: "40%",
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                  }}
                  type="text"
                  placeholder="Address"
                />
                <button>
                  <FaSearch />
                </button>
              </SearchColumnNav>
            </Column>
            }

            <Column justify="end" lg={2}   spacing={10}>
              {auth.isAuthenticated ? (
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
                </Account> ) : (
              
              <ButtonLink to="?show-account=true">Login/Signup</ButtonLink>
               )}
            </Column>
          </Grid>
        </Container>
      </NavWrap>
    </>
  );
}
