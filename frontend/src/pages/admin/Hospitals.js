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
import {useCallback} from 'react'
import { setProgress } from "../../redux/progress/actions";
 


export default function Hospitals() {
  const [hospitals, setHospitals] = useState([])
  const [showEditForm, setShowEditForm] = useState(false)
  const [hospitalId, setHospitalId] = useState(null)
  // get hospital data t  rough api
  const dispatch = useDispatch()
  const getHospitals = () => {
    // axios.get(`${process.env.REACT_APP_API_URL}api/hospitals/?deactivated=false`).then((res) => {
    axios.get(`${process.env.REACT_APP_API_URL}api/hospitals/?deactivated=false`).then((res) => {
      setHospitals(res.data)
    }).catch((err) => {
      dispatch(alert(err.response.data.error, "danger"))
      console.log(err)
    })
  }
  useEffect( async () => {
     dispatch(setProgress(30))
    await getHospitals()
    dispatch(setProgress(100))
  }, [])
  const filterHospitals = async e => {

    const search = e.target.value
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}api/hospitals/?search=${search}&?deactivated=false`)

      if (res.status === 200) {
        setHospitals(res.data)

      }
    } catch (err) {

    }

  }


  const deactivateHospital = async id => {
    dispatch(setProgress(10))
    try {

      const res = await axios.patch(`${process.env.REACT_APP_API_URL}api/hospitals/${id}/`, {deactivated:true})
    dispatch(setProgress(75))
      
      if (res.status === 200) {
        dispatch(alert("Hospital deactivated successfully", "success"))
        getHospitals()
    dispatch(setProgress(85))

      }
    } catch (err) {      
      dispatch(alert("Failed to deactivate this hospital", "danger"))

    }
    dispatch(setProgress(100))

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
              <Tr key={i}>

                <Td>{hospital.id}</Td> 
                <Td img={true}> <div> { hospital.image && <img src={hospital.image} />} {hospital.name}</div></Td>

                <Td>{hospital.email}</Td>
                <Td>{hospital.contact}</Td>
                <Td>{hospital.contact_person}</Td>
                <Td>{hospital.price}</Td>
                <Td>
                  <Actions>
                    <Button onClick={e => { setHospitalId(hospital.id); setShowEditForm(true) }} sm green>Edit</Button> 
                    <Button onClick={e => window.confirm(`Are you sure you want to deactivate ${hospital.name}`) ? deactivateHospital(hospital.id) : ''} sm style={{ background: "#ff3b00", color: "white" }}>
                      Deactivate
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
  const [profImage, setProfImage] = useState(null)

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
      setFormData({...formData , locationName: autoComplete?.getPlace()?.formatted_address});

    } catch {

    }
  }

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    contact: "",
    contact_person: "",
    location: "",
    locationName: "",

  })
  const { name, email, password, contact, contact_person, location, price, locationName } = formData;
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  useEffect(() => {
    setFormData({ ...formData, location: JSON.stringify(mark) })
  }, [mark])
  const onSubmit = async e => {
    dispatch(setProgress(10))

    e.preventDefault();
    try { 
      let formDataV = new FormData();
      formDataV.append('name', name);
      formDataV.append('email', email);
      formDataV.append('password', password);
      formDataV.append('contact', contact);
      formDataV.append('contact_person', contact_person);
      formDataV.append('location', JSON.stringify(mark));
      formDataV.append('price', price);
      formDataV.append('image', profImage);
      formDataV.append('locationName', locationName);


      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
                    
        }
      }  
    dispatch(setProgress(30))
      const res = await axios.post(`${process.env.REACT_APP_API_URL}api/hospitals/`, formDataV, config);
      if (res.status === 201) {
        setFormData({
          ...formData,
          id: "",
          name: "",
          email: "",
          password: "",
          contact: "",
          contact_person: "",
          location: "",
          locationName: "",

          price: '',
        })
        dispatch(alert('Hospital added successfully', 'success'))
        setShowHospitalForm(false)
        getHospitals()
      dispatch(setProgress(75))

      }
    } catch (error) {
      console.log(error?.response);
      
      for (const err in error.response.data) {
        dispatch(alert(`${err}: ${error.response.data[err]}`, 'danger'))
      }
    }
    dispatch(setProgress(100))

  }

  
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
      // Do whatever you want with the file contents
        const binaryStr = reader.result
        console.log(binaryStr)
        setProfImage(file)
      } 
      reader.readAsArrayBuffer(file)
    })
    
    
  }, [])
  
  return (
    <>


      <Form onSubmit={onSubmit}>
        <InputDiv>
          <Label>Name *</Label>
          <Input required onChange={onChange} name="name" placeholder="Name"  value={name}/>
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
          <Label>Contact *</Label>
          <Input required name="contact" type="tel" placeholder="Contact" onChange={onChange} value={contact} />
        </InputDiv>
        <InputDiv>
          <Label>Contact Person *</Label>
          <Input required name="contact_person" type="text" placeholder="Contact Person" onChange={onChange} value={contact_person} />
        </InputDiv>
        <InputDiv>
          <Label>Price *</Label>
          <Input required name="price" type="number" placeholder="Contact Person" onChange={onChange} value={price} />
        </InputDiv>
        <InputDivW   >
        <InputDiv   >
          <Label>Profile Image *</Label>
          <Dropzone onDrop={acceptedFiles => onDrop(acceptedFiles)}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
              </section>
            )}
          </Dropzone>        </InputDiv>

          <Autocomplete onLoad={autoC => setAutoComplete(autoC)} onPlaceChanged={onPlaceChanged}>
            <>
              <Label htmlFor="places">Hospital Location</Label>
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
      setFormData({...formData , locationName: autoComplete?.getPlace()?.formatted_address});
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
    locationName: "",
    price: '',
  })
  const getHospitalData = async (id) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}api/hospitals/${id}/`)
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
  const { name, email, password, contact, contact_person, location, price, locationName } = formData;
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  useEffect( async () => {
    if (hospitalId !== null) {
      await getHospitalData(hospitalId)
    }
  }, [hospitalId])
  useEffect(() => {
    setFormData({ ...formData, location: JSON.stringify(mark) })
  }, [mark])

  const onSubmit = async e => {
    e.preventDefault()
    dispatch(setProgress(15))
    try {
      let formData = new FormData();
      formData.append('name', name);  
      formData.append('email', email);
      formData.append('password', password);
      formData.append('contact', contact);
      formData.append('contact_person', contact_person);
      formData.append('location', JSON.stringify(mark));
      formData.append('price', price);
      formData.append('location_name', locationName);
      if(profImage){
        formData.append('image', profImage);
      }



      const config = {
        headers: {
          // 'Content-Type': 'multipart/form-data'
                    
        }
      }  
    dispatch(setProgress(25))

      const res = await axios.put(`${process.env.REACT_APP_API_URL}api/hospitals/${hospitalId}/`, formData)
      console.log(res);
      dispatch(setProgress(65))
      if (res.status === 200) {
        dispatch(alert('Hospital updated successfully', 'success'))
        setShowEditForm(false)
        getHospitals()
 
      }
    } catch (error) {
      console.log(error.response);
      dispatch(alert('Failed to update hospital', 'danger'))

    }

    dispatch(setProgress(100))  

    
  }


  const [profImage, setProfImage] = useState(null)

  
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
      // Do whatever you want with the file contents
        const binaryStr = reader.result
        console.log(binaryStr)
        setProfImage(file)
      }
      reader.readAsArrayBuffer(file)
    })
    
  }, [])
   
  

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
          <Label>Password *</Label>
          <Input required name="password" type="text" value={password} placeholder="Password" onChange={onChange} />
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

        <InputDiv   >
          <Label>Profile Image *</Label>
          <Dropzone onDrop={acceptedFiles => onDrop(acceptedFiles)}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
              </section>
            )}
          </Dropzone>        </InputDiv>

          <Autocomplete onLoad={autoC => {setAutoComplete(autoC)}} onPlaceChanged={onPlaceChanged}>
            <>
              <Label htmlFor="add-number">Hospital Location *</Label>
              <Input
                id="places"
                placeholder="Search Places..."
                type="text"
                onKeyDown={e => { if (e.keyCode === 13) { e.preventDefault() } else { return true } }}
                value={locationName}
                onChange={onChange}
                name="locationName"
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

 