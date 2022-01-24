import React, { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { Button, ButtonLink, Column, Grid } from "../../../styles/Essentials.styles";
import {
    Actions,
    OptionsColumn,
    Search,
    Table,
    Td,
    Th,
    Tr,
} from "../../../styles/Table.styles";
import { Form, HeadingColumn, InputDivW } from "../../styles/admin/Hospitals.styles";
import Modal from '../../../components/Modal/Modal';
import { Input, InputDiv, Label } from "../../../styles/admin/Forms.styles";
import Map from '../../../components/Map/Map';
import Marker from "react-google-maps/lib/components/Marker";
import { Autocomplete } from '@react-google-maps/api'
import { useEffect } from "react";
import axios from "axios";
import alert from '../../../redux/alert/actions'
import { useDispatch } from 'react-redux'
import { TimeColumn } from "../../styles/home/BookAppointment.styles";
import { Date, Time, Times, TimeSchedule, TimeScheduleWrap } from "../../styles/admin/Schedule.styles";
import { setProgress } from "../../../redux/progress/actions";


export default function Schedule() {
    const [doctors, setDoctors] = useState([])
    const dispatch = useDispatch()
    const getDoctors = async () => {
        try {

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'

                }
            }

            const res = await axios.get(`${process.env.REACT_APP_API_URL}api/doctors/`, config)
            console.log(res)
            if (res.status === 200) {
                setDoctors(res.data)
            }
        } catch (error) {
            console.log(error)
            console.log(error?.response)
        }
    }
    const filterDoctor = async (e) => {
        const search = e.target.value
        try {

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'

                }
            }
            const res = await axios.get(`${process.env.REACT_APP_API_URL}api/doctors/?search=${search}`)
            if (res.status === 200) {
                setDoctors(res.data)
            }
        } catch (err) {

        }
    }
    useEffect(async () => {
        dispatch(setProgress(20))
        await getDoctors()
        dispatch(setProgress(100))
    }, [])

    const getProperTime = (time) => {
        console.log(time)
        if (time === null) {
            return '-'
        }
        let n = new Date('2021-08-21 ' + time)
        let hours = n.getHours()
        let minutes = n.getMinutes()

        let ampm = hours >= 12 ? 'pm' : 'am'
        hours = n.getHours() > 12 ? n.getHours() - 12 : n.getHours()
        if (hours === 0) {
            hours = 12
        }
        return hours + ':' + minutes + ' ' + ampm
    }

    // edit time
    const [showTimeEditForm, setShowTimeEditForm] = useState(false)
    const [doctorId, setDoctorId] = useState(null)

    const clearTime = async id => {
        dispatch(setProgress(20))

        try {
            dispatch(setProgress(40))

            const res = await axios.patch(`${process.env.REACT_APP_API_URL}api/doctors/${id}/`, {
                startTime: null,
                endTime: null
            })
            dispatch(setProgress(70))
            if (res.status === 200) {
                await getDoctors()
                dispatch(setProgress(90))
            }
        } catch (error) {

        }
        dispatch(setProgress(100))
    }
    const [showScheduledTime, setShowScheduledTime] = useState(false);
    const [selectedTime, setSelectedTime] = useState(null);
    return (
        <>
            <Grid style={{ border: "1px solid #eff2f7" }}>
                <HeadingColumn justify="space-between">
                    <h1>All Doctor</h1>
                </HeadingColumn>
            </Grid>
            <Grid style={{ overflowX: "scroll" }} direction="column">
                <OptionsColumn justify="flex-end" style={{ margin: "10px 0px" }}>
                    <Search onChange={filterDoctor} type="text" placeholder="Search..." />
                </OptionsColumn>
                <Table>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Name</Th>
                        <Th>Speciality</Th>
                        <Th>Qualification</Th>
                        <Th>Schedule</Th>
                        <Th>Actions</Th>
                    </Tr>
                    {
                        doctors.map((doctor, i) => (
                            <Tr key={doctor.id}>

                                <Td>{doctor.id}</Td>
                                <Td>{doctor.name}</Td>
                                <Td>{doctor.speciality}</Td>
                                <Td>{doctor.qualification}</Td>
                                <Td>
                                    {
                                        doctor?.doctor_schedule?.map(time => (
                                            <p>{time.date}</p>
                                        ))
                                    }

                                </Td>
                                <Td>
                                    <Actions>
                                        <Button onClick={e => { setShowTimeEditForm(true); setDoctorId(doctor.id) }} sm green>Edit Time</Button>
                                        <Button onClick={e => { setShowScheduledTime(true); setSelectedTime(doctor.id) }} sm green>Scheduled Time</Button>
                                    </Actions>
                                </Td>
                            </Tr>
                        ))
                    }


                </Table>
            </Grid>

            <Modal zoom show={showTimeEditForm} setShow={setShowTimeEditForm}>
                <ScheduleTime getDoctors={getDoctors} doctorId={doctorId} setShowTimeEditForm={setShowTimeEditForm} />
            </Modal>
            <Modal zoom show={showScheduledTime} setShow={setShowScheduledTime}>
                <ShowSchedule doctors={doctors} setSelectedTime={setSelectedTime} getDoctors={getDoctors} selectedTime={selectedTime} />
            </Modal>
        </>
    );
}



