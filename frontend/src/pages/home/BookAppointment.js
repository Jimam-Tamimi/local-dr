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
import { Date as DateComponent, Times, TimeSchedule, TimeScheduleWrap, Time, } from "../styles/admin/Schedule.styles";
setOptions({
    theme: "ios",
    themeVariant: "light",
});
export default function BookAppointment({ match }) { 
    const dispatch = useDispatch();



    const getTimeFromString = (time) => {
        const timeArray = time.split(":");
        let t = {
            hour: parseInt(timeArray[0]),
            minute: parseInt(timeArray[1].split(" ")[0]),
            timeOffset: timeArray[1].split(" ")[1].replaceAll(",", ""),
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
        date: `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}`,
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
                history.push(`/payment/${res?.data?.id}/`)
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
     
    const adminAuth = useSelector(state => state.adminAuth)
 
    useEffect(() => {
        if (adminAuth.type !== 'user') {
            history.push('?show-account=true')
        }
    }, [adminAuth])

    const [activeTime, setActiveTime] = useState([]);
    useEffect( async () => {
        console.log(adminAuth.type);
        

        axios.get(`${process.env.REACT_APP_API_URL}api/get-doctor-data/${match.params?.id}/`).then((res) => {
            console.log(res.data);
            if (res.status === 200) {
                setDoctorData(res.data); 
            }
        }).then((err) => {
            console.log(err?.response);
            console.log(err);
        })

        try {

            const res = await axios.get(`${process.env.REACT_APP_API_URL}api/schedule-doctor/${match.params?.id}/`)
            console.log(res);
            if (res.status == 200) {
                setActiveTime(res.data)
            }
        }
        catch (error) {

        }



    }, []);




    useEffect(() => {
        if (adminAuth.type !== 'user') {
            dispatch(logout())
        }
    }, [])

    
    function convertStrToTimeList(str) {
        return str.replaceAll("'", '').replaceAll("[", "").replaceAll("]", '').split(',').map(t => t + ', ')
    }

    function getTime(time){
        time = getTimeFromString(time)
        console.log(time);
        return (time.timeOffset === 'PM' ? time.hour + 12 : time.hour) + ':' + time.minute + ':00' 
    }

    return (
        <>
            <Wrap>
                <Form
                    onSubmit={onSubmit}
                    style={{ marginBottom: "20px", height: "auto" }}
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
                        <Label>Number</Label>
                        <Input
                            value={number}
                            onChange={onChange}
                            placeholder="Number"
                            name="number"
                            required

                        />
                    </InputDiv>
                    <InputDiv>

                        <TimeScheduleWrap  >
                            {
                                activeTime?.map(time => (
                                    <TimeSchedule> 
                                        <DateComponent>{time.date}</DateComponent>
                                        <Times>
                                            {
                                                convertStrToTimeList(time.time).map((t, i) => (
                                                    <Time className={formData.date===time.date && formData.time === getTime(t)? 'active': ''} key={i} style={{cursor: 'pointer'}} onClick={e => {setFormData({...formData, date: time.date, time: getTime(t)}); console.log(formData);}} >{t}</Time>
                                                ))
                                            }
                                        </Times>
                                    </TimeSchedule>
                                ))
                            }

                        </TimeScheduleWrap>

                    </InputDiv>

                    <Button block>Submit</Button>
                </Form>
            </Wrap>
        </>
    );
}
