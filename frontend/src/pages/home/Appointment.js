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
        date: `${newDate.getFullYear()}-${newDate.getMonth()+1}-${newDate.getDate()}`,
        time: "",
        doctor: "",
    });
    const dispatch = useDispatch();
    useEffect(() => {
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

        axios
            .get(`${process.env.REACT_APP_API_URL}api/appointments/${match?.params?.id}/`)
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
     
    const [doctorData, setDoctorData] = useState(null)
    useEffect(() => {
            axios.get(`${process.env.REACT_APP_API_URL}api/get-doctor-data/${doctor}/`).then((res)=>{
                console.log(res.data);
                if(res.status === 200){
                    setDoctorData(res.data);
                }
            }).then((err)=>{

                console.log(err.response);
            })
     }, [doctor]);

    const timeInBookedTime = (time) => { 
        return bookedTime.includes(JSON.stringify(time));
    }

    
 
    return (
        <>
            <Wrap>
                <Form
                    style={{ marginBottom: "20px", height: "auto" }}
                >
                    <Grid direction="row" justify="start">
                        <ProfileColumn justify="start" lg={3} sx={4}>
                        <img src={doctorData?.image&& `${process.env.REACT_APP_MEDIA_URL}${doctorData?.image}`} />
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

                        <Input
                            value={name}
                            placeholder="Name"
                            name="name"
                            disabled
                        />
                    </InputDiv>
                    <InputDiv>
                        <Label>Email</Label>

                        <Input
                            value={email}
                            placeholder="Email"
                            name="email"
                            disabled
                        />
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
                            type='date'

                        />
                    </InputDiv>
                    <InputDiv>
                        <Label>Time</Label>
                        <Input
                            value={time}
                            placeholder="Time"
                            name="time"
                            disabled
                            type='time'
                        />
                    </InputDiv>
                    
                </Form>
            </Wrap>
        </>
    );
}
