import React from "react";
import { Column, Container, Grid, SmallContainer } from "../../styles/Essentials.styles";
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
export default function Home() {
  return (
    <>
      <HeroWrap>
        <Container>
          <Grid>
            <ColumnOne direction="column" lg={6} sm={12} align="start">
              <h1>
                Find local OB-GYNs <br /> who take your insurance
              </h1>
              <SearchColumn>
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
              </SearchColumn>
            </ColumnOne>
            <ColumnTwo sm={0} lg={6}>
              <img src={hero} alt="hero" />
            </ColumnTwo>
          </Grid>
        </Container>
      </HeroWrap>


      <FeatureWrap>
        <SmallContainer>
            <Grid direction="column" >
                <HeadingColumn direction="column" lg={12}>
                    <h1>DISCOVER THE <b>ONLINE</b> APPOINTMENT!</h1>
                    <p>Usu habeo equidem sanctus no. Suas summo id sed, erat erant oporteat cu pri. In eum <br /> omnes molestie. Sed ad debet scaevola, ne mel.</p>
                </HeadingColumn>
                <BoxColumn wrap="wrap" lg={12}>
                    <FeatureBox direction="column" lg={4} sm={6} sx={12} selfSpacing={15}>
                        <img src={feat1} />
                        <h4>FIND A DOCTOR</h4>
                        <p>Usu habeo equidem sanctus no. Suas summo id sed, erat erant oporteat cu pri. In eum omnes molestie.</p>
                    </FeatureBox>
                    <FeatureBox direction="column" lg={4} sm={6} sx={12} selfSpacing={15}>
                        <img src={feat2} />
                        <h4>VIEW PROFILE</h4>
                        <p>Usu habeo equidem sanctus no. Suas summo id sed, erat erant oporteat cu pri. In eum omnes molestie.</p>
                    </FeatureBox>
                    <FeatureBox direction="column" lg={4} sm={6} sx={12} selfSpacing={15}>
                        <img src={feat3} />
                        <h4>BOOK A VISIT</h4>
                        <p>Usu habeo equidem sanctus no. Suas summo id sed, erat erant oporteat cu pri. In eum omnes molestie.</p>
                    </FeatureBox>
              
                </BoxColumn>
            </Grid>
        </SmallContainer>
      </FeatureWrap>

      
    </>
  );
}
