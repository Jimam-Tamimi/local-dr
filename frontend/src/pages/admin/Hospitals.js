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


export default function Hospitals() {
  const [hospitals, setHospitals] = useState([])
  const [showEditForm, setShowEditForm] = useState(false)
  const [hospitalId, setHospitalId] = useState(null)
  // get hospital data t  rough api
  const dispatch = useDispatch()
  const getHospitals = () => {
    axios.get(`${process.env.REACT_APP_API_URL}api/hospitals/`).then((res) => {
      setHospitals(res.data)
    }).catch((err) => {
      dispatch(alert(err.response.data.error, "danger"))
      console.log(err)
    })
  }
  useEffect(() => {
    getHospitals()
  }, [])
  const filterHospitals = async e => {
    const search = e.target.value
    try {

      const res = await axios.get(`${process.env.REACT_APP_API_URL}api/hospitals/?search=${search}`)
      if (res.status === 200) {
        setHospitals(res.data)
      }
    } catch (err) {

    }
  }


  const deleteHospital = async id => {
    try {
      const res = await axios.delete(`${process.env.REACT_APP_API_URL}api/hospitals/${id}/`)
      if (res.status === 204) {
        dispatch(alert("Hospital deleted successfully", "success"))
        getHospitals()
      }
    } catch (err) {

      dispatch(alert("Failed to delete this hospital", "danger"))

    }
  }


  const [showHospitalForm, setShowHospitalForm] = useState(false)
  return (
    <>
      <Grid style={{ border: "1px solid #eff2f7" }}>
        <HeadingColumn justify="space-between">
          <h1>All Hospitals</h1>
          <Button onClick={e => setShowHospitalForm(!showHospitalForm)} green sm>
            {" "}
            <FaPlusCircle /> Add Hospital
          </Button>
        </HeadingColumn>
      </Grid>
      <Grid style={{ overflowX: "scroll" }} direction="column">
        <OptionsColumn justify="flex-end" style={{ margin: "10px 0px" }}>
          <Search onChange={filterHospitals} type="text" placeholder="Search..." />
        </OptionsColumn>
        <Table>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Contact</Th>
            <Th>Contact Person</Th>
            <Th>Price</Th>
            <Th>Actions</Th>
          </Tr>
          {
            hospitals.map((hospital, i) => (
              <Tr key={hospital.id}>

                <Td>{hospital.id}</Td>
                <Td>{hospital.name}</Td>
                <Td>{hospital.email}</Td>
                <Td>{hospital.contact}</Td>
                <Td>{hospital.contact_person}</Td>
                <Td>{hospital.price}</Td>
                <Td>
                  <Actions>
                    <Button onClick={e => { setHospitalId(hospital.id); setShowEditForm(true) }} sm green>Edit</Button> 
                    <Button onClick={e => window.confirm(`Are you sure you want to delete ${hospital.name}`) ? deleteHospital(hospital.id) : ''} sm style={{ background: "#ff3b00", color: "white" }}>
                      Delete
                    </Button>
                  </Actions>
                </Td>
              </Tr>
            ))
          }


        </Table>
      </Grid>

      <Modal style={{ alignItems: "flex-start" }} zoom show={showHospitalForm} setShow={setShowHospitalForm}>
        <HospitalsForm getHospitals={getHospitals} setShowHospitalForm={setShowHospitalForm} />
      </Modal>
      <Modal style={{ alignItems: "flex-start" }} zoom show={showEditForm} setShow={setShowEditForm}  >
        <SetShowEditForm hospitalId={hospitalId} getHospitals={getHospitals} setShowEditForm={setShowEditForm} />

      </Modal> 
    </>
  );
}



