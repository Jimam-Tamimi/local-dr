import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { FormTitle, Input, InputDiv, Label } from "../../styles/Form.styles";
import {
    Form,
    ProfileColumn,

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
import { logout } from "../../redux/auth/actions";
import { showRazorpay } from '../../helpers'
import { setProgress } from "../../redux/progress/actions";


export default function BookAppointment({ match }) {
    const dispatch = useDispatch();
    const [paymentSuccess, setPaymentSuccess] = useState(false);


    const getTimeFromString = (time) => {
        const timeArray = time.split(":");
        let t = {
            hour: parseInt(timeArray[0]),
            minute: parseInt(timeArray[1]?.split(" ")[0]),
            timeOffset: timeArray[1]?.split(" ")[1]?.replaceAll(",", ""),
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
        date: new Date().getFullYear() + "-" + new Date().getMonth() + 1 + '-' + new Date().getDate(),
        time: "",
        doctor: match?.params?.id,
        user: auth.id,
    });
    const { name, email, number, date, time, doctor } = formData;
    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    const history = useHistory();
    const onSubmit = async (e) => {
    dispatch(setProgress(10))
        e.preventDefault();
        console.log(formData);
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API_URL}api/appointments/`,
                formData
            );
    dispatch(setProgress(100))
            console.log(res);
            if (res.status === 201) {
                await showRazorpay(res.data.id, () => {
                    dispatch(alert("Appointment booked successfully", "success"));
                    history.push(`/your-appointments/`);
                })
                console.log(paymentSuccess);

            }
        } catch (error) {
            console.log(error);
            console.log(error.response);
            if (error.response) {
                for (const err in error.response.data) {
                    dispatch(alert(`${err}: ${error.response.data[err]}`, 'danger'))
                }
            }
        }


    };
    const [doctorData, setDoctorData] = useState(null)

    const adminAuth = useSelector(state => state.adminAuth)

    useEffect(() => {
        if (adminAuth.type !== 'user') {
            history.push('?show-account=true')
        }
    }, [adminAuth])

    const [activeTime, setActiveTime] = useState(null);
    useEffect(() => {
        console.log(adminAuth.type);
        dispatch(setProgress(30))

        match.params?.id &&
            axios.get(`${process.env.REACT_APP_API_URL}api/get-doctor-data/${match.params?.id}/`).then((res) => {
                console.log(res.data);
            dispatch(setProgress(100))

                if (res.status === 200) {
                    setDoctorData(res.data);
                }
            }).catch((err) => {
                console.log(err?.response);
                console.log(err);
            })





    }, []);




    useEffect(() => {
        if (adminAuth.type !== 'user') {
            dispatch(logout())
        }
    }, [])


    function convertStrToTimeList(str) {
        return str?.replaceAll("'", '').replaceAll("[", "").replaceAll("]", '').split(',').map(t => t + ', ')
    }

    function getTime(time) {
        time = getTimeFromString(time)
        console.log(time);
        return (time.timeOffset === 'PM' ? time.hour + 12 : time.hour) + ':' + time.minute + ':00'
    }


    useEffect(async () => {
        try {
        dispatch(setProgress(25))

        const res = await axios.get(`${process.env.REACT_APP_API_URL}api/schedule-doctor/${match.params?.id}/?date=${date}`);
        console.log({ res });
        dispatch(setProgress(80))

        if (res.status == 200) {
                setActiveTime(res.data)
        }
    }
    catch (error) {
        console.log(error?.response);
    }
    dispatch(setProgress(100))
    }, [date]);



    return (
        <>
            <Wrap>
                <Form
                    onSubmit={onSubmit}
                    style={{ marginBottom: "20px", height: "auto" }}
                    id="appointment-form"
                >
                    <Grid direction="row" justify="start">
                        <ProfileColumn justify="start" lg={3} sx={4}>
                            <img src={doctorData?.image && `${process.env.REACT_APP_MEDIA_URL}${doctorData?.image}`} />
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
                            required
                        />
                    </InputDiv>
                    <InputDiv>
                        <Label>Email</Label>

                        <Input
                            value={email}
                            onChange={onChange}
                            placeholder="Email"
                            name="email"
                            required

                        />
                    </InputDiv>
                    <InputDiv>
                        <Label>Mobile Number</Label>
                        <Input
                            value={number}
                            onChange={onChange}
                            placeholder="Mobile Number"
                            name="number"
                            required

                        />
                    </InputDiv>
                    <InputDiv>
                        <Label>Date</Label>
                        <Input
                            onChange={onChange}
                            placeholder="Date"
                            name="date"
                            required
                            type={'date'}
                            value={date}

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
                            {
                                activeTime?.map(time => (

                                    convertStrToTimeList(time.time)?.map((t, i) => (
                                        <TimeColumn key={i}
                                            selected={formData.time === getTime(t)}
                                            onClick={(e) => {
                                                setFormData({ ...formData, time: getTime(t) }); console.log(formData);
                                            }}
                                        >
                                            {t}
                                        </TimeColumn>
                                    ))

                                ))
                            }
                            {
                                activeTime?.length === 0 &&
                                <p style={{ width: "100%", textAlign: "center", marginTop: "25px" }}>No Appointments Available on Selected Date</p>
                            }
                        </Grid>

                    </InputDiv>

                    <Button block>Continue Booking</Button>
                </Form>
            </Wrap>
        </>
    );
}
