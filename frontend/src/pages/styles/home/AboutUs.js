import React from "react";
import { Content, ContentContainer, ContentTitle } from "../../../styles/Content.styles";

export default function AboutUs() {
  return (
    <>
      <ContentContainer>
        <h1 style={{marginBottom: '1rem'}}>About Us</h1>
        
        <ContentTitle>What we do ?</ContentTitle>
        <Content> MY City Doc helps you to find local doctors in you place to make a Online Appointment with the Doctor. We also find you near by Physicians, Dentists and others. </Content>

        <ContentTitle>How we work ? </ContentTitle>
        <Content>A person can search for a doctors using our platform and book an appointment online with the local doctor. Every Appointment confirmed will receive a Appointment ID and the same is shared with the local doctor. He can visit the doctor and present his Appointment ID for a Consultation with the Doctor.</Content>

        <ContentTitle>Our Mission </ContentTitle>
        <Content> Our mission is to make the appointments easy to consult a doctor and save the time and money from the regular visits.</Content>
      </ContentContainer>
    </>
  );
}
