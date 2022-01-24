import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  ButtonLink,
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
import { Link, useHistory, useLocation } from "react-router-dom";
import { SearchColumn } from "../styles/home/Home.styles";
import { FaSearch } from "react-icons/fa";
import { SearchColumnNav } from "../../components/Navbar/Navbar.styles";
import { Input } from "../../styles/Form.styles";
import InfiniteScroll from 'react-infinite-scroller';
import SyncLoader from "react-spinners/SyncLoader";
import { BsShieldFillPlus } from 'react-icons/bs'
import { IoLocationSharp } from 'react-icons/io5'
import { RiMoneyDollarCircleFill } from 'react-icons/ri'
import { Datepicker, Page, setOptions } from '@mobiscroll/react';
import { Marker } from "react-google-maps";
 
import Map from "../../components/Map/Map";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProgress } from "../../redux/progress/actions";
 
export default function Search({ match,  }) {
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






  // backend
  const location = useLocation()
  const history = useHistory()
  const searchQ = window.location.search // could be '?foo=bar'
  const params = new URLSearchParams(searchQ);
  const [myLocationData, setMyLocationData] = useState({ lat: params.get('lat'), lng: params.get('lng') })
  useEffect(() => {

      navigator.geolocation.getCurrentPosition((location) => {
        setMyLocationData({ lat: location.coords.latitude, lng: location.coords.longitude })
      }, () => console.log('error :)'), { timeout: 10000 })
  }, [])


  const dispatch = useDispatch()



  useEffect(() => {
    dispatch({ type: 'CHANGE_DOCTOR', payload: params.get('doctor') || '' })
    dispatch({ type: 'CHANGE_SPECIALITY', payload: params.get('speciality') || '' })
    dispatch({ type: 'CHANGE_AVAILABLE', payload: params.get('available') || '' })
    dispatch({ type: 'CHANGE_MAX_DISTANCE', payload: params.get('max-distance') || '' })
    dispatch({ type: 'CHANGE_LAT', payload: params.get('lat') || '' })
    dispatch({ type: 'CHANGE_LNG', payload: params.get('lng') || '' })
    dispatch({ type: 'CHANGE_LOCATION_NAME', payload: params.get('location-name') || '' })
  }, [])
  const [paginationNext, setPaginationNext] = useState('')
  const [count, setCount] = useState(0)
  const fetchMoreData = async () => {
 
      try { 
        console.log('fetching more data')
        const res = await axios.get(`${process.env.REACT_APP_API_URL}api/search/?doctor=${doctor}&lat=${lat}&lng=${lng}&speciality=${speciality}&available=${available}&max-distance=${distance}&${paginationNext? 'page=' + paginationNext : ''}`)
        console.log(res.data, 'data frm pagination')
        if (res.status === 200) {

          setDoctorList([...doctorList, ...res?.data?.results])
          console.log([...doctorList, ...res?.data?.results])
          setPaginationNext(res.data.next)
          console.log(res.data.next, 'next')

        }
      } catch (err) {
        console.log(err)
      } 
  };
  
  
  const search = useSelector(state => state.search)
  const {doctor, speciality, available, distance, lat, lng, location_name} = search

  const [doctorList, setDoctorList] = useState([])
  const getDoctorList = async () => {
    try { 
      const res = await axios.get(`${process.env.REACT_APP_API_URL}api/search/?doctor=${doctor}&lat=${lat}&lng=${lng}&speciality=${speciality}&available=${available}&max-distance=${distance}`)
      if (res.status === 200) {
        console.log(res, 'data frm search')
        setDoctorList(res?.data?.results)
        if(res.data.next) {
          let next = new URL(res.data.next)
          let nextQ = next.searchParams.get('page')
          console.log(nextQ, 'nextQ')
          setPaginationNext(nextQ)
        }
        setCount(res?.data?.count)
        console.log(res?.data?.count, 'count')
      }
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(async () => {
    dispatch(setProgress(10))
    await getDoctorList()
    dispatch(setProgress(60))

    history.push(`/search?doctor=${doctor}&lat=${lat}&lng=${lng}&speciality=${speciality}&available=${available}&max-distance=${distance}&location-name=${location_name}`) 
    dispatch(setProgress(100))

  }, [search]) 
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
                <Tab onClick={e => setShowAvailablaity(!showAvailablaity)}>Availability</Tab>
                <Dropdown style={{ left: '10px' }} show={showAvailablaity} setShow={setShowAvailablaity}>
                  <DropdownDiv>
                    {
                      [true, false].map((item, index) => (
                        <DropdownOption onClick={e => { dispatch({ type: 'CHANGE_AVAILABLE', payload: item })}} key={index}>
                          <input value={item} checked={item == available} id={`d-${item}`} name="available" type={'radio'} />
                          <label >{`${item}`}</label>
                        </DropdownOption>
                      ))
                    } 
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
                  </DropdownDiv>
                </Dropdown>
              </div>
              <div style={{ position: 'relative' }}>
                <Tab onClick={e => setShowDistance(!showDistance)}>Distance</Tab>
                <Dropdown show={showDistance} setShow={setShowDistance}>
                  <DropdownDiv>
                    {
                      [10, 30, 50, 100].map((item, i) => (
                        <DropdownOption onClick={e => { dispatch({ type: 'CHANGE_DISTANCE', payload: item })}} key={i} >
                          <input value={item} checked={item == distance} id={`d-${item}`} name="distance" type={'radio'} />
                          <label  >{item} KM</label>
                        </DropdownOption>

                      ))
                    }
                  </DropdownDiv>
                </Dropdown>
              </div>
            </Column>
            <Column>
              <ProviderHeading>{count} providers</ProviderHeading>
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
              pageStart={0}
              loadMore={fetchMoreData}
              hasMore={count <= doctorList.length ? false : true}
              loader={<SyncLoader color="var(--info-color)" />}
            >
              {doctorList?.map((doctor, i) => (
                <ProviderColumn key={i} direction="column" lg={12}>
                  <Column align="start" lg={12}>
                    <LeftCol>
                      <img src={doctor.image&&`${process.env.REACT_APP_MEDIA_URL}${doctor.image}`} alt="doctor image" />
                    </LeftCol>
                    <RightCol>
                      {/* <Badge style={{}}>Available</Badge> */}
                      <h2>{doctor.name}</h2>
                      <p>
                        <b>{doctor.hospital.name}</b>
                      </p>
                      <p>{doctor.qualification}</p>
                      <p>{doctor.speciality}</p>
                      <p className="consultation"><RiMoneyDollarCircleFill style={{ fontSize: '1.4rem' }} />Consultation charges may vary</p>
                      {/* <Link>Book Appointment</Link> */}
                      {showButton && (
                        
                          doctor.available ?
                        <ButtonLink to={`/doctor/${doctor.id}/`}  style={{ boxShadow: "none" }} sm >
                          Book Appointment
                        </ButtonLink> :
                        <Button to={`/doctor/${doctor.id}/`}  style={{ boxShadow: "none" }} sm  disabled={true}>
                          Not Available
                        </Button> 
                        
                      )}
                    </RightCol>
                  </Column>
                  {!showButton && (
                          doctor.available ?
                    <ButtonLink to={`/doctor/${doctor.id}/`} 
                      block
                      style={{
                        boxShadow: "none",
                        boxShadow: "none",
                        margin: "20px 0px 0px 0px",
                      }}
                      sm
                      disabled={!doctor.available}
                    >
                      Book Appointment
                    </ButtonLink>:
                    <Button to={`/doctor/${doctor.id}/`} disabled={true} 
                      block
                      style={{
                        boxShadow: "none",
                        boxShadow: "none",
                        margin: "20px 0px 0px 0px",
                      }}
                      sm
                      disabled={!doctor.available}
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
