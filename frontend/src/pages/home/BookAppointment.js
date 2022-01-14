import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { FormTitle, Input, InputDiv, Label } from '../../styles/Form.styles'
import { Form, ProfileColumn, Time, TimeColumn, Wrap } from '../styles/home/BookAppointment.styles'
import { MdOutlineEmail, MdOutlinePermIdentity } from 'react-icons/md'
import { AiFillPhone } from 'react-icons/ai'
import { Column, Grid } from '../../styles/Essentials.styles'
import Calendar from 'react-calendar';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Datepicker, setOptions } from '@mobiscroll/react';
import 'react-calendar/dist/Calendar.css';
import demoDr2 from "../../assets/images/demo-dr2.png";

setOptions({
    theme: 'ios',
    themeVariant: 'light'
});
export default function BookAppointment({ match }) {
    const [times, setTimes] = useState([])
    const [selectedTime, setSelectedTime] = useState('')
    const [bookedTime, setBookedTime] = useState([4, 17, 20, 2, 34, 9])
    const [date, setDate] = useState(new Date())
    useEffect(() => {
        let hour = 7;
        let minute = 0;
        let tempTimes = [];
        while (true) {
            if (minute === 60) {
                hour++;
                minute = 0;
            }
            if (hour === 12) {
                break;
            }
            tempTimes.push(`${hour}:${minute} AM`)
            console.log(`${hour}:${minute} AM`);
            minute = minute + 10;
        }
        setTimes(tempTimes)
    }, [])


    return (
        <>
            <Wrap>
                <Form style={{ margin: '20px', height: 'auto' }}>
                    <Grid direction="row" justify="start">
                        <ProfileColumn justify="start" lg={3} sx={4}>
                            <img src={demoDr2} />
                        </ProfileColumn>

                        <ProfileColumn direction="column" align="start" lg={9} sx={8} >
                            <h3>Lorem, ipsum dolor.</h3>
                            <p>Lorem ipsum dolor sit  .</p>
                            <p>amet consectetur adipisicing.</p>
                        </ProfileColumn>
                    </Grid>
                    <InputDiv>
                        <FormTitle>Book your appointment</FormTitle>
                    </InputDiv>
                    <InputDiv       >
                        <Label>Name</Label>
                        <Input placeholder='Name' name='name' />
                    </InputDiv>
                    <InputDiv >
                        <Label>Email</Label>
                        <Input placeholder='Email' name='email' />

                    </InputDiv>
                    <InputDiv >
                        <Label>Number</Label>
                        <Input placeholder='Number' name='number' />
                    </InputDiv>
                    <InputDiv>
                        <Label>Date</Label> 
                        <Datepicker
                            controls={['calendar']}
                            display="inline"
                            colors={"#000024"}
                        />
                    </InputDiv>
                    <InputDiv>
                        <Label>Select Time</Label>
                        <Grid style={{ maxHeight: "290px", overflowY: "scroll" }} justify="space-between" lg={4} spacing={10}>
                            {times.map((time, i) => (<TimeColumn disabled={bookedTime.includes(i)} selected={time === selectedTime} onClick={e => bookedTime.includes(i) ? '' : setSelectedTime(time)} >{time}</TimeColumn>))}
                        </Grid>
                    </InputDiv>
                </Form>
            </Wrap>
        </>
    )
}
