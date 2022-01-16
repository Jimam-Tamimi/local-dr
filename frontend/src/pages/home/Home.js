import React from "react";
import {
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
import { MdFolderSpecial } from "react-icons/md";
import { RiProfileLine } from "react-icons/ri";

const TEXTS = [
  "Doctor",
  "Dentist",
  "Psychologist",
  "Dermatologist",
];


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
    const intervalId = setInterval(() =>
      setIndex(index => index + 1),
      2500
    );
    return () => clearTimeout(intervalId);
  }, []);
  return (
    <>
      <HeroWrap data-aos="fade-in">
        <Container>
          <Grid>
            <ColumnOne data-aos="fade-right" direction="column" lg={12} sm={12} align="start">
              <h1 >
                Find local <TextTransition inline={true} text={TEXTS[index % TEXTS.length]} springConfig={presets.default}/>s <br /> in your place       
              </h1>
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
                  />
                </div>

                <div
                  style={{
                    width: "30%",
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    borderRight: "2px solid #0000001f",

                  }}
                >
                  <IoLocationSharp />

                  <input
                    type="text"
                    placeholder="My Location"
                  />
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
                    type="text"
                    placeholder="Speciality"
                  />
                </div>

                <button>{changeSearch ? "Find Care" : <FaSearch />}</button>
              </SearchColumn>
            </ColumnOne>
          </Grid>
        </Container>
      </HeroWrap>

      <FeatureWrap>
        <SmallContainer>
          <Grid direction="column">
            <HeadingColumn data-aos="zoom-in" direction="column" lg={12}>
              <h1 >
                DISCOVER THE <b>ONLINE</b> APPOINTMENT!
              </h1>
              <p>
                Usu habeo equidem sanctus no. Suas summo id sed, erat erant
                oporteat cu pri. In eum <br /> omnes molestie. Sed ad debet
                scaevola, ne mel.
              </p>
            </HeadingColumn>
            <BoxColumn wrap="wrap" lg={12}>
              <FeatureBox
                data-aos="fade-right"
                direction="column"
                lg={4}
                sm={6}
                sx={12}
                selfSpacing={15}
              >
                <img src={feat1} />
                <h4>FIND A DOCTOR</h4>
                <p>
                  Usu habeo equidem sanctus no. Suas summo id sed, erat erant
                  oporteat cu pri. In eum omnes molestie.
                </p>
              </FeatureBox>
              <FeatureBox
                data-aos="fade-in"

                direction="column"
                lg={4}
                sm={6}
                sx={12}
                selfSpacing={15}
              >
                <img src={feat2} />
                <h4>VIEW PROFILE</h4>
                <p>
                  Usu habeo equidem sanctus no. Suas summo id sed, erat erant
                  oporteat cu pri. In eum omnes molestie.
                </p>
              </FeatureBox>
              <FeatureBox
                data-aos="fade-left"

                direction="column"
                lg={4}
                sm={6}
                sx={12}
                selfSpacing={15}
              >
                <img src={feat3} />
                <h4>BOOK A VISIT</h4>
                <p>
                  Usu habeo equidem sanctus no. Suas summo id sed, erat erant
                  oporteat cu pri. In eum omnes molestie.
                </p>
              </FeatureBox>
            </BoxColumn>
          </Grid>
        </SmallContainer>
      </FeatureWrap>
    </>
  );
}
