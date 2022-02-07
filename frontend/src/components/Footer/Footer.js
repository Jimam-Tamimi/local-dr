import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "../../styles/Essentials.styles";
import { FooterColumn, FooterWrap } from "./Footer.styles";
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
import { useSelector } from "react-redux";
export default function Footer() {
  const auth = useSelector((state) => state.auth);

  return (
    <>
      <FooterWrap>
        <Grid justify="space-between">
          <FooterColumn className="first" justify="start" sx={12} lg={8}>
            <div>
              <div className="c-logo"  >
                <h3>My City Doc</h3>
                <p>
                  <b>© 2022 , Inc.</b>
                </p>
              </div>
              <Link
                to={""}
                onClick={(e) => {
                  e.preventDefault();
                  window.location.reload();
                }}
              >
                Home
              </Link>
              {auth.isAuthenticated ? (
                <Link to="#">Account</Link>
              ) : (
                <Link to="?show-account=true">Account</Link>
              )}
              <Link to="/admin/">Hospitals</Link>
              <Link to="/about-us/">About Us</Link>
            </div>
            <div>
              <Link to="/contact-us/">Contact Us</Link>
              <Link to="/pricing/">Pricing</Link>
              <Link to="/privacy-policy/">Privacy Policy</Link>
              <Link to="/terms-service/">TOS</Link>
              <Link to="/refund-policy/">Refund</Link>
            </div>
          </FooterColumn>
          <FooterColumn direction="column" align="end" sx={12} lg={4}>
            {/* <Link to ="#" ><BsFacebook /></Link>
              <Link to ="#" ><BsLinkedin /></Link>
              <Link to ="#" ><BsTwitter /></Link>
              <Link to ="#" ><BsInstagram /></Link> */}
            <p style={{ textAlign: "end" }}>
              <b>Address</b> - Hno 22-2-220/D , Deshaipet, Warangal , Telangana
              State, India
            </p>
            <p style={{ textAlign: "end" }}>EMAIL: mycitydocs@gmail.com</p>
          </FooterColumn>
        </Grid>
      </FooterWrap>
    </>
  );
}