function HospitalsForm({ setShowHospitalForm, getHospitals }) {
  const [coords, setCoords] = useState({ lat: 0, lng: 0 })
  const [mark, setMark] = useState({ lat: 0, lng: 0 })
  const [autoComplete, setAutoComplete] = useState(null)
  function setCurrentLocation() {

    navigator.geolocation.getCurrentPosition((location) => {
      setCoords({ lat: location.coords.latitude, lng: location.coords.longitude })
      setMark({ lat: location.coords.latitude, lng: location.coords.longitude })
    }, () => console.log('error :)'), { timeout: 10000 })
  }
  useEffect(() => {
    setCurrentLocation()
  }, [])
  const dispatch = useDispatch()
  const onPlaceChanged = () => {
    try {
      const lat = autoComplete.getPlace().geometry.location.lat();
      const lng = autoComplete.getPlace().geometry.location.lng();
      setMark({ lat, lng })
      setCoords({ lat, lng })
    } catch {

    }
  }

  const [formData, setFormData] = useState({
    // fields = ['id', 'name', 'email', 'password', 'contact', 'contact_person', 'location']
    id: "",
    name: "",
    email: "",
    password: "",
    contact: "",
    contact_person: "",
    location: "",
  })
  const { name, email, password, contact, contact_person, location, price } = formData;
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  useEffect(() => {
    setFormData({ ...formData, location: JSON.stringify(mark) })
  }, [mark])
  const onSubmit = async e => {
    e.preventDefault();
    try {
      const { access, refresh } = JSON.parse(localStorage.getItem('auth'))
      const config = {
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `JWT ${access}`
        }
      }
      const res = await axios.post(`${process.env.REACT_APP_API_URL}api/hospitals/`, formData, config);
      if (res.status === 201) {
        dispatch(alert('Hospital added successfully', 'success'))
        setShowHospitalForm(false)
        getHospitals()

      }
    } catch (error) {
      for (const err in error.response.data) {
        dispatch(alert(`${err}: ${error.response.data[err]}`, 'danger'))
      }
    }
  }
  return (
    <>


      <Form onSubmit={onSubmit}>
        <InputDiv>
          <Label>Name *</Label>
          <Input required onChange={onChange} name="name" placeholder="Name" />
        </InputDiv>
        <InputDiv>
          <Label>Email *</Label>
          <Input required name="email" type="email" placeholder="Email" onChange={onChange} />
        </InputDiv>
        <InputDiv>
          <Label>Password *</Label>
          <Input required name="password" type="password" placeholder="Password" onChange={onChange} />
        </InputDiv>
        <InputDiv>
          <Label>Contact *</Label>
          <Input required name="contact" type="tel" placeholder="Contact" onChange={onChange} />
        </InputDiv>
        <InputDiv>
          <Label>Contact Person *</Label>
          <Input required name="contact_person" type="text" placeholder="Contact Person" onChange={onChange} />
        </InputDiv>
        <InputDiv>
          <Label>Price *</Label>
          <Input required name="price" type="number" placeholder="Contact Person" onChange={onChange} />
        </InputDiv>
        <InputDivW   >

          <Autocomplete onLoad={autoC => setAutoComplete(autoC)} onPlaceChanged={onPlaceChanged}>
            <>
              <Label htmlFor="add-number">Where do you need blood? *</Label>
              <Input
                id="places"
                placeholder="Search Places..."
                type="text"
                onKeyDown={e => { if (e.keyCode === 13) { e.preventDefault() } else { return true } }}
              />
            </>
          </Autocomplete>
        </InputDivW>
        <InputDiv style={{ boxShadow: "0px 0px 15px 2px var(--main-box-shadow-color)" }} height="400px">

          <Map
            coords={coords}
            // isMarkerShown
            googleMapURL=" "
            loadingElement={<div style={{ height: `400px`, width: '100%' }} />}
            containerElement={<div style={{ height: `400px`, width: '100%' }} />}
            mapElement={<div style={{ height: `400px`, width: '100%' }} />}
            setCoords={setCoords}
            setMark={setMark}
            click={e => setMark({ lat: e.latLng.lat(), lng: e.latLng.lng() })}
            defaultZoom={17}
          >
            {
              mark ? <Marker key={0}
                position={mark}
              /> : ''
            }
          </Map>


        </InputDiv>
        <InputDiv>
          <Button style={{ margin: '10px 0px', marginLeft: 'auto' }} green >Create</Button>
        </InputDiv>
      </Form>
    </>
  )
} 

