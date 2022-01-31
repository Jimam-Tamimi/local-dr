import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "../../styles/Essentials.styles";
import { FooterColumn, FooterWrap } from "./Footer.styles"; 
import {BsFacebook, BsInstagram, BsLinkedin, BsTwitter} from 'react-icons/bs';
import { useSelector } from "react-redux";
export default function Footer() {

  const auth = useSelector(state => state.auth);
  
  return (
    <>
      <FooterWrap >
        <Grid justify="space-between" >
          <FooterColumn justify="start"  sx={12} lg={8}>
            <h3>My City Doc</h3>
            <p><b>© 2022 , Inc.</b></p>
            <Link to={''} onClick={e => {e.preventDefault(); window.location.reload();}} >Home</Link>
            {
              auth.isAuthenticated ?
              <Link to="#" >Account</Link>:
              <Link to="?show-account=true" >Account</Link>
            }
            <Link to="/admin/" >Hospitals</Link>
          </FooterColumn  >
          <FooterColumn direction="column" align="end" sx={12} lg={4}>
              {/* <Link to ="#" ><BsFacebook /></Link>
              <Link to ="#" ><BsLinkedin /></Link>
              <Link to ="#" ><BsTwitter /></Link>
              <Link to ="#" ><BsInstagram /></Link> */}   
              <p style={{textAlign: "end"}} ><b>Address</b> - Hno  22-2-220/D , Deshaipet, Warangal , Telangana State, India</p>
              <p style={{textAlign: "end"}} >Mobile - 9573278499, 9346557817</p>
              
          </FooterColumn>
        </Grid>
      </FooterWrap>
    </>
  );
}
