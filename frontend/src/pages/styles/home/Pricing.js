import React from "react";
import { Content, ContentContainer, ContentTitle } from "../../../styles/Content.styles";

export default function Pricing() {
  return (
    <>
      <ContentContainer>
      <h1 style={{marginBottom: '1rem'}}>Pricing</h1>

        <ContentTitle>Pricing</ContentTitle>
        <Content>Each Appointment booking price is based on the local doctors consulation fee. it Varys from 30 INR to 100 INR from city to city. The price is shown when making an Appointment on the platform for the selected Doctors.</Content>

      </ContentContainer>
    </>
  );
}
