import React from "react";
import {
  Content,
  ContentContainer,
  ContentTitle,
} from "../../../styles/Content.styles";

export default function RefundPolicy() {
  return (
    <>
      <ContentContainer>
        <h1 style={{ marginBottom: "1rem", textTransform: "uppercase" }}>
          Refund Policy
        </h1>
        <Content>
          Refund is done if a Booking is not confirmed and money is deducte.
          Please email at mycitydocs@gmail.com to issue a refund. it may take 5
          to 7 days to issue a refund.
        </Content>
      </ContentContainer>
    </>
  );
}
