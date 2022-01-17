import React, { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { Button, ButtonLink, Column, Grid } from "../../styles/Essentials.styles";
import {
  Actions,
  OptionsColumn,
  Search,
  Table,
  Td,
  Th,
  Tr,
} from "../../styles/Table.styles";
import { Form, HeadingColumn, InputDivW } from "../styles/admin/Hospitals.styles";
import Modal from '../../components/Modal/Modal';
import { DropdownSelect, DropdownSelectWrap, Input, InputDiv, Label } from "../../styles/admin/Forms.styles";
import Map from '../../components/Map/Map';
import Marker from "react-google-maps/lib/components/Marker";
import { Autocomplete } from '@react-google-maps/api'
import { useEffect } from "react";
import axios from "axios";
import alert from '../../redux/alert/actions'
import { useDispatch } from 'react-redux'
import { Select } from "@mobiscroll/react";

export default function Doctors() {

  const [doctors, setDoctors] = useState([])
  const [showEditForm, setShowEditForm] = useState(false)
  const [doctorId, setDoctorId] = useState(null)

 
  
  // get doctors data trough api

  
  
  const dispatch = useDispatch()
  const getDoctors = () => {
    axios.get(`${process.env.REACT_APP_API_URL}api/doctors/`).then((res) => {
      console.log(res)

      setDoctors(res.data)
    }).catch((err) => {
      dispatch(alert(err.response.data.error, "danger"))
    })
  }
  useEffect(() => {
    getDoctors()
  }, [])
  const filterDoctors = async e => {
    const search = e.target.value
    try {

      const res = await axios.get(`${process.env.REACT_APP_API_URL}api/doctors/?search=${search}`)
      if (res.status === 200) {
        setDoctors(res.data)
      }
    } catch (err) {

    }
  }


  const deleteDoctor = async id => {
    try {
      const res = await axios.delete(`${process.env.REACT_APP_API_URL}api/doctors/${id}/`)
      if (res.status === 204) {
        dispatch(alert("Doctor deleted successfully", "success"))
        getDoctors()
      }
    } catch (err) {

      dispatch(alert("Failed to delete this Doctor", "danger"))

    }
  }


  const [showDoctorForm, setShowDoctorForm] = useState(false)



  // editing doctor form

  return (
    <>
      <Grid style={{ border: "1px solid #eff2f7" }}>
        <HeadingColumn justify="space-between">
          <h1>All Doctors</h1>
          <Button onClick={e => setShowDoctorForm(!showDoctorForm)} green sm>
            {" "}
            <FaPlusCircle /> Add DOctor
          </Button>
        </HeadingColumn>
      </Grid>
      <Grid style={{ overflowX: "scroll" }} direction="column">
        <OptionsColumn justify="flex-end" style={{ margin: "10px 0px" }}>
          <Search onChange={filterDoctors} type="text" placeholder="Search..." />
        </OptionsColumn>
        <Table>
          <Tr>
            <Th>ID</Th>
            <Th>Hospital</Th>
            <Th>Name</Th>
            <Th>Speciality</Th>
            <Th>Qualification</Th>
            <Th>Action</Th>
          </Tr>
          {
            doctors.map((doctor, i) => (
              <Tr key={doctor.id}>

                <Td>{doctor.id}</Td>
                <Td>{doctor.hospital.name}</Td>
                <Td>{doctor.name}</Td>
                <Td>{doctor.speciality}</Td>
                <Td>{doctor.qualification}</Td>
                <Td>
                  <Actions>
                    <Button onClick={e => { setDoctorId(doctor.id); setShowEditForm(true) }} sm green>Edit</Button>
                    <Button onClick={e => window.confirm(`Are you sure you want to delete ${doctor.name}`) ? deleteDoctor(doctor.id) : ''} sm style={{ background: "#ff3b00", color: "white" }}>
                      Delete
                    </Button>
                  </Actions>
                </Td>
              </Tr>
            ))
          }


        </Table>
      </Grid>

      <Modal style={{ alignItems: "flex-start" }} zoom show={showDoctorForm} setShow={setShowDoctorForm}>
        <DoctorForm getDoctors={getDoctors} setShowDoctorForm={setShowDoctorForm} />
      </Modal>
      <Modal style={{ alignItems: "flex-start" }} zoom show={showEditForm} setShow={setShowEditForm}>
        <EditDoctorForm doctorId={doctorId} getDoctors={getDoctors} setShowEditForm={setShowEditForm} />
      </Modal>
    </>
  )
}




function DoctorForm({ setShowDoctorForm, getDoctors }) {

  const dispatch = useDispatch()


  const [formData, setFormData] = useState({
    name: "",
    speciality: "",
    qualification: "",
  })
  const [doctorHospitalId, setDoctorHospitalId] = useState(null)
  const { id, name, speciality, qualification } = formData;
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async e => {
    e.preventDefault();
    try {
      let data = { name, speciality, qualification, hospital: doctorHospitalId }
      const res = await axios.post(`${process.env.REACT_APP_API_URL}api/doctors/`, data);
      if (res.status === 201) {
        dispatch(alert('Doctor added successfully', 'success'))
        setShowDoctorForm(false)
        getDoctors()

      }
    } catch (error) {
      for (const err in error.response.data) {
        dispatch(alert(`${err}: ${error.response.data[err]}`, 'danger'))
      }
    }
  }
  const [hospitals, setHospitals] = useState([])
  const getHospitals = async (e) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}api/hospitals/?search=${e.target.value}`)
      console.log(res)
      if (res.status === 200) {
        setHospitals(res.data)
      }
    } catch (err) {

    }
  }

  useEffect(() => {
    console.log(doctorHospitalId)
  }, [doctorHospitalId])

  return (
    <>


      <Form onSubmit={onSubmit}>
        <InputDiv>
          <Label>Hospital Name *</Label>
          <Input onChange={getHospitals} autocomplete="off" type='text' required placeholder="Name" />
          {
            hospitals.length > 0 && (

              <DropdownSelectWrap>
                {
                  hospitals.map((hospital, i) => (
                    <DropdownSelect key={i} onClick={e => { setDoctorHospitalId(hospital.id); e.currentTarget.parentElement.previousSibling.value = hospital.name; setTimeout(() => { setHospitals([]) }, 1); }}>{hospital.name}</DropdownSelect>
                  ))
                }
              </DropdownSelectWrap>
            )
          }
        </InputDiv>
        <InputDiv>
          <Label>Name *</Label>
          <Input name="name" onChange={onChange} type='text' required placeholder="Name" />

        </InputDiv>
        <InputDiv>
          <Label>Speciality *</Label>
          <Input required name="speciality" type="text" placeholder="Speciality" onChange={onChange} />
        </InputDiv>
        <InputDiv>
          <Label>Qualification *</Label>
          <Input required name="qualification" type="text" placeholder="Qualification" onChange={onChange} />
        </InputDiv>

        <InputDiv>
          <Button style={{ margin: '10px 0px', marginLeft: 'auto' }} green >Add</Button>
        </InputDiv>
      </Form>
    </>
  )
}

function EditDoctorForm({ setShowEditForm, getDoctors, doctorId }) {

  const dispatch = useDispatch()


  const [formData, setFormData] = useState({
    name: "",
    speciality: "",
    qualification: "",
  })
  const [doctorHospitalId, setDoctorHospitalId] = useState(null)
  const [hospitalName, setHospitalName] = useState('')



  const { name, speciality, qualification } = formData;
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async e => {
    e.preventDefault();
    try {
      let data = { name, speciality, qualification, hospital: doctorHospitalId }
      const res = await axios.put(`${process.env.REACT_APP_API_URL}api/doctors/${doctorId}/`, data);
      if (res.status === 200) {
        dispatch(alert('Doctor Updated successfully', 'success'))
        setShowEditForm(false)
        getDoctors()

      }
    } catch (error) {
      for (const err in error.response.data) {
        dispatch(alert(`${err}: ${error.response.data[err]}`, 'danger'))
      }
    }
  }
  const [hospitals, setHospitals] = useState([])
  const getHospitals = async (e) => {
    setHospitalName(e.target.value)
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}api/hospitals/?search=${e.target.value}`)
      console.log(res)
      if (res.status === 200) {
        setHospitals(res.data)
        return res.data.name
      }
    } catch (err) {

    }
  }

  useEffect(() => {
    if (doctorId!==null) {  
      axios.get(`${process.env.REACT_APP_API_URL}api/doctors/${doctorId}/`).then(res => {
        setFormData({ ...formData, name: res.data.name, speciality: res.data.speciality, qualification: res.data.qualification })
        setDoctorHospitalId(res.data.hospital.id)
        setHospitalName(res.data.hospital.name)
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  }, [doctorId])
  useEffect(() => {
    console.log(formData)
    console.log(hospitalName)

  }, [formData])
  return (
    <>


      <Form onSubmit={onSubmit}>
        <InputDiv>
          <Label>Hospital Name *</Label>
          <Input value={hospitalName} onChange={getHospitals} autocomplete="off" type='text' required placeholder="Name" />
          {
            hospitals.length > 0 && (

              <DropdownSelectWrap>
                {
                  hospitals.map((hospital, i) => (
                    <DropdownSelect key={i} onClick={e => { setDoctorHospitalId(hospital.id); setHospitalName(hospital.name); setTimeout(() => { setHospitals([]) }, 1); }}>{hospital.name}</DropdownSelect>
                  ))
                }
              </DropdownSelectWrap>
            )
          }
        </InputDiv>
        <InputDiv>
          <Label>Name *</Label>
          <Input name="name" onChange={onChange} type='text' required placeholder="Name" value={name} />

        </InputDiv>
        <InputDiv>
          <Label>Speciality *</Label>
          <Input required name="speciality" type="text" placeholder="Speciality" onChange={onChange} value={speciality} />
        </InputDiv>
        <InputDiv>
          <Label>Qualification *</Label>
          <Input required name="qualification" type="text" placeholder="Qualification" onChange={onChange} value={qualification} />
        </InputDiv>

        <InputDiv>
          <Button style={{ margin: '10px 0px', marginLeft: 'auto' }} green >Add</Button>
        </InputDiv>
      </Form>
    </>
  )
} 