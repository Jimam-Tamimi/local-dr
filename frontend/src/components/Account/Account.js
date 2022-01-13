import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Button, Grid } from "../../styles/Essentials.styles";
import { Input, InputDiv, Label } from "../../styles/Form.styles";
import Modal from "../Modal/Modal";
import {
  AccountWrap,
  ColumnTab,
  LoginForm,
  SignupForm,
} from "./Account.styles";

export default function Account() {
  const [form, setForm] = useState("login");
  const location = useLocation();
  const history = useHistory();
  let search = location.search;
  let params = new URLSearchParams(search);
  const [showModal, setShowModal] = useState(
    params.get("show-account") === "true"
  );
  useEffect(() => {
    setShowModal(params.get("show-account") === "true");
  }, [location]);
  useEffect(() => {
    if (!showModal && params.get("show-account") === "true") {
      history.goBack();
    }
  }, [showModal]);


  return (
    <>
      <Modal setShow={setShowModal} show={showModal}>
        <AccountWrap>
          <Grid direction="column">
            {form === "login" ? (
                <LoginForm>
                  <h3>Enter Email And Password to Login</h3>
                <InputDiv>
                  <Label>Enter Your Email</Label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Enter Your Email"
                  />
                </InputDiv>
                <InputDiv>
                  <Label>Enter Password</Label>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                  />
                </InputDiv>
                <InputDiv>
                  <Button block>Login</Button>
                </InputDiv>
                <InputDiv  style={{alignItems: 'center'}}>
                    <p>New To Local Doctor? <b  style={{cursor: 'pointer'}}  onClick={(e) =>{ setTimeout(() => {setForm('signUp')}, 1)}}  >Create An Account</b></p>
                </InputDiv>
              </LoginForm>
            ) : (
              form === "signUp" && (
                <SignupForm>
                  <h3>Enter Email And Password and Create Account</h3>

                  <InputDiv>
                    <Label>Enter Your Email</Label>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Enter Your Email"
                    />
                  </InputDiv>
                  <InputDiv>
                    <Label>Enter Password</Label>
                    <Input
                      type="password"
                      name="password"
                      placeholder="Enter Password"
                    />
                  </InputDiv>
                  <InputDiv>
                    <Label>Confirm Password</Label>
                    <Input
                      type="password"
                      name="cpassword"
                      placeholder="Confirm Password"
                    />
                  </InputDiv>
                  <InputDiv>
                    <Button block>Login</Button>
                  </InputDiv>
                  <InputDiv  style={{alignItems: 'center'}}>
                    <p>Already have an account? <b  style={{cursor: 'pointer'}} onClick={(e) =>{ setTimeout(() => {setForm('login')}, 1)}} >Login</b></p>
                  </InputDiv>
                </SignupForm>
              )
            )}
          </Grid>
        </AccountWrap>
      </Modal>
    </>
  );
}
