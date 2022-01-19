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


export default function Schedule() {
    const [doctors, setDoctors] = useState([])
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
    useEffect(() => {
        getDoctors()
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
         
        try {
            const res = await axios.patch(`${process.env.REACT_APP_API_URL}api/doctors/${id}/`, {
                startTime: null,
                endTime: null
            })
            if (res.status === 200) {
                getDoctors()
            }
        } catch (error) {

        }
    }
    
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
                        <Th>StartTime - EndTime</Th>
                        <Th>Actions</Th>
                    </Tr>
                    {
                        doctors.map((doctor, i) => (
                            <Tr key={doctor.id}>

                                <Td>{doctor.id}</Td>
                                <Td>{doctor.name}</Td>
                                <Td>{doctor.speciality}</Td>
                                <Td>{doctor.qualification}</Td>
                                <Td>{getProperTime(doctor.startTime)} - {getProperTime(doctor.endTime)}</Td>
                                <Td>
                                    <Actions>
                                        <Button onClick={e => { setShowTimeEditForm(true); setDoctorId(doctor.id) }} sm green>Edit Time</Button>
                                        <Button onClick={e => {  clearTime(doctor.id) }} sm >Clear Time</Button>

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
        </>
    );
}



function ScheduleTime({ getDoctors, setShowTimeEditForm, doctorId }) {
    const [formData, setFormData] = useState({
        startTime: "",
        endTime: "",
    })
    const { startTime, endTime } = formData
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })
    const dispatch = useDispatch()
    const onSubmit = async e => {
        console.log(formData)
        e.preventDefault()
        try {
            
            const res = await axios.patch(`${process.env.REACT_APP_API_URL}api/doctors/${doctorId}/`, formData, )
            console.log(res)
            if (res.status === 200) {
                dispatch(alert('Doctor Time Updated', 'success'))
                setShowTimeEditForm(false)
                getDoctors()
            }
        } catch (error) {

            dispatch(alert('Failed to update doctor time', 'danger'))

            console.log(error.response)
        }
    }
    return (
        <>
            <Form onSubmit={onSubmit}>
                <InputDiv>
                    <Label>Start Time *</Label>
                    <Input name="startTime" onChange={onChange} type='time' required placeholder="Start Time" value={startTime} />

                </InputDiv>
                <InputDiv>
                    <Label>End Time *</Label>
                    <Input required name="endTime" type="time" placeholder="Start Time" onChange={onChange} value={endTime} />
                </InputDiv>

                <InputDiv>
                    <Button style={{ margin: '10px 0px', marginLeft: 'auto' }} green >Save</Button>
                </InputDiv>
            </Form>
        </>
    )
}
