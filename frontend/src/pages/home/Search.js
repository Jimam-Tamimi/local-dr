import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Column,
  Container,
  Grid,
  SmallContainer,
} from "../../styles/Essentials.styles";
import {
  DropdownDiv,
  DropdownOption,
  LeftCol,
  ProviderColumn,
  ProviderHeading,
  ProvidersWrap,
  RightCol,
  SearchColumnSearch,
  Tab,
  TabUnderline,
} from "../styles/home/Search.styles";

import Dropdown from '../../components/Dropdown/Dropdown'

import demoDr from "../../assets/images/demo-dr.png";
import demoDr2 from "../../assets/images/demo-dr2.png";
import demoDr3 from "../../assets/images/demo-dr3.png";
import locationSvg from "../../assets/images/location.svg";
import activeLocationSvg from "../../assets/images/activeLocation.svg";
import { Link } from "react-router-dom";
import { SearchColumn } from "../styles/home/Home.styles";
import { FaSearch } from "react-icons/fa";
import { SearchColumnNav } from "../../components/Navbar/Navbar.styles";
import { Input } from "../../styles/Form.styles";
import InfiniteScroll from "react-infinite-scroll-component";
import SyncLoader from "react-spinners/SyncLoader";
import { BsShieldFillPlus } from 'react-icons/bs'
import { IoLocationSharp } from 'react-icons/io5'
import { RiMoneyDollarCircleFill } from 'react-icons/ri'
import { Datepicker, Page, setOptions } from '@mobiscroll/react';
import { Marker } from "react-google-maps";

import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import Map from "../../components/Map/Map";

setOptions({
  theme: 'ios',
  themeVariant: 'light'
});

