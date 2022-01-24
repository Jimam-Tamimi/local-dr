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
import { Input, InputDiv, Label } from "../../styles/admin/Forms.styles";
import Map from '../../components/Map/Map';
import Marker from "react-google-maps/lib/components/Marker";
import { Autocomplete } from '@react-google-maps/api'
import { useEffect } from "react";
import axios from "axios";
import alert from '../../redux/alert/actions'
import { useDispatch } from 'react-redux'
import Dropzone from 'react-dropzone'
import { useCallback } from 'react'
import { setProgress } from "../../redux/progress/actions";



export default function Staff() {
  const [showEditForm, setShowEditForm] = useState(false)
  const [staff, setStaff] = useState([]);
  const [showStaffForm, setShowStaffForm] = useState(false);
  const [staffId, setStaffId] = useState(null);
  // get hospital data t  rough api
  const dispatch = useDispatch()
  const getStaff = async () => {
    // axios.get(`${process.env.REACT_APP_API_URL}api/hospitals/?deactivated=false`).then((res) => {
    await axios.get(`${process.env.REACT_APP_API_URL}api/staff/`).then((res) => {
      setStaff(res.data)

    }).catch((err) => {
      dispatch(alert(err.response.data.error, "danger"))
      console.log(err)
    })

  }
  useEffect( async () => {
    dispatch(setProgress(20))
    await getStaff()
    dispatch(setProgress(100))
  }, [])
  const filterStaff = async e => {
    const search = e.target.value
    try {

      const res = await axios.get(`${process.env.REACT_APP_API_URL}api/staff/?search=${search}`)
      if (res.status === 200) {
        setStaff(res.data)
      }
    } catch (err) {

    }
  }


  const deleteStaff = async id => {
    dispatch(setProgress(10))

    try {
      const res = await axios.delete(`${process.env.REACT_APP_API_URL}api/staff/${id}/`)
      dispatch(setProgress(70))

      if (res.status === 204) {
        dispatch(alert("Staff deleted successfully", "success"))
        getStaff()
        dispatch(setProgress(80))

      }
    } catch (err) {
      dispatch(alert("Failed to deleted this staff", "danger"))

    }
    dispatch(setProgress(100))

  }


  return (
    <>
      <Grid style={{ border: "1px solid #eff2f7" }}>
        <HeadingColumn justify="space-between">
          <h1>All Staff</h1>
          <Button onClick={e => setShowStaffForm(!showStaffForm)} green sm>
            {" "}
            <FaPlusCircle /> Add Staff
          </Button>
        </HeadingColumn>
      </Grid>
      <Grid style={{ overflowX: "scroll" }} direction="column">
        <OptionsColumn justify="flex-end" style={{ margin: "10px 0px" }}>
          <Search onChange={filterStaff} type="text" placeholder="Search..." />
        </OptionsColumn>
        <Table>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Country</Th>
            <Th>Actions</Th>
          </Tr>
          {
            staff.map((staff, i) => (
              <Tr key={i}>

                <Td>{staff?.id}</Td>
                {/* <Td img={true}> <div> { staff.image && <img src={hospital.image} />} {hospital.name}</div></Td> */}

                <Td>{staff?.name}</Td>
                <Td>{staff?.email}</Td>
                <Td>{staff?.country}</Td>
                <Td>
                  <Actions>
                    <Button onClick={e => { setStaffId(staff?.id); setShowEditForm(true) }} sm green>Edit</Button>
                    <Button onClick={e => window.confirm(`Are you sure you want to deactivate ${staff?.name}`) ? deleteStaff(staff?.id) : ''} sm style={{ background: "#ff3b00", color: "white" }}>
                      Delete
                    </Button>
                  </Actions>
                </Td>
              </Tr>
            ))
          }


        </Table>
      </Grid>

      <Modal style={{ alignItems: "flex-start" }} zoom show={showStaffForm} setShow={setShowStaffForm}>
        <HospitalsForm getStaff={getStaff} setShowStaffForm={setShowStaffForm} />
      </Modal>
      <Modal style={{ alignItems: "flex-start" }} zoom show={showEditForm} setShow={setShowEditForm}  >
        <SetShowEditForm staffId={staffId} getStaff={getStaff} setShowEditForm={setShowEditForm} />

      </Modal>
    </>
  );
}



