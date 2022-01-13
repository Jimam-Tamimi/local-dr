import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "../../styles/Essentials.styles";
import { FooterColumn, FooterWrap } from "./Footer.styles"; 
import {BsFacebook, BsInstagram, BsLinkedin, BsTwitter} from 'react-icons/bs';
export default function Footer() {
  return (
    <>
      <FooterWrap>
        <Grid justify="space-between" >
          <FooterColumn justify="start"  sx={12} lg={8}>
            <h3>Local Doctor</h3>
            <p><b>© 2022 Local Doctor, Inc.</b></p>
            <Link>Home</Link>
          </FooterColumn  >
          <FooterColumn justify="end" sx={12} lg={4}>
              <Link to ="#" ><BsFacebook /></Link>
              <Link to ="#" ><BsLinkedin /></Link>
              <Link to ="#" ><BsTwitter /></Link>
              <Link to ="#" ><BsInstagram /></Link>
          </FooterColumn>
        </Grid>
      </FooterWrap>
    </>
  );
}
