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
import {Autocomplete} from '@react-google-maps/api'
import { useEffect } from "react";
export default function Hospitals() {
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
          <Search type="text" placeholder="Search..." />
        </OptionsColumn>
        <Table>
          <Tr>
            <Th>Title</Th>
            <Th>Email</Th>
            <Th>Address</Th>
            <Th>Phone Number</Th>
            <Th>Actions</Th>
          </Tr>
          <Tr>
            <Td>Alfreds Futterkiste</Td>
            <Td>Maria Anders</Td>
            <Td>Germany</Td>
            <Td>095985834</Td>
            <Td>
              <Actions>
                <Button green>Complete</Button>
                <Button style={{ background: "#ff3b00", color: "white" }}>
                  Delete
                </Button>
              </Actions>
            </Td>
          </Tr> 
          <Tr>
            <Td>Alfreds Futterkiste</Td>
            <Td>Maria Anders</Td>
            <Td>Germany</Td>
            <Td>095985834</Td>
            <Td>
              <Actions>
                <Button green>Complete</Button>
                <Button style={{ background: "#ff3b00", color: "white" }}>
                  Delete
                </Button>
              </Actions>
            </Td>
          </Tr> 
          <Tr>
            <Td>Alfreds Futterkiste</Td>
            <Td>Maria Anders</Td>
            <Td>Germany</Td>
            <Td>095985834</Td>
            <Td>
              <Actions>
                <Button green>Complete</Button>
                <Button style={{ background: "#ff3b00", color: "white" }}>
                  Delete
                </Button>
              </Actions>
            </Td>
          </Tr> 
          <Tr>
            <Td>Alfreds Futterkiste</Td>
            <Td>Maria Anders</Td>
            <Td>Germany</Td>
            <Td>095985834</Td>
            <Td>
              <Actions>
                <Button green>Complete</Button>
                <Button style={{ background: "#ff3b00", color: "white" }}>
                  Delete
                </Button>
              </Actions>
            </Td>
          </Tr> 
          <Tr>
            <Td>Alfreds Futterkiste</Td>
            <Td>Maria Anders</Td>
            <Td>Germany</Td>
            <Td>095985834</Td>
            <Td>
              <Actions>
                <Button green>Complete</Button>
                <Button style={{ background: "#ff3b00", color: "white" }}>
                  Delete
                </Button>
              </Actions>
            </Td>
          </Tr> 
        </Table>
      </Grid>

      <Modal zoom show={showHospitalForm} setShow={setShowHospitalForm}>
        <HospitalsForm />
      </Modal>
    </>
  );
}



function HospitalsForm() {
  const [coords, setCoords] = useState({ lat: 0, lng: 0 })
  const [mark, setMark] = useState({ lat: 0, lng: 0 })
  const [autoComplete, setAutoComplete] = useState(null)
  function setCurrentLocation(){
    
    navigator.geolocation.getCurrentPosition((location) => {
      setCoords({lat: location.coords.latitude, lng: location.coords.longitude})
      setMark({lat: location.coords.latitude, lng: location.coords.longitude})
    }, () => console.log('error :)'), {timeout:10000})
  }
  useEffect(() => {
    setCurrentLocation()
  }, [])
  const onPlaceChanged = () => {
    try{
      console.log(autoComplete.getPlace())
      const lat = autoComplete.getPlace().geometry.location.lat();
      const lng = autoComplete.getPlace().geometry.location.lng();
      setMark({lat, lng})
      setCoords({lat, lng})
    } catch {
      
    }
  } 
  return (
    <>


      <Form>
        <InputDiv>
          <Label>Name *</Label>
          <Input required name="name" placeholder="Name *" />
        </InputDiv>
        <InputDiv>
          <Label>Username *</Label>
          <Input required name="username" type="text" placeholder="Username" />
        </InputDiv>
        <InputDiv>
          <Label>Password *</Label>
          <Input required name="password" type="password" placeholder="Password" />
        </InputDiv>
        <InputDiv>
          <Label>Contact *</Label>
          <Input required name="contact" type="tel" placeholder="Contact" />
        </InputDiv>
        <InputDiv>
          <Label>Contact Person *</Label>
          <Input required name="contact-person" type="text" placeholder="Contact Person" />
        </InputDiv>
        <InputDivW   >

          <Autocomplete   onLoad={autoC => setAutoComplete(autoC)} onPlaceChanged={onPlaceChanged}>
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
            <Button style={{margin: '10px 0px', marginLeft: 'auto'}} green >Create</Button>
        </InputDiv>
      </Form>
    </>
  )
}
