import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { FormTitle, Input, InputDiv, Label } from "../../styles/Form.styles";
import {
  Form,
  ProfileColumn,
  Time,
  TimeColumn,
  Wrap,
} from "../styles/home/BookAppointment.styles";
import { MdOutlineEmail, MdOutlinePermIdentity } from "react-icons/md";
import { AiFillPhone } from "react-icons/ai";
import { Button, Column, Grid } from "../../styles/Essentials.styles";
import Calendar from "react-calendar";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Datepicker, setOptions } from "@mobiscroll/react";
import "react-calendar/dist/Calendar.css";
import demoDr2 from "../../assets/images/demo-dr2.png";
import axios from "axios";
import { useDispatch } from "react-redux";
import alert from "../../redux/alert/actions";
import { setProgress } from "../../redux/progress/actions";
setOptions({
  theme: "ios",
  themeVariant: "light",
});
export default function BookAppointment({ match }) {
  const [times, setTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [bookedTime, setBookedTime] = useState([]);
  const newDate = new Date();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    date: `${newDate.getFullYear()}-${
      newDate.getMonth() + 1
    }-${newDate.getDate()}`,
    time: "",
    doctor: "",
  });
  const dispatch = useDispatch();
  useEffect(async () => {
    let hour = 7;
    let minute = 0;
    let tempTimes = [];
    let timeOffset = "AM";
    while (true) {
      if (minute === 60) {
        hour++;
        minute = 0;
      }
      if (hour === 12 && minute === 0 && timeOffset === "AM") {
        minute = 0;
        timeOffset = "PM";
      }
      if (hour === 12 && minute === 50 && timeOffset === "PM") {
        hour = 1;
        minute = 0;
      }
      if (hour === 11 && minute === 40 && timeOffset === "PM") {
        break;
      }
      tempTimes.push({ hour, minute, timeOffset });

      minute = minute + 10;
    }
    setTimes(tempTimes);
    dispatch(setProgress(20));

    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/appointments/${match?.params?.id}/`
      )
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setFormData({
            ...formData,
            name: res.data.name,
            email: res.data.email,
            number: res.data.number,
            date: res.data.date,
            time: res.data.time,
            doctor: res.data.doctor,
          });
        }
        dispatch(setProgress(100));
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  const getTimeFromString = (time) => {
    const timeArray = time.split(":");
    let t = {
      hour:
        parseInt(timeArray[0]) > 12
          ? parseInt(timeArray[0]) - 12
          : parseInt(timeArray[0]),
      minute: parseInt(timeArray[1]),
      timeOffset: timeArray[0] > 12 ? "PM" : "AM",
    };
    console.log(t);
    return t;
  };

  const { name, email, number, date, time, hospital, doctor } = formData;

  const [doctorData, setDoctorData] = useState(null);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/get-doctor-data/${doctor}/`)
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          setDoctorData(res.data);
        }
      })
      .then((err) => {
        console.log(err.response);
      });
  }, [doctor]);

  const timeInBookedTime = (time) => {
    return bookedTime.includes(JSON.stringify(time));
  };

  return (
    <>
      <>
        <Wrap>
          <Form style={{ marginBottom: "20px", height: "auto" }}>
            <Grid direction="row" justify="start">
              <ProfileColumn justify="start" lg={3} sx={4}>
                <img
                  src={
                    doctorData?.image &&
                    `${process.env.REACT_APP_MEDIA_URL}${doctorData?.image}`
                  }
                />
              </ProfileColumn>

              <ProfileColumn direction="column" align="start" lg={9} sx={8}>
                <h3>{doctorData?.name}</h3>
                <p>{doctorData?.hospital?.name}</p>
                <p>{doctorData?.qualification}</p>
              </ProfileColumn>
            </Grid>
            <InputDiv>
              <FormTitle>Book your appointment</FormTitle>
            </InputDiv>
            <InputDiv>
              <Label>Name</Label>

              <Input value={name} placeholder="Name" name="name" disabled />
            </InputDiv>
            <InputDiv>
              <Label>Email</Label>

              <Input value={email} placeholder="Email" name="email" disabled />
            </InputDiv>
            <InputDiv>
              <Label>Number</Label>
              <Input
                value={number}
                placeholder="Number"
                name="number"
                disabled
              />
            </InputDiv>
            <InputDiv>
              <Label>Date</Label>
              <Input
                value={date}
                placeholder="Date"
                name="date"
                disabled
                type="date"
              />
            </InputDiv>
            <InputDiv>
              <Label>Time</Label>
              <Input
                value={time}
                placeholder="Time"
                name="time"
                disabled
                type="time"
              />
            </InputDiv>
          </Form>
        </Wrap>
      </>

      <table
        align="center"
        border={0}
        cellPadding={0}
        cellSpacing={0}
        width="100%"
        style={{ maxWidth: "600px" }}
      >
        <tbody> 
          <tr>
            <td
              align="center"
              style={{
                padding: "35px 35px 20px 35px",
                backgroundColor: "#ffffff",
              }}
              bgcolor="#ffffff"
            >
              <table
                align="center"
                border={0}
                cellPadding={0}
                cellSpacing={0}
                width="100%"
                style={{ maxWidth: "600px" }}
              >
                <tbody>
                  <tr>
                    <td
                      align="center"
                      style={{
                        fontFamily: "Open Sans, Helvetica, Arial, sans-serif",
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "24px",
                        paddingTop: "25px",
                      }}
                    >
                      {" "}
                      <img
                        src="https://img.icons8.com/carbon-copy/100/000000/checked-checkbox.png"
                        width={125}
                        height={120}
                        style={{ display: "block", border: "0px" }}
                      />
                      <br />
                      <h2
                        style={{
                          fontSize: "30px",
                          fontWeight: 800,
                          lineHeight: "36px",
                          color: "#333333",
                          margin: 0,
                        }}
                      >
                        {" "}
                        Thank You For Your Order!{" "}
                      </h2>
                    </td>
                  </tr>
                  <tr>
                    <td
                      align="left"
                      style={{
                        fontFamily: "Open Sans, Helvetica, Arial, sans-serif",
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "24px",
                        paddingTop: "10px",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "16px",
                          fontWeight: 400,
                          lineHeight: "24px",
                          color: "#777777",
                        }}
                      >
                        {" "}
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Praesentium iste ipsa numquam odio dolores, nam.{" "}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td align="left" style={{ paddingTop: "20px" }}>
                      <table
                        cellSpacing={0}
                        cellPadding={0}
                        border={0}
                        width="100%"
                      >
                        <tbody>
                          <tr>
                            <td
                              width="75%"
                              align="left"
                              bgcolor="#eeeeee"
                              style={{
                                fontFamily:
                                  "Open Sans, Helvetica, Arial, sans-serif",
                                fontSize: "16px",
                                fontWeight: 800,
                                lineHeight: "24px",
                                padding: "10px",
                              }}
                            >
                              {" "}
                              Order Confirmation #{" "}
                            </td>
                            <td
                              width="25%"
                              align="left"
                              bgcolor="#eeeeee"
                              style={{
                                fontFamily:
                                  "Open Sans, Helvetica, Arial, sans-serif",
                                fontSize: "16px",
                                fontWeight: 800,
                                lineHeight: "24px",
                                padding: "10px",
                              }}
                            >
                              {" "}
                              2345678{" "}
                            </td>
                          </tr>
                          <tr>
                            <td
                              width="75%"
                              align="left"
                              style={{
                                fontFamily:
                                  "Open Sans, Helvetica, Arial, sans-serif",
                                fontSize: "16px",
                                fontWeight: 400,
                                lineHeight: "24px",
                                padding: "15px 10px 5px 10px",
                              }}
                            >
                              {" "}
                              Purchased Item (1){" "}
                            </td>
                            <td
                              width="25%"
                              align="left"
                              style={{
                                fontFamily:
                                  "Open Sans, Helvetica, Arial, sans-serif",
                                fontSize: "16px",
                                fontWeight: 400,
                                lineHeight: "24px",
                                padding: "15px 10px 5px 10px",
                              }}
                            >
                              {" "}
                              $100.00{" "}
                            </td>
                          </tr>
                          <tr>
                            <td
                              width="75%"
                              align="left"
                              style={{
                                fontFamily:
                                  "Open Sans, Helvetica, Arial, sans-serif",
                                fontSize: "16px",
                                fontWeight: 400,
                                lineHeight: "24px",
                                padding: "5px 10px",
                              }}
                            >
                              {" "}
                              Shipping + Handling{" "}
                            </td>
                            <td
                              width="25%"
                              align="left"
                              style={{
                                fontFamily:
                                  "Open Sans, Helvetica, Arial, sans-serif",
                                fontSize: "16px",
                                fontWeight: 400,
                                lineHeight: "24px",
                                padding: "5px 10px",
                              }}
                            >
                              {" "}
                              $10.00{" "}
                            </td>
                          </tr>
                          <tr>
                            <td
                              width="75%"
                              align="left"
                              style={{
                                fontFamily:
                                  "Open Sans, Helvetica, Arial, sans-serif",
                                fontSize: "16px",
                                fontWeight: 400,
                                lineHeight: "24px",
                                padding: "5px 10px",
                              }}
                            >
                              {" "}
                              Sales Tax{" "}
                            </td>
                            <td
                              width="25%"
                              align="left"
                              style={{
                                fontFamily:
                                  "Open Sans, Helvetica, Arial, sans-serif",
                                fontSize: "16px",
                                fontWeight: 400,
                                lineHeight: "24px",
                                padding: "5px 10px",
                              }}
                            >
                              {" "}
                              $5.00{" "}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td align="left" style={{ paddingTop: "20px" }}>
                      <table
                        cellSpacing={0}
                        cellPadding={0}
                        border={0}
                        width="100%"
                      >
                        <tbody>
                          <tr>
                            <td
                              width="75%"
                              align="left"
                              style={{
                                fontFamily:
                                  "Open Sans, Helvetica, Arial, sans-serif",
                                fontSize: "16px",
                                fontWeight: 800,
                                lineHeight: "24px",
                                padding: "10px",
                                borderTop: "3px solid #eeeeee",
                                borderBottom: "3px solid #eeeeee",
                              }}
                            >
                              {" "}
                              TOTAL{" "}
                            </td>
                            <td
                              width="25%"
                              align="left"
                              style={{
                                fontFamily:
                                  "Open Sans, Helvetica, Arial, sans-serif",
                                fontSize: "16px",
                                fontWeight: 800,
                                lineHeight: "24px",
                                padding: "10px",
                                borderTop: "3px solid #eeeeee",
                                borderBottom: "3px solid #eeeeee",
                              }}
                            >
                              {" "}
                              $115.00{" "}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td
              align="center"
              height="100%"
              valign="top"
              width="100%"
              style={{
                padding: "0 35px 35px 35px",
                backgroundColor: "#ffffff",
              }}
              bgcolor="#ffffff"
            >
              <table
                align="center"
                border={0}
                cellPadding={0}
                cellSpacing={0}
                width="100%"
                style={{ maxWidth: "660px" }}
              >
                <tbody>
                  <tr>
                    <td align="center" valign="top" style={{ fontSize: 0 }}>
                      <div
                        style={{
                          display: "inline-block",
                          maxWidth: "50%",
                          minWidth: "240px",
                          verticalAlign: "top",
                          width: "100%",
                        }}
                      >
                        <table
                          align="left"
                          border={0}
                          cellPadding={0}
                          cellSpacing={0}
                          width="100%"
                          style={{ maxWidth: "300px" }}
                        >
                          <tbody>
                            <tr>
                              <td
                                align="left"
                                valign="top"
                                style={{
                                  fontFamily:
                                    "Open Sans, Helvetica, Arial, sans-serif",
                                  fontSize: "16px",
                                  fontWeight: 400,
                                  lineHeight: "24px",
                                }}
                              >
                                <p style={{ fontWeight: 800 }}>
                                  Delivery Address
                                </p>
                                <p>
                                  675 Massachusetts Avenue
                                  <br />
                                  11th Floor
                                  <br />
                                  Cambridge, MA 02139
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div
                        style={{
                          display: "inline-block",
                          maxWidth: "50%",
                          minWidth: "240px",
                          verticalAlign: "top",
                          width: "100%",
                        }}
                      >
                        <table
                          align="left"
                          border={0}
                          cellPadding={0}
                          cellSpacing={0}
                          width="100%"
                          style={{ maxWidth: "300px" }}
                        >
                          <tbody>
                            <tr>
                              <td
                                align="left"
                                valign="top"
                                style={{
                                  fontFamily:
                                    "Open Sans, Helvetica, Arial, sans-serif",
                                  fontSize: "16px",
                                  fontWeight: 400,
                                  lineHeight: "24px",
                                }}
                              >
                                <p style={{ fontWeight: 800 }}>
                                  Estimated Delivery Date
                                </p>
                                <p>January 1st, 2016</p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
 
        </tbody>
      </table>
    </>
  );
}