function HospitalsForm({ setShowStaffForm, getStaff }) {

  const dispatch = useDispatch()


  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    country: "",
    password: ""

  })
  const { name, email, password, country } = formData;
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    dispatch(setProgress(10))
    try {


      dispatch(setProgress(20))

      const res = await axios.post(`${process.env.REACT_APP_API_URL}api/staff/`, formData);
      dispatch(setProgress(80))

      if (res.status === 201) {
        setFormData({
          ...formData,
          id: "",
          name: "",
          email: "",
          country: "",
          password: ""

        })
        dispatch(alert('Hospital added successfully', 'success'))
      dispatch(setProgress(90))

        setShowStaffForm(false)
        getStaff()
      }
    } catch (error) {
      console.log(error?.response);

      for (const err in error.response.data) {
        dispatch(alert(`${err}: ${error.response.data[err]}`, 'danger'))
      }
    }
    dispatch(setProgress(100))

  }




  return (
    <>


      <Form onSubmit={onSubmit}>
        <InputDiv>
          <Label>Name *</Label>
          <Input required onChange={onChange} name="name" placeholder="Name" value={name} />
        </InputDiv>
        <InputDiv>
          <Label>Email *</Label>
          <Input required name="email" type="email" placeholder="Email" onChange={onChange} value={email} />
        </InputDiv>
        <InputDiv>
          <Label>Password *</Label>
          <Input required name="password" type="password" placeholder="Password" onChange={onChange} value={password} />
        </InputDiv>
        <InputDiv>
          <Label>Country *</Label>
          <Input required name="country" type="text" placeholder="Country" onChange={onChange} value={country} />
        </InputDiv>

        <InputDiv>
          <Button style={{ margin: '10px 0px', marginLeft: 'auto' }} green >Create</Button>
        </InputDiv>
      </Form>
    </>
  )
}

function SetShowEditForm({ staffId, getStaff, setShowEditForm }) {
 
  const dispatch = useDispatch()

  
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    country: "",
    password: ""
  })
  const getStaffData = async (id) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}api/staff/${id}/`)
      if (res.status === 200) {
        setFormData(res.data) 
      }
    }
    catch (error) {
      dispatch(alert('Error getting hospital data', 'danger'))
    }
  }
  const { name, email, password, country } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
    if (staffId !== null) {
      getStaffData(staffId)
    }
  }, [staffId]) 

  const onSubmit = async e => {
    dispatch(setProgress(10))

    e.preventDefault()
    try { 
    dispatch(setProgress(20))


      const res = await axios.put(`${process.env.REACT_APP_API_URL}api/staff/${staffId}/`, formData)
      console.log(res);
      if (res.status === 200) {
        dispatch(alert('Staff updated successfully', 'success'))
        setShowEditForm(false)
        getStaff()
    dispatch(setProgress(75))


      }
    } catch (error) {
      console.log(error.response);
      dispatch(alert('Failed to update staff', 'danger'))

    }
    dispatch(setProgress(100))

  }

 


  return (
    <>

      <Form onSubmit={onSubmit}>
        <InputDiv>
          <Label>Name *</Label>
          <Input required onChange={onChange} name="name" placeholder="Name" value={name} />
        </InputDiv>
        <InputDiv>
          <Label>Email *</Label>
          <Input required name="email" type="email" placeholder="Email" onChange={onChange} value={email} autoComplete="false" />
        </InputDiv>
        <InputDiv>
          <Label>Password *</Label>
          <Input required name="password" type="text" placeholder="Password" onChange={onChange} value={password} />
        </InputDiv>
        <InputDiv>
          <Label>Country *</Label>
          <Input required name="country" type="text" placeholder="Country" onChange={onChange} value={country} />
        </InputDiv>

        <InputDiv>
          <Button style={{ margin: '10px 0px', marginLeft: 'auto' }} green >Update</Button>
        </InputDiv>
      </Form>
    </>
  )
}

