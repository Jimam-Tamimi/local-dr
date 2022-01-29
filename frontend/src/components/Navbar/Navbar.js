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
import { Link, useHistory, useLocation } from "react-router-dom";
import { SearchColumn } from "../../pages/styles/home/Home.styles";
import { FaSearch } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import Modal from "../Modal/Modal";
import { AiOutlineSearch } from "react-icons/ai";
import { IoLocationSharp } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { logout } from "../../redux/auth/actions";
import ReactGoogleAutocomplete, {
  usePlacesWidget,
} from "react-google-autocomplete";
import axios from "axios";
import {
  Actions,
  OptionsColumn,
  Search,
  Table,
  Td,
  Th,
  Tr,
} from "../../styles/Table.styles";
import { Autocomplete } from "@react-google-maps/api";

export default function Navbar({}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSearch, setShowSearch] = useState(
    window.innerWidth > 995 ? true : false
  );
  const [showNav, setShowNav] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth > 995) {
        setShowSearchModal(false);
        setShowSearch(true);
      } else {
        setShowSearch(false);
      }
    });
  }, [showSearch]);

  const location = useLocation();

  const auth = useSelector((state) => state.auth);
  const adminAuth = useSelector((state) => state.adminAuth);
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

  const dispatch = useDispatch();

  const history = useHistory();
  // search

  const searchQ = window.location.search; // could be '?foo=bar'
  const params = new URLSearchParams(searchQ);
  const [searchDoctor, setSearchDoctor] = useState(params.get("doctor") || "");

  const [doctorRecommendations, setDoctorRecommendations] = useState([]);
  const getDoctorRecommendations = async (e) => {
    try {
      dispatch({ type: "CHANGE_DOCTOR", payload: e.target.value });

      setSearchDoctor(e.target.value);
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}api/doctors/recommendations/?search=${searchDoctor}`
      );
      console.log(res);
      setDoctorRecommendations(res.data);
    } catch (err) {
      console.log(err.response);
    }
  };

  const [myLocation, setMyLocation] = useState("");
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (location) => {
        setMyLocation({
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        });
      },
      () => console.log("error :)"),
      { timeout: 10000 }
    );
  }, []);
  const onSubmit = (e) => {
    e.preventDefault();
  };

  const search = useSelector((state) => state.search);
  const { doctor, speciality, available, distance, lat, lng, location_name } =
    search;

  const [autoComplete, setAutoComplete] = useState(null);
  const onPlaceChanged = () => {
    try {
      const lat = autoComplete.getPlace().geometry.location.lat();
      const lng = autoComplete.getPlace().geometry.location.lng();
      dispatch({ type: "CHANGE_LAT", payload: lat });
      dispatch({ type: "CHANGE_LNG", payload: lng });
      dispatch({
        type: "CHANGE_LOCATION_NAME",
        payload: autoComplete.getPlace().formatted_address,
      });
    } catch {}
  };
  const onMapChange = (e) => {
    console.log(e);
    dispatch({ type: "CHANGE_LOCATION_NAME", payload: e.currentTarget.value });
    if (e.currentTarget.value === "") {
      dispatch({ type: "CHANGE_LAT", payload: "" });
      dispatch({ type: "CHANGE_LNG", payload: "" });
    }
  };

  return (
    <>
      <NavWrap className={location.pathname === "/" && "bg-color"}>
        <Container>
          <Grid
            wrap="no-wrap"
            justify={
              !showSearch && location.pathname === "/"
                ? `flex-end`
                : "space-between"
            }
          >
            {showSearch && (
              <Column justify="start" lg={2} sm={0}>
                <Link to="/">
                  {/* <img src={logo} /> */}
                  <h1
                    style={{ 
                      color: "#000080",
                      fontWeight: 600,
                      fontSize: "30px"
                    }}
                  >
                    MY City Doc
                  </h1>
                </Link>
              </Column>
            )}
            {!showSearch && (
              <Column
                justify={
                  !showSearch && location.pathname === "/"
                    ? `flex-end`
                    : "start"
                }
                sx={2}
              >
                <MobileMenu>
                  <GiHamburgerMenu
                    onClick={(e) => setShowNav(!showNav)}
                    style={{
                      fontSize: "28px",
                      color: "var(--primary-text-color)",
                      cursor: "pointer",
                    }}
                  />
                  <MobileMenuDiv ref={navRef} show={showNav}>
                    <ImCross
                      onClick={(e) => setShowNav(false)}
                      style={{ position: "absolute", left: 20, top: 20 }}
                    />
                    <Account>
                      {auth.isAuthenticated ? (
                        <>
                          <Menu onClick={(e) => dispatch(logout())}>
                            <Button
                              style={{
                                textDecoration: "underline",
                                fontWeight: 600,
                              }}
                            >
                              Logout
                            </Button>
                          </Menu>
                          <Menu onClick={(e) => setShowDropdown(!showDropdown)}>
                            <Link
                              to="/"
                              style={{
                                textDecoration: "underline",
                                fontWeight: 600,
                              }}
                            >
                              Home
                            </Link>
                          </Menu>
                          {adminAuth.type === "user" && (
                            <Menu
                              onClick={(e) => setShowDropdown(!showDropdown)}
                            >
                              <Link
                                to="/your-appointments/"
                                style={{
                                  textDecoration: "underline",
                                  fontWeight: 600,
                                }}
                              >
                                Your Appointments
                              </Link>
                            </Menu>
                          )}
                        </>
                      ) : (
                        <Link to="?show-account=true">
                          <Menu onClick={(e) => setShowDropdown(!showDropdown)}>
                            <Button
                              style={{
                                textDecoration: "underline",
                                fontWeight: 600,
                              }}
                            >
                              Login/Signup
                            </Button>
                          </Menu>
                        </Link>
                      )}
                    </Account>
                  </MobileMenuDiv>
                </MobileMenu>
              </Column>
            )}
            {location.pathname.startsWith("/search") &&
              (showSearch ? (
                <Column justify="start" lg={8} sm={3} spacing={10}>
                  <SearchColumnNav onSubmit={onSubmit}>
                    <div
                      style={{
                        width: "60%",
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                        borderRight: "2px solid #0000001f",
                      }}
                    >
                      <input
                        name={`doctor`}
                        value={doctor}
                        onChange={getDoctorRecommendations}
                        type="text"
                        placeholder="Search for a doctor or hospital "
                      />
                      {doctorRecommendations.length !== 0 ? (
                        <div>
                          {doctorRecommendations.map((doctorName) => (
                            <div
                              onClick={(e) => {
                                dispatch({
                                  type: "CHANGE_DOCTOR",
                                  payload: doctorName,
                                });
                                setDoctorRecommendations([]);
                              }}
                            >
                              {doctorName}
                            </div>
                          ))}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div
                      style={{
                        width: "40%",
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                      }}
                    >
                      <Autocomplete
                        className="location-input"
                        onLoad={(autoC) => setAutoComplete(autoC)}
                        onPlaceChanged={onPlaceChanged}
                      >
                        <>
                          <input
                            name="location"
                            value={location_name}
                            type="text"
                            placeholder="My Location"
                            onKeyDown={(e) => {
                              if (e.keyCode === 13) {
                                e.preventDefault();
                              } else {
                                return true;
                              }
                            }}
                            onChange={onMapChange}
                          />
                        </>
                      </Autocomplete>
                    </div>
                    <button>
                      <FaSearch />
                    </button>
                  </SearchColumnNav>
                </Column>
              ) : (
                <SearchMobileColumn
                  onClick={(e) => setShowSearchModal(!showSearchModal)}
                >
                  <BsSearch />
                  <div>
                    <b>Search for a doctor or hospital</b>
                    <p>My Location</p>
                  </div>
                </SearchMobileColumn>
              ))}

            {showSearch ? (
              <Column justify="end" lg={2} sm={2} sx={2} spacing={10}>
                {auth.isAuthenticated ? (
                  <Account>
                    <Menu onClick={(e) => setShowDropdown(!showDropdown)}>
                      <p>Account</p>
                      <IoIosArrowDown />
                    </Menu>
                    {}
                    <Dropdown show={showDropdown}>
                      <DropdownDiv>
                        {adminAuth.type === "user" && (
                          <Link to="/your-appointments/">
                            Your Appointments
                          </Link>
                        )}
                        <p onClick={(e) => dispatch(logout())}>Logout</p>
                      </DropdownDiv>
                    </Dropdown>
                  </Account>
                ) : (
                  <Link to="?show-account=true">
                    <Account>
                      <Menu onClick={(e) => setShowDropdown(!showDropdown)}>
                        <p
                          style={{
                            textDecoration: "underline",
                            fontWeight: 600,
                          }}
                        >
                          Login/Signup
                        </p>
                      </Menu>
                    </Account>
                  </Link>
                )}
              </Column>
            ) : (
              ""
            )}
          </Grid>
        </Container>
      </NavWrap>
      {!showSearch && (
        <Modal show={showSearchModal} setShow={setShowSearchModal}>
          <SearchModal>
            <SearchColumn>
              <div
                style={{
                  width: "50%",
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  borderRight: "2px solid #0000001f",
                }}
              >
                <AiOutlineSearch />
                <input
                  type="text"
                  placeholder={`Search For Doctor or Hospital`}
                  name={`doctor`}
                  value={doctor}
                  onChange={getDoctorRecommendations}
                />
                {doctorRecommendations.length !== 0 ? (
                  <div>
                    {doctorRecommendations.map((doctorName, i) => (
                      <div
                        key={i}
                        onClick={(e) => {
                          dispatch({
                            type: "CHANGE_DOCTOR",
                            payload: doctorName,
                          });
                          setTimeout(() => {
                            setDoctorRecommendations([]);
                          });
                        }}
                      >
                        {doctorName}
                      </div>
                    ))}
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div
                style={{
                  width: "40%",
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                }}
              >
                <IoLocationSharp />

                <Autocomplete
                  className="location-input"
                  onLoad={(autoC) => setAutoComplete(autoC)}
                  onPlaceChanged={onPlaceChanged}
                >
                  <>
                    <input
                      id="locationM"
                      name="location"
                      type="text"
                      value={location_name}
                      placeholder="My Location"
                      onKeyDown={(e) => {
                        if (e.keyCode === 13) {
                          e.preventDefault();
                        } else {
                          return true;
                        }
                      }}
                      onChange={onMapChange}
                    />
                  </>
                </Autocomplete>
              </div>

              {/* <button>Find Care</button> */}
            </SearchColumn>
          </SearchModal>
        </Modal>
      )}
    </>
  );
}