function SetShowEditForm({ hospitalId, getHospitals, setShowEditForm }) {

  const [coords, setCoords] = useState({ lat: 0, lng: 0 })
  const [mark, setMark] = useState({ lat: 0, lng: 0 })
  const [autoComplete, setAutoComplete] = useState(null)
  const dispatch = useDispatch()

  function setCurrentLocation() {

    navigator.geolocation.getCurrentPosition((location) => {
      setCoords({ lat: location.coords.latitude, lng: location.coords.longitude })
      setMark({ lat: location.coords.latitude, lng: location.coords.longitude })
    }, () => console.log('error :)'), { timeout: 10000 })
  }

  const onPlaceChanged = () => {
    try {
      const lat = autoComplete.getPlace().geometry.location.lat();
      const lng = autoComplete.getPlace().geometry.location.lng();
      setMark({ lat, lng })
      setCoords({ lat, lng })
    } catch {

    }
  }

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    contact_person: "",
    location: "",
    price: '',
  })
  const getHospitalData = async (id) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}api/hospitals/${id}`)
      if (res.status === 200) {
        setFormData(res.data)
        setCoords(JSON.parse(res.data.location))
        setMark(JSON.parse(res.data.location))
      }
    }
    catch (error) {
      dispatch(alert('Error getting hospital data', 'danger'))
    }
  }
  const { name, email, password, contact, contact_person, location, price } = formData;
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
    if (hospitalId !== null) {
      getHospitalData(hospitalId)
    }
  }, [hospitalId])
  useEffect(() => {
    setFormData({ ...formData, location: JSON.stringify(mark) })
  }, [mark])

  const onSubmit = async e => {
    e.preventDefault()
    try {

      const res = await axios.put(`${process.env.REACT_APP_API_URL}api/hospitals/${hospitalId}/`, formData)
      if (res.status === 200) {
        dispatch(alert('Hospital updated successfully', 'success'))
        setShowEditForm(false)
        getHospitals()
      }
    } catch (error) {
      dispatch(alert('Failed to update hospital', 'danger'))

    }
  }

  return (
    <>


      <Form onSubmit={onSubmit}>
        <InputDiv>
          <Label>Name *</Label>
          <Input required onChange={onChange} value={name} name="name" placeholder="Name" />
        </InputDiv>
        <InputDiv>
          <Label>Email *</Label>
          <Input required name="email" type="email" value={email} placeholder="Email" onChange={onChange} />
        </InputDiv>
        <InputDiv>
          <Label>Contact *</Label>
          <Input required name="contact" type="tel" value={contact} placeholder="Contact" onChange={onChange} />
        </InputDiv>
        <InputDiv>
          <Label>Contact Person *</Label>
          <Input required name="contact_person" type="text" value={contact_person} placeholder="Contact Person" onChange={onChange} />
        </InputDiv>
        <InputDiv>
          <Label>Price *</Label>
          <Input required name="price" type="number" value={price} placeholder="Price" onChange={onChange} />
        </InputDiv>
        <InputDivW   >

          <Autocomplete onLoad={autoC => setAutoComplete(autoC)} onPlaceChanged={onPlaceChanged}>
            <>
              <Label htmlFor="add-number">Where do you need blood? *</Label>
              <Input
                id="places"
                placeholder="Search Places..."
                type="text"
                onKeyDown={e => { if (e.keyCode === 13) { e.preventDefault() } else { return true } }}
              />
            </>
          </Autocomplete>
        </InputDivW>
        <InputDiv style={{ boxShadow: "0px 0px 15px 2px var(--main-box-shadow-color)" }} height="400px">

          <Map
            coords={coords}
            // isMarkerShown
            googleMapURL=" "
            loadingElement={<div style={{ height: `400px`, width: '100%' }} />}
            containerElement={<div style={{ height: `400px`, width: '100%' }} />}
            mapElement={<div style={{ height: `400px`, width: '100%' }} />}
            setCoords={setCoords}
            setMark={setMark}
            click={e => setMark({ lat: e.latLng.lat(), lng: e.latLng.lng() })}
            defaultZoom={17}
          >
            {
              mark ? <Marker key={0}
                position={mark}
              /> : ''
            }
          </Map>


        </InputDiv>
        <InputDiv>
          <Button style={{ margin: '10px 0px', marginLeft: 'auto' }} green >Save</Button>
        </InputDiv>
      </Form>
    </>
  )
}

 