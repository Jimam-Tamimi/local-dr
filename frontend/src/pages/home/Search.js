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
import { Link } from "react-router-dom";
import { SearchColumn } from "../styles/home/Home.styles";
import { FaSearch } from "react-icons/fa";
import { SearchColumnNav } from "../../components/Navbar/Navbar.styles";
import { Input } from "../../styles/Form.styles";
import InfiniteScroll from "react-infinite-scroll-component";
import SyncLoader from "react-spinners/SyncLoader";
export default function Search() {
  const [providers, setProviders] = useState([
    demoDr,
    demoDr2,
    demoDr3,
    demoDr2,
    demoDr3,
    demoDr,
    demoDr2,
    demoDr3,
  ]);
  const [showSearch, setShowSearch] = useState(
    window.innerWidth < 965 ? true : false
  );
  const [showButton, setShowButton] = useState(
    window.innerWidth > 615 ? true : false
  );
  const [showDistance, setShowDistance] = useState(false)
  const [showSpeciality, setShowSpeciality] = useState(false)
  const [showAvailablaity, setShowAvailablaity] = useState(false)
  
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
    });
  }, [showSearch]);

  const fetchMoreData = () => {
    setTimeout(() => {
      setProviders([...providers, demoDr, demoDr2, demoDr3]);
    }, 3000);
  };

  return (
    <>
      <ProvidersWrap>
        <SmallContainer direction="column">
          <Grid style={{ margin: "20px 0px" }} justify="space-between" lg={6}>
            <Column style={{margin: "20px 0px"}} justify="flex-start" lg={12}>
                <TabUnderline>All Appointment</TabUnderline>
            </Column>

            <Column justify="start" lg={12} sx={12} style={{  width: "100%" }}>
              <div style={{position: 'relative', }}>
                <Tab onClick={e => setShowAvailablaity(!showAvailablaity)}>Availability</Tab>
                <Dropdown show={showAvailablaity} setShow={setShowAvailablaity}>
                  <DropdownDiv>
                    <DropdownOption>
                      <input value="10" id="d-10" name="distance" type={'radio'} />
                      <label for="d-10">10 KM</label>
                    </DropdownOption>
                    <DropdownOption>
                      <input  id="d-30" name="distance" type={'radio'} />
                      <label for="d-30" >30 KM</label>
                    </DropdownOption>
                    <hr />
                      <Button xsm>Apply</Button>
                  </DropdownDiv>
                </Dropdown>
              </div>
              <div style={{position: 'relative'}}>
                <Tab onClick={e => setShowSpeciality(!showSpeciality)}>Speciality</Tab>
                <Dropdown show={showSpeciality} setShow={setShowSpeciality}>
                  <DropdownDiv>
                    <DropdownOption>
                      <input value="10" id="d-10" name="distance" type={'radio'} />
                      <label for="d-10">10 KM</label>
                    </DropdownOption>
                    <DropdownOption>
                      <input  id="d-30" name="distance" type={'radio'} />
                      <label for="d-30" >30 KM</label>
                    </DropdownOption>
                    <hr />
                      <Button xsm>Apply</Button>
                  </DropdownDiv>
                </Dropdown>
              </div>
              <div style={{position: 'relative'}}>
                <Tab onClick={e => setShowDistance(!showDistance)}>Distance</Tab>
                <Dropdown show={showDistance} setShow={setShowDistance}>
                  <DropdownDiv>
                    <DropdownOption>
                      <input value="10" id="d-10" name="distance" type={'radio'} />
                      <label for="d-10">10 KM</label>
                    </DropdownOption>
                    <DropdownOption>
                      <input  id="d-30" name="distance" type={'radio'} />
                      <label for="d-30" >30 KM</label>
                    </DropdownOption>
                    <hr />
                      <Button xsm>Apply</Button>
                  </DropdownDiv>
                </Dropdown>
              </div>
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
              {providers.map((provider) => (
                <ProviderColumn direction="column" lg={12}>
                  <Column align="start" lg={12}>
                    <LeftCol>
                      <img src={provider} />
                    </LeftCol>
                    <RightCol>
                      <Badge style={{}}>Available</Badge>
                      <h2>Dr. Anuradha Kottapalli, MD</h2>
                      <p>
                        <b>Primary Care Doctor</b>
                      </p>
                      <p>Mount Sinai Doctors Health Quarteres NoHo</p>
                      <p>632 Broadway, Ste A</p>
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
        </SmallContainer>
      </ProvidersWrap>
    </>
  );
}
