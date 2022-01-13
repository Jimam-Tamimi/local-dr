import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "../../styles/Essentials.styles";
import { FooterColumn, FooterWrap } from "./Footer.styles"; 
import {BsFacebook, BsInstagram, BsLinkedin, BsTwitter} from 'react-icons/bs';
export default function Footer() {
  return (
    <>
      <FooterWrap>
        <Grid justify="space-between">
          <FooterColumn>
            <h3>Local Doctor</h3>
            <p><b>© 2022 Zocdoc, Inc.</b></p>
            <Link>Home</Link>
          </FooterColumn>
          <FooterColumn>
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
