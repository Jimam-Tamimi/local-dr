import React from "react";
import {
  Button,
  Column,
  Container,
  Grid,
  SmallContainer,
} from "../../styles/Essentials.styles";
import {
  ColumnOne,
  ColumnTwo,
  SearchColumn,
  HeroWrap,
  FeatureWrap,
  HeadingColumn,
  BoxColumn,
  FeatureBox,
  CtaSection,
  ColumnCta1,
  ColumnCta2,
} from "../styles/home/Home.styles";
import hero from "../../assets/images/hero.svg";
import feat1 from "../../assets/images/icon-home-1.svg";
import feat2 from "../../assets/images/icon-home-2.svg";
import feat3 from "../../assets/images/icon-home-3.svg";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { IoLocationSharp } from "react-icons/io5";

import TextTransition, { presets } from "react-text-transition";
import { RiProfileLine } from "react-icons/ri";
import { Autocomplete } from "@react-google-maps/api";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Label } from "../../styles/Form.styles";

import CtaSecImg from '../../assets/images/cta-sec.png'
import CtaSecImg2 from '../../assets/images/cta-sec-2.png'



const TEXTS = ["Doctor", "Dentist", "Physician", ];

export default function Home() {
  const [changeSearch, setChangeSearch] = useState(
    window.innerWidth > 992 ? false : true
  );
  useEffect(() => {
    window.addEventListener("resize", () => {
      setChangeSearch(window.innerWidth > 992 ? false : true);
    });
  }, []);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => setIndex((index) => index + 1), 2500);
    return () => clearTimeout(intervalId);
  }, []);

  // hone page search

  const [doctor, setDoctor] = useState("");
  const [location, setLocation] = useState("");
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (location) => {
        setLocation({
          lat: "",
          lng: "",
        });
      },
      () => console.log("error :)"),
      { timeout: 10000 }
    );
  }, []);
  const [speciality, setSpeciality] = useState("");
  const history = useHistory();
  const onSubmit = (e) => {
    e.preventDefault();
    if (doctor) {
      history.push(
        `/search?doctor=${doctor}&lat=&lng=&speciality=${speciality}&&location-name=${LocationName}`
      );
    } else {
      history.push(
        `/search?doctor=${doctor}&lat=${location?.lat}&lng=${location?.lng}&speciality=${speciality}&location-name=${LocationName}`
      );
    }
  };

  // doctor recommendation
  const [doctorRecommendations, setDoctorRecommendations] = useState([]);
  const getDoctorRecommendations = async (e) => {
    try {
      setDoctor(e.target.value);
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}api/doctors/recommendations/?search=${doctor}`
      );
      console.log(res);
      setDoctorRecommendations(res.data);
    } catch (err) {
      console.log(err.response);
    }
  };
  const [specialityRecommendations, setSpecialityRecommendations] = useState(
    []
  );
  const getSpecialityRecommendations = async (e) => {
    try {
      setSpeciality(e.target.value);
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}api/speciality/recommendations/?search=${speciality}`
      );
      console.log(res);
      setSpecialityRecommendations(res.data);
    } catch (err) {
      console.log(err.response);
    }
  };

  const [autoComplete, setAutoComplete] = useState(null);
  const [LocationName, setLocationName] = useState("");
  const onPlaceChanged = () => {
    try {
      const lat = autoComplete.getPlace().geometry.location.lat();
      const lng = autoComplete.getPlace().geometry.location.lng();
      console.log(autoComplete.getPlace());
      setLocationName(autoComplete.getPlace().formatted_address);
      setLocation({
        lat: lat,
        lng: lng,
      });
    } catch {}
  };

  return (
    <>
      <HeroWrap data-aos="fade-in">
        <Container>
          <Grid>
            <ColumnOne
              data-aos="fade-right"
              direction="column"
              lg={12}
              sm={12}
              align="start"
            >
              <h1>
                Find local{" "}
                <TextTransition
                  inline={true}
                  text={TEXTS[index % TEXTS.length]}
                  springConfig={presets.default}
                />
                s <br /> in your City
              </h1>
              <SearchColumn autoComplete="off" onSubmit={onSubmit}>
                <div
                  style={{
                    width: "50%",
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                  }}
                  className="search-hospital"
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
                      {doctorRecommendations.map((doctorName) => (
                        <div
                          onClick={(e) => {
                            setDoctor(doctorName);
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
                    width: "30%",
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                  }}
                  className="search-hospital"
                >
                  <>
                    <IoLocationSharp />
                    <Autocomplete
                      className="location-input"
                      onLoad={(autoC) => setAutoComplete(autoC)}
                      onPlaceChanged={onPlaceChanged}
                    >
                      <>
                        <input
                          name="location"
                          type="text"
                          placeholder="City, Place, Zip"
                          style={{ borderBottom: "1px solid #0000003b" }}
                          onKeyDown={(e) => {
                            if (e.keyCode === 13) {
                              e.preventDefault();
                            } else {
                              return true;
                            }
                          }}
                        />
                      </>
                    </Autocomplete>
                  </>
                </div>
                <div
                  style={{
                    width: "20%",
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                  }}
                >
                  <RiProfileLine />

                  <input
                    name="speciality"
                    value={speciality}
                    onChange={getSpecialityRecommendations}
                    type="text"
                    placeholder="Speciality"
                    style={{padding: "1rem 2.5rem"}}
                  />
                  {specialityRecommendations.length !== 0 ? (
                    <div>
                      {specialityRecommendations.map((speciality) => (
                        <div
                          onClick={(e) => {
                            setSpeciality(speciality);
                            setSpecialityRecommendations([]);
                          }}
                        >
                          {speciality}
                        </div>
                      ))}
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <button>{changeSearch ? "Find Doctor" : <FaSearch />}</button>
              </SearchColumn>
            </ColumnOne>
          </Grid>
        </Container>
      </HeroWrap>


      <CtaSection>
        <Container>
          <Grid lg={6} sm={12} >
            <ColumnCta1  >
                    <h2 className="heading">Looking for a doctor near you?</h2>
                    <p className="desc">My City Doc has the number of providers in your city</p>
                    <Button sm  onClick={e => history.push('/search/')} >Browse</Button>
            </ColumnCta1>
            <ColumnCta2>
                    <img src={CtaSecImg} />
            </ColumnCta2>
          </Grid>
        </Container>
      </CtaSection>
      

      <CtaSection>
        <Container>
          <Grid className="second-div" lg={6} sm={12} >
            <ColumnCta2 className="second-div" justify="start">
                    <img src={CtaSecImg2} />
            </ColumnCta2>
            <ColumnCta1  >
                    <h2 className="heading">Make An Appointment With Your Doctor</h2>
                    <p className="desc">My City Doc has the number of providers in your city</p>
                    <Button sm onClick={e => history.push('/search/')} >Book Now</Button>
            </ColumnCta1>
          </Grid>
        </Container>
      </CtaSection>
      

    </>
  );
}