function ScheduleTime({ getDoctors, setShowTimeEditForm, doctorId }) {
    const [formData, setFormData] = useState({
        date: "",
        times: [],
    })

    const { date, times } = formData
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })
    const dispatch = useDispatch()
    const onSubmit = async e => {
        console.log(formData)
        e.preventDefault()
        dispatch(setProgress(20))
        try {

            const res = await axios.post(`${process.env.REACT_APP_API_URL}api/schedule-doctor/${doctorId}/`, formData,)
            console.log(res)
        dispatch(setProgress(60))
            if (res.status === 200) {
                dispatch(alert('Doctor Time Updated', 'success'))
                setShowTimeEditForm(false)
                await getDoctors()
        dispatch(setProgress(85))
                setFormData({
                    date: "",
                    times: [],
                })
            }
        } catch (error) {

            dispatch(alert('Failed to update doctor time', 'danger'))

            console.log(error.response)
        }
        dispatch(setProgress(100))
    }



    function getAllTime() {
        let hour = 7
        let minutes = 0
        let times = []
        let timeOffset = 'AM'

        let endHour = 11
        let endMinutes = 30 + 10
        while (true) {

            if (hour === endHour && minutes === endMinutes && timeOffset === 'PM') {
                break
            }
            if (hour == 13) {
                hour = 1
            }

            if (minutes == 60) {
                minutes = 0
                hour++
            }
            if (hour == 12) {
                timeOffset = 'PM'
            }
            times.push(`${(hour + '').length == 1 ? "0" + hour : hour}:${(minutes + '').length == 1 ? '0' + minutes : minutes} ${timeOffset}`)

            minutes += 10



        }
        return times

    }


    return (
        <>
            <Form onSubmit={onSubmit}>
                <InputDiv>
                    <Label>Date *</Label>
                    <Input name="date" onChange={onChange} type='date' required placeholder="Date" value={date} />

                </InputDiv>
                <InputDiv>
                    <Label>Select Time</Label>
                    <Grid
                        style={{ maxHeight: "290px", overflowY: "scroll" }}
                        justify="space-between"
                        lg={4}
                        spacing={10}
                    >
                        {getAllTime().map((t, i) => (
                            <TimeColumn key={i}
                                selected={times.includes(t)}
                                onClick={(e) => {
                                    // times.includes(t) ? console.log('') : setFormData({ ...formData, times: [...times, times] })
                                    times.includes(t) ? setFormData({ ...formData, times: times.filter(item => item != t) }) : setFormData({ ...formData, times: [...times, t] }); console.log(formData);
                                }}
                            >
                                {t}
                            </TimeColumn>
                        ))}
                    </Grid>
                </InputDiv>
                <InputDiv>
                    <Button style={{ margin: '10px 0px', marginLeft: 'auto' }} green >Save</Button>
                </InputDiv>
            </Form>
        </>
    )
}





function ShowSchedule({ selectedTime, getDoctors, doctors, setSelectedTime }) {
    const [doctor, setDoctor] = useState(null);
    useEffect(async () => {
        setDoctor(await doctors.find(d => d.id === selectedTime))
        console.log(doctors);
        console.log(selectedTime);
        console.log(doctor?.doctor_schedule);
    }, [selectedTime, doctors]);

    function convertStrToTimeList(str) {
        return str.replaceAll("'", '').replaceAll("[", "").replaceAll("]", '').split(',').map(t => t + ', ')
    }

    const dispatch = useDispatch()
    const clearTime = async (tid) => {
        if (window.confirm('Are you sure you want to clear time?')) {
            try {
                const res = await axios.delete(`${process.env.REACT_APP_API_URL}api/schedule-doctor/${tid}/`)
                console.log(res)
                if (res.status === 200) {
                    dispatch(alert('Doctor Time Cleared', 'success'))
                    getDoctors()
                }
            } catch (error) {

                dispatch(alert('Failed to clear doctor time', 'danger'))

                console.log(error.response)
            }
        }
    }

    return (
        <TimeScheduleWrap  >
            {
                doctor?.doctor_schedule?.map(time => (
                    <TimeSchedule>
                        <Button onClick={e => clearTime(time.id)} danger sm block style={{ margin: '5px 0px' }}>Clear </Button>
                        <Date>{time.date}</Date>
                        <Times>
                            {
                                convertStrToTimeList(time.time).map((t, i) => (
                                    <Time>{t}</Time>
                                ))
                            }
                        </Times>
                    </TimeSchedule>
                ))
            }

        </TimeScheduleWrap>
    );
}
