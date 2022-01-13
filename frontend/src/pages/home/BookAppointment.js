import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { FormTitle, Input, InputDiv, Label } from '../../styles/Form.styles'
import { Form, Time, Wrap } from '../styles/home/BookAppointment.styles'
import {MdOutlineEmail, MdOutlinePermIdentity} from 'react-icons/md'
import {AiFillPhone} from 'react-icons/ai'

export default function BookAppointment({match}) {
   const [times, setTimes] = useState([])
   useEffect(() => {
    let hour = 1;
    let minute = 0;
    let timeOffset = 'AM';
    let tempTimes = [];
    while (true) {
        if (minute === 60) {
            hour++;
            minute = 0;
        }
        if (hour === 12) {
            timeOffset = "PM"
        }
        if (hour === 24) {
            break;
        }
        tempTimes.push(`${hour}:${minute} ${timeOffset}`)
        console.log(`${hour}:${minute} ${timeOffset}`);
        minute = minute + 15;
    }
    setTimes(tempTimes)
   }, [])
    return (
        <>
            <Wrap>
                <Form>
                    <InputDiv>
                        <FormTitle>Book your appointment</FormTitle>
                    </InputDiv>
                    <InputDiv icon      >
                        <Label>Name</Label>
                        <MdOutlinePermIdentity />
                        <Input placeholder='Name' name='name' />
                    </InputDiv>
                    <InputDiv icon>
                        <Label>Email</Label>
                        <MdOutlineEmail />
                        <Input placeholder='Email' name='email' />

                    </InputDiv>
                    <InputDiv icon>
                        <Label>Number</Label>
                        <AiFillPhone/>
                        <Input placeholder='Number' name='number' />
                    </InputDiv>
                    <InputDiv>
                        <Label>Date</Label>
                        <Input type={'date'} placeholder='Date' name='number'  />
                    </InputDiv>
                    <InputDiv>
                        <Label>Select Time</Label>
                        <div>

                        {times.map(time => (<Time>{time}</Time>))}                                           
                        </div>
                    </InputDiv>
                </Form>
            </Wrap>
        </>
    )
}
