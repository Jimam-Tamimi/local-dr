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
  MobileMenu,
  MobileMenuDiv,
  NavWrap,
  SearchColumnNav,
  SearchMobileColumn,
  SearchModal,
} from "./Navbar.styles";
import { IoIosArrowDown } from "react-icons/io";
import logo from "../../assets/images/logo.svg";
import { useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { SearchColumn } from "../../pages/styles/home/Home.styles";
import { FaSearch } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import Modal from "../Modal/Modal";
import { AiOutlineSearch } from "react-icons/ai";
import { IoLocationSharp } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSearch, setShowSearch] = useState(
    window.innerWidth > 995 ? true : false
  )
  const [showNav, setShowNav] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
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
      if (window.innerWidth > 995) {
        setShowSearchModal(false)
        setShowSearch(true)
      } else {
        setShowSearch(false)

      }
    })
  }, [showSearch])

  const location = useLocation();

  const auth = useSelector((state) => state.auth);

  const navRef = useRef(null);
  useEffect(() => {
    const toggleOpen = (e) => {
      if (!navRef.current.contains(e.target) && showNav) {
        setShowNav(false);
      }
    };
    window.addEventListener("click", toggleOpen);
    return () => {
      window.removeEventListener("click", toggleOpen);
    };
  }, [showNav]);

  return (
    <>
      <NavWrap data-aos="fade-in" className={location.pathname === "/" && "bg-color"}>
        <Container>
          <Grid wrap="no-wrap" justify="space-between" >
            {
              showSearch &&
              <Column justify="start" lg={2} sm={0} >
                <Link to='/'>
                  <img src={logo} />
                </Link>
              </Column>
            }
            {
              !showSearch &&
              <Column justify="start" sx={2} >
              <MobileMenu>
                <GiHamburgerMenu onClick={e => setShowNav(!showNav)} style={{ fontSize: "28px", color: "var(--primary-text-color)", cursor: "pointer", }} />
                <MobileMenuDiv ref={navRef} show={showNav} >
                  <Link to="?show-account=true"><Account>
                    <Menu onClick={(e) => setShowDropdown(!showDropdown)}>
                      <p style={{ textDecoration: 'underline', fontWeight: 600 }}>Login/Signup</p>
                    </Menu>

                  </Account></Link>
                </MobileMenuDiv>
              </MobileMenu>
              </Column>

            }
            {
              showSearch ? location.pathname !== "/" &&
                <Column justify="start" lg={8} sm={3} spacing={10}>
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
                </Column> :
                <SearchMobileColumn onClick={e => setShowSearchModal(!showSearchModal)} >
                  <BsSearch />
                  <div>

                    <b>Primary Care Physician (PCP)</b>
                    <p>Place</p>
                  </div>
                </SearchMobileColumn>
            }

            {showSearch ?
              <Column justify="end" lg={2} sm={2} sx={2} spacing={10}>

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
                </Account>) : (

                <Link to="?show-account=true"><Account>
                  <Menu onClick={(e) => setShowDropdown(!showDropdown)}>
                    <p style={{ textDecoration: 'underline', fontWeight: 600 }}>Login/Signup</p>
                  </Menu>

                </Account></Link> )}


              </Column> :''
              }
          </Grid>
        </Container>
      </NavWrap>
      {
        !showSearch &&
        <Modal show={showSearchModal} setShow={setShowSearchModal}>

          <SearchModal>
            <SearchColumn  >

              <div
                style={{
                  width: "60%",
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  borderRight: "2px solid #0000001f",
                }}
              >
                <AiOutlineSearch />
                <input

                  type="text"
                  placeholder={`Search For Doctor or Hospital`}
                />
              </div>

              <div
                style={{
                  width: "40%",
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                }}
              >
                <IoLocationSharp />

                <input
                  type="text"
                  placeholder="My Location"
                />
              </div>

              <button>Find Care</button>

            </SearchColumn>
          </SearchModal>

        </Modal>
      }

    </>
  );
}
