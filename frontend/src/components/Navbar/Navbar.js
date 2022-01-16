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
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { SearchColumn } from "../../pages/styles/home/Home.styles";
import { FaSearch } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import Modal from "../Modal/Modal";
import { AiOutlineSearch } from "react-icons/ai";
import { IoLocationSharp } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { logout } from "../../redux/auth/actions";

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSearch, setShowSearch] = useState(
    window.innerWidth > 995 ? true : false
  )
  const [showNav, setShowNav] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);


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
      if (!navRef?.current?.contains(e.target) && showNav) {
        setShowNav(false);
      }
    };
    window.addEventListener("click", toggleOpen);
    return () => {
      window.removeEventListener("click", toggleOpen);
    };
  }, [showNav]);

  const dispatch = useDispatch()

  return (
    <>
      <NavWrap className={location.pathname === "/" && "bg-color"}>
        <Container>
          <Grid wrap="no-wrap" justify={!showSearch && location.pathname === '/' ? `flex-end` : 'space-between'}  >
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
              <Column justify={!showSearch && location.pathname === '/' ? `flex-end` : 'start'} sx={2} >
                <MobileMenu>
                  <GiHamburgerMenu onClick={e => setShowNav(!showNav)} style={{ fontSize: "28px", color: "var(--primary-text-color)", cursor: "pointer", }} />
                  <MobileMenuDiv ref={navRef} show={showNav} >
                    <ImCross  onClick={e => setShowNav(false)} style={{position: "absolute", left: 20, top: 20}} />
                    <Account>
                      {auth.isAuthenticated ?
                        <>
                          <Menu onClick={(e) => dispatch(logout())}>
                            <Button style={{ textDecoration: 'underline', fontWeight: 600 }}>Logout</Button>
                          </Menu>
                          <Menu onClick={(e) => setShowDropdown(!showDropdown)}>
                            <p to="/your-appointments/" style={{ textDecoration: 'underline', fontWeight: 600 }}>Your Appointments</p>
                          </Menu>
                        </> :
                        <Link to="?show-account=true">
                          <Menu onClick={(e) => setShowDropdown(!showDropdown)}>
                            <Button style={{ textDecoration: 'underline', fontWeight: 600 }}>Login/Signup</Button>
                          </Menu>

                        </Link>
                      }
                    </Account>
                  </MobileMenuDiv>
                </MobileMenu>
              </Column>

            }
            {
              location.pathname.startsWith('/search')  && (

                showSearch ?
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
                        placeholder="Search for a doctor or hospital "
                      />
                      <input
                        style={{
                          width: "40%",
                          borderTopLeftRadius: 0,
                          borderBottomLeftRadius: 0,
                        }}
                        type="text"
                        placeholder="My Location"
                      />
                      <button>
                        <FaSearch />
                      </button>
                    </SearchColumnNav>
                  </Column> :
                  <SearchMobileColumn onClick={e => setShowSearchModal(!showSearchModal)} >
                    <BsSearch />
                    <div>

                      <b>Search for a doctor or hospital</b>
                      <p>My Location</p>
                    </div>
                  </SearchMobileColumn>
              )

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
                      <DropdownDiv >
                        <Logout onClick={e => dispatch(logout())}>Logout</Logout>
                      </DropdownDiv>
                    </Dropdown>
                  </Account>) : (

                  <Link to="?show-account=true"><Account>
                    <Menu onClick={(e) => setShowDropdown(!showDropdown)}>
                      <p style={{ textDecoration: 'underline', fontWeight: 600 }}>Login/Signup</p>
                    </Menu>

                  </Account></Link>)}


              </Column> : ''
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