export default function Search() {
  const [providers, setProviders] = useState([
    { img: demoDr, cords: { lat: 40.73010, lng: -73.935242 } },
    // { img: demoDr2, cords: { lat: 40.7350610, lng: -73.945242 } },
    // { img: demoDr3, cords: { lat: 40.7305610, lng: -73.955242 } },
    // { img: demoDr2, cords: { lat: 40.7305610, lng: -73.965242 } },
    // { img: demoDr3, cords: { lat: 40.7530610, lng: -73.975242 } },
    // { img: demoDr, cords: { lat: 40.730610, lng: -73.938882 } },
    // { img: demoDr2, cords: { lat: 40.77360610, lng: -73.956242 } },
    // { img: demoDr3, cords: { lat: 40.77630610, lng: -73.934642 } },
  ]);
  const [activeProvider, setActiveProvider] = useState({})

  const [showSearch, setShowSearch] = useState(
    window.innerWidth < 965 ? true : false
  );
  const [showButton, setShowButton] = useState(
    window.innerWidth > 615 ? true : false
  );
  const [showMap, setShowMap] = useState(
    window.innerWidth > 768 ? true : false
  );
  const [showDistance, setShowDistance] = useState(false)
  const [showSpeciality, setShowSpeciality] = useState(false)
  const [showAvailablaity, setShowAvailablaity] = useState(false)
  const [activeTab, setActiveTab] = useState(1)

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth < 965) {
        setShowSearch(true);
      } else {
        setShowSearch(false);
      }
      if (window.innerWidth > 615) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
      if (window.innerWidth > 768) {
        setShowMap(true);
      } else {
        setShowMap(false);
      }
    });
  }, [showSearch]);

  const fetchMoreData = () => {
    setTimeout(() => {
      setProviders([...providers,
      { img: demoDr, cords: { lat: 40.730610, lng: -73.938882 } },
      { img: demoDr2, cords: { lat: 40.77360610, lng: -73.956242 } },
      { img: demoDr3, cords: { lat: 40.77630610, lng: -73.934642 } },
      ]);
    }, 3000);
  };
  useEffect(() => {
    console.log(activeProvider)
  }, [activeProvider])

  return (
    <>
      <ProvidersWrap >
        <Column direction="column" lg={8} sx={12}>
          <Grid justify="space-between" lg={6}>
            <Column style={{ margin: "20px 0px" }} justify="flex-start" lg={12}>
              <TabUnderline activeTab={activeTab === 1} onClick={e => setActiveTab(1)}>All Appointment</TabUnderline>
              <TabUnderline activeTab={activeTab === 2} onClick={e => setActiveTab(2)}>In Person</TabUnderline>
              <TabUnderline activeTab={activeTab === 3} onClick={e => setActiveTab(3)}>VIdeo Visit</TabUnderline>
            </Column>

            <Column justify="start" lg={12} sx={12} style={{ width: "100%" }}>
              <div style={{ position: 'relative', }}>
                <Tab  onClick={e => setShowAvailablaity(!showAvailablaity)}>Availability</Tab>
                <Dropdown style={{left: '10px'}} show={showAvailablaity} setShow={setShowAvailablaity}>
                  <DropdownDiv>
                    <DropdownOption>
                      <input value="10" id="d-10" name="distance" type={'radio'} />
                      <label for="d-10">10 KM</label>
                    </DropdownOption>
                    <DropdownOption>
                      <input id="d-30" name="distance" type={'radio'} />
                      <label for="d-30" >30 KM</label>
                    </DropdownOption>
                    <hr />
                    <Button xsm>Apply</Button>
                  </DropdownDiv>
                </Dropdown>
              </div>
              <div style={{ position: 'relative' }}>
                <Tab onClick={e => setShowSpeciality(!showSpeciality)}>Speciality</Tab>
                <Dropdown show={showSpeciality} setShow={setShowSpeciality}>
                  <DropdownDiv>
                    <DropdownOption>
                      <input value="10" id="d-10" name="distance" type={'radio'} />
                      <label for="d-10">10 KM</label>
                    </DropdownOption>
                    <DropdownOption>
                      <input id="d-30" name="distance" type={'radio'} />
                      <label for="d-30" >30 KM</label>
                    </DropdownOption>
                    <hr />
                    <Button xsm>Apply</Button>
                  </DropdownDiv>
                </Dropdown>
              </div>
              <div style={{ position: 'relative' }}>
                <Tab onClick={e => setShowDistance(!showDistance)}>Distance</Tab>
                <Dropdown show={showDistance} setShow={setShowDistance}>
                  <DropdownDiv>
                    <DropdownOption>
                      <input value="10" id="d-10" name="distance" type={'radio'} />
                      <label for="d-10">10 KM</label>
                    </DropdownOption>
                    <DropdownOption>
                      <input id="d-30" name="distance" type={'radio'} />
                      <label for="d-30" >30 KM</label>
                    </DropdownOption>
                    <hr />
                    <Button xsm>Apply</Button>
                  </DropdownDiv>
                </Dropdown>
              </div>
            </Column>
            <Column>
              <ProviderHeading>772 providers</ProviderHeading>
            </Column>
          </Grid>

          <Grid justify="center" align="center" lg={12} direction="column">
            <InfiniteScroll
              style={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                padding: "10px 0px",
              }}
              dataLength={providers.length}
              next={fetchMoreData}
              hasMore={true}
              loader={<SyncLoader color="var(--info-color)" />}
            >
              {providers.map(({ img, cords }) => (
                <ProviderColumn onMouseOut={e => setActiveProvider({})} onMouseOver={e => setActiveProvider(cords)} direction="column" lg={12}>
                  <Column align="start" lg={12}>
                    <LeftCol>
                      <img src={img} />
                    </LeftCol>
                    <RightCol>
                      {/* <Badge style={{}}>Available</Badge> */}
                      <h2>Dr. Anuradha Kottapalli, MD</h2>
                      <p>
                        <b>Primary Care Doctor</b>
                      </p>
                      <p>Mount Sinai Doctors Health Quarteres NoHo</p>
                      <p>632 Broadway, Ste A</p>
                      <p className="consultation"><RiMoneyDollarCircleFill style={{fontSize: '1.4rem'}} />Consultation charges may vary</p>
                      {/* <Link>Book Appointment</Link> */}
                      {showButton && (
                        <Button style={{ boxShadow: "none" }} sm>
                          Book Appointment
                        </Button>
                      )}
                    </RightCol>
                  </Column>
                  {!showButton && (
                    <Button
                      block
                      style={{
                        boxShadow: "none",
                        boxShadow: "none",
                        margin: "20px 0px 0px 0px",
                      }}
                      sm
                    >
                      Book Appointment
                    </Button>
                  )}
                </ProviderColumn>
              ))}
            </InfiniteScroll>
          </Grid>
        </Column>
        {
          showMap && (
            <></>
            // <Column lg={4} sx={0} style={{ position: "sticky", right: 0, top: 0, height: "calc(100vh)" }}>
            //   <Map
            //     coords={{ lat: 40.730610, lng: -73.935242 }}
            //     isMarkerShown
            //     googleMapURL=" "
            //     loadingElement={<div style={{ height: `100%`, width: "100%" }} />}
            //     containerElement={<div style={{ height: `100%`, width: "100%" }} />}
            //     mapElement={<div style={{ height: `100%`, width: "100%" }} />}
            //     defaultZoom={14}
            //   >
            //     {
            //       providers.map(({ cords }, i) => (<Marker size="20px" icon={cords === activeProvider ? { url: activeLocationSvg, scaledSize: new window.google.maps.Size(35, 35) } : { url: locationSvg, scaledSize: new window.google.maps.Size(35, 35) }} key={i} position={cords} />))

            //     }
            //   </Map>
            // </Column>
              )
          }
      </ProvidersWrap>
    </>
  );
}
