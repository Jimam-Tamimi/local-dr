import React, {  useState } from "react";
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
import Dropzone from 'react-dropzone'
import {useCallback} from 'react'
import { setProgress } from "../../redux/progress/actions";

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
  useEffect( async () => {
    dispatch(setProgress(15))
    await getDoctors()
    dispatch(setProgress(100))
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
    dispatch(setProgress(15))

    try {
      const res = await axios.delete(`${process.env.REACT_APP_API_URL}api/doctors/${id}/`)
      dispatch(setProgress(45))
      if (res.status === 204) {
        dispatch(alert("Doctor deleted successfully", "success"))
        await getDoctors()
      dispatch(setProgress(85))
      }
    } catch (err) {

      dispatch(alert("Failed to delete this Doctor", "danger"))

    }
    dispatch(setProgress(100))
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
            <Th>Consultation Fee</Th>
            <Th>Action</Th>
          </Tr>
          {
            doctors.map((doctor, i) => (
              <Tr key={doctor.id}>

                <Td>{doctor.id}</Td>
                <Td img={true}> <div> {doctor.hospital.image&& <img src={`${process.env.REACT_APP_MEDIA_URL}${doctor.hospital.image}`} /> } {doctor.hospital.name} </div></Td>
                <Td img={true}> <div> { doctor.image && <img src={doctor.image} />} {doctor.name}</div></Td>
                <Td>{doctor.speciality}</Td>
                <Td>{doctor.qualification}</Td>
                <Td>{doctor.consultation_fee}</Td>
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
    consultation_fee: 0
  })
  const [doctorHospitalId, setDoctorHospitalId] = useState(null)
  const { id, name, speciality, qualification, consultation_fee } = formData;
  const [profImage, setProfImage] = useState(null)
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async e => {
    dispatch(setProgress(15))

    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append('name', name);
      formData.append('speciality', speciality);
      formData.append('qualification', qualification);
      formData.append('hospital', doctorHospitalId);
      formData.append('image', profImage);
      formData.append('consultation_fee', consultation_fee);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
                    
        }
      }  
    dispatch(setProgress(35))

      const res = await axios.post(`${process.env.REACT_APP_API_URL}api/doctors/`, formData,  config);
    dispatch(setProgress(75))
      
      if (res.status === 201) {
        dispatch(alert('Doctor added successfully', 'success'))
        setShowDoctorForm(false)
        getDoctors()
        // setFormData({
        //   name: "",
        //   speciality: "",
        //   qualification: "",
        // })
    dispatch(setProgress(85))


      }
    } catch (error) { 

      for (const err in error.response.data) {
        dispatch(alert(`${err}: ${error.response.data[err]}`, 'danger'))
      }
    }
    dispatch(setProgress(100  ))
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
          <Label>Consultation Fee *</Label>
          <Input required name="consultation_fee"   step="any" type="number" placeholder="Consultation Fee" onChange={onChange} />
        </InputDiv>
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
    consultation_fee: 0
  })
  const [doctorHospitalId, setDoctorHospitalId] = useState(null)
  const [hospitalName, setHospitalName] = useState('')

  const [profImage, setProfImage] = useState(null)


  const { name, speciality, qualification, consultation_fee } = formData;
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async e => {
    e.preventDefault();
    dispatch(setProgress(15))
    try {
      let formData = new FormData();
      formData.append('name', name);
      formData.append('speciality', speciality);
      formData.append('qualification', qualification);
      formData.append('hospital', doctorHospitalId);
      formData.append('consultation_fee', consultation_fee);
      if(profImage){
        formData.append('image', profImage);
      }

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
                    
        }
      }  
    dispatch(setProgress(25))
      const res = await axios.put(`${process.env.REACT_APP_API_URL}api/doctors/${doctorId}/`, formData,  config);
      if (res.status === 200) {
        dispatch(alert('Doctor Updated successfully', 'success'))
        setShowEditForm(false)
        await getDoctors()
    dispatch(setProgress(65))


      }
    } catch (error) {
      for (const err in error.response.data) {
        dispatch(alert(`${err}: ${error.response.data[err]}`, 'danger'))
      }
    }
    dispatch(setProgress(100))
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

  useEffect( async () => {
    dispatch(setProgress(15))
    if (doctorId !== null) {
      await axios.get(`${process.env.REACT_APP_API_URL}api/doctors/${doctorId}/`).then(res => {
    dispatch(setProgress(75))

        setFormData({ ...formData, name: res.data.name, speciality: res.data.speciality, qualification: res.data.qualification, consultation_fee: res.data.consultation_fee })
        setDoctorHospitalId(res.data.hospital.id)
        setHospitalName(res.data.hospital.name)
        console.log(res)
    dispatch(setProgress(85))
      }).catch(err => {
        console.log(err)
      })
    }
    dispatch(setProgress(100))
  }, [doctorId])
  useEffect(() => {
    console.log(formData)
    console.log(hospitalName)

  }, [formData])

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
          <Label>Consultation Fee *</Label>
          <Input required name="consultation_fee"  step="any"  type="text" placeholder="Consultation Fee" onChange={onChange} value={consultation_fee} />
        </InputDiv>
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
        <InputDiv>
          <Button style={{ margin: '10px 0px', marginLeft: 'auto' }} green >Add</Button>
        </InputDiv>
      </Form>
    </>
  )
} 
