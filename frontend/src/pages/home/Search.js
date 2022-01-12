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
  LeftCol,
  ProviderColumn,
  ProvidersWrap,
  RightCol,
  SearchColumnSearch,
} from "../styles/home/Search.styles";
import demoDr from "../../assets/images/demo-dr.png";
import demoDr2 from "../../assets/images/demo-dr2.png";
import demoDr3 from "../../assets/images/demo-dr3.png";
import { Link } from "react-router-dom";
import { SearchColumn } from "../styles/home/Home.styles";
import { FaSearch } from "react-icons/fa";
import { SearchColumnNav } from "../../components/Navbar/Navbar.styles";
import { Input } from "../../styles/Form.styles";
import InfiniteScroll from "react-infinite-scroll-component";
import SyncLoader from 'react-spinners/SyncLoader';
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
  const [activePage, setActivePage] = useState(1);
  const [showSearch, setShowSearch] = useState(
    window.innerWidth < 965 ? true : false
  );

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth < 965) {
        setShowSearch(true);
      } else {
        setShowSearch(false);
      }
    });
  }, [showSearch]);

  const fetchMoreData = () => {
      setTimeout(() => {
        setProviders([...providers, demoDr, demoDr2, demoDr3]);
      }, 3000);     
  }

  return (
    <>
      <ProvidersWrap>
        <SmallContainer direction="column">
          <Grid style={{ margin: "20px 0px" }} justify="space-between" lg={6}>
            <SearchColumnSearch style={{ margin: "10px 0px" }}>
              {showSearch && (
                <>
                  <input
                    style={{
                      width: "60%",
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                      borderRight: "2px solid #0000001f",
                    }}
                    type="text"
                    placeholder="Search For Doctor or Hospital"
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
                </>
              )}
            </SearchColumnSearch>

            <Column lg={4} sx={12} style={{ margin: "10px 0px" }}>
              <form style={{ display: "flex", width: "100%" }}>
                <Input
                  placeholder="Distance (KM)"
                  type="number"
                  name="distance"
                />
                <Button>Apply</Button>
              </form>
            </Column>
          </Grid>

          <Grid justify="center" align="center" lg={12} direction="column">
            <InfiniteScroll
            style={{display: "flex", flexDirection: "column", flexWrap: "wrap", justifyContent:"center", alignItems:"center", overflow: "hidden", padding: "10px 0px"}}
              dataLength={providers.length}
              next={fetchMoreData}
              hasMore={true}
              loader={<SyncLoader color="var(--info-color)" />}

            >
              {providers.map((provider) => (
                <ProviderColumn lg={12}>
                  <LeftCol>
                    <img src={provider} />
                  </LeftCol>
                  <RightCol>
                    <Badge
                      style={{ position: "absolute", right: 0, top: "25px" }}
                    >
                      Available
                    </Badge>
                    <h2>Dr. Anuradha Kottapalli, MD</h2>
                    <p>
                      <b>Primary Care Doctor</b>
                    </p>
                    <p>Mount Sinai Doctors Health Quarteres NoHo</p>
                    <p>632 Broadway, Ste A</p>
                    {/* <Button sm>Book Appointment</Button> */}
                    <Link>Book Appointment</Link>
                  </RightCol>
                </ProviderColumn>
              ))}
            </InfiniteScroll>
          </Grid>
        </SmallContainer>
      </ProvidersWrap>
    </>
  );
}
