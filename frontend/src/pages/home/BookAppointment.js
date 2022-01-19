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
import { useDispatch, useSelector } from "react-redux";
import alert from "../../redux/alert/actions";
setOptions({
    theme: "ios",
    themeVariant: "light",
});
export default function BookAppointment({ match }) {
    const [times, setTimes] = useState([]);
    const [selectedTime, setSelectedTime] = useState("");
    const [bookedTime, setBookedTime] = useState([]);
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
    const newDate = new Date();
    const auth = useSelector(state => state.auth)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        number: "",
        date: `${newDate.getFullYear()}-${newDate.getMonth()+1}-${newDate.getDate()}`,
        time: "",
        doctor: match?.params?.id,
        user: auth.id,
    });
    const { name, email, number, date, time, doctor } = formData;
    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    const history = useHistory();
    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API_URL}api/appointments/`,
                formData
            );
              console.log(res);
            if (res.status === 201) {
                dispatch(alert("Appointment booked successfully", "success"));
                history.push(`/appointments/${res?.data?.id}`)
            }
        } catch (error) {
            console.log(error.response);
            if (error.response) {
                for (const err in error.response.data) {
                    dispatch(alert(`${err}: ${error.response.data[err]}`, 'danger'))
                }
            }
        }

        
    };
    const [doctorData, setDoctorData] = useState(null)
    useEffect(() => {
            axios.get(`${process.env.REACT_APP_API_URL}api/get-doctor-data/${match.params?.id}/`).then((res)=>{
                console.log(res.data);
                if(res.status === 200){
                    setDoctorData(res.data);
                }
            }).then((err)=>{

                console.log(err.response);
            })
     }, []);

    const timeInBookedTime = (time) => {
        console.log(bookedTime.includes(JSON.stringify(time)), 'bookedTime');
        console.log(JSON.stringify(time), 'bookedTime');
        console.log(bookedTime, 'bookedTime');
        return bookedTime.includes(JSON.stringify(time));
    }

    useEffect(() => {
        try{
            axios.get(`${process.env.REACT_APP_API_URL}api/appointments/get_booked_times/?date=${date}`).then(res => {
                console.log(res)
                if(res.status === 200){
                    let tempBookedTime = [];
                    res.data.map((time) =>
                        tempBookedTime.push(JSON.stringify(getTimeFromString(time)))
                    );
                    setBookedTime(tempBookedTime);
 
                }
            })
        } catch(err){

        }

    }, [date])

    useEffect(() => {
        console.log(bookedTime, 'bookedTime');
    }, [bookedTime])
    return (
        <>
            <Wrap>
                <Form
                    onSubmit={onSubmit}
                    style={{ marginBottom: "20px", height: "auto" }}
                >
                    <Grid direction="row" justify="start">
                        <ProfileColumn justify="start" lg={3} sx={4}>
                            <img src={demoDr2} />
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
                            onChange={onChange}
                            placeholder="Name"
                            name="name"
                        />
                    </InputDiv>
                    <InputDiv>
                        <Label>Email</Label>

                        <Input
                            value={email}
                            onChange={onChange}
                            placeholder="Email"
                            name="email"
                        />
                    </InputDiv>
                    <InputDiv>
                        <Label>Number</Label>
                        <Input
                            value={number}
                            onChange={onChange}
                            placeholder="Number"
                            name="number"
                        />
                    </InputDiv>
                    <div>
                        <InputDiv>
                            <Label>Date</Label>
                            <Datepicker
                                controls={["calendar"]}
                                display="inline"
                                colors={"#000024"}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        date: `${e.value.getFullYear()}-${e.value.getMonth()+1}-${e.value .getDate()}`
                                    }) 
                                }
                            />
                        </InputDiv>
                        <InputDiv>
                            <Label>Select Time</Label>
                            <Grid
                                style={{ maxHeight: "290px", overflowY: "scroll" }}
                                justify="space-between"
                                lg={4}
                                spacing={10}
                            >
                                {times.map((time, i) => (
                                    <TimeColumn key={i}
                                    disabled={bookedTime.includes(JSON.stringify(time))}
                                    selected={selectedTime === JSON.stringify(time)}
                                    onClick={(e) => {{
                                        timeInBookedTime(time) ? console.log('') : setSelectedTime(JSON.stringify(time)); setFormData({ ...formData, time: `${time.timeOffset ==='PM'? time.hour+ 12:time.hour}:${time.minute}:00` })
                                    }}}
                                  >
                                    {time.hour}:{time.minute} {time.timeOffset}
                                  </TimeColumn> 
                                ))}
                            </Grid>
                        </InputDiv>
                    </div>

                    <Button block>Submit</Button>
                </Form>
            </Wrap>
        </>
    );
}
