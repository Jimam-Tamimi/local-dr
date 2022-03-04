import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import alert from '../../../redux/alert/actions';
import { setProgress } from '../../../redux/progress/actions';
import { Button, ButtonLink, Container, Grid } from '../../../styles/Essentials.styles';
import { Actions, OptionsColumn, Search, Table, Td, Th, Tr } from '../../../styles/Table.styles';
import { HeadingColumn } from '../../styles/admin/Hospitals.styles';

export default function CompletedAppointments() {
  const [appointments, setAppointments] = useState([]);
  const getAppointments = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}api/appointments/`);
    console.log(res)
    if (res.status === 200) {
      setAppointments(res.data);
    }
  }
  useEffect(async () => {
    dispatch(setProgress(35))
    await getAppointments()
    dispatch(setProgress(100))
  }, [])

  const getDateFromStr = (date) => {
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let d = new Date(date);
    let day = d.getDate();
    let month = d.getMonth();
    let year = d.getFullYear();
    return `${day} ${months[month]} ${year}`;
  }
  const getTimeFromStr = (time) => {
    let d = (new Date(new Date().toDateString() + ' ' + time));
    return `${d.getHours()}:${d.getMinutes()} ${d.getHours() >= 12 ? 'PM' : 'AM'}`;
  }
  const dispatch = useDispatch()
  const filterAppointments = async (e) => {
    try {

      const res = await axios.get(`${process.env.REACT_APP_API_URL}api/appointments/?search=${e.target.value}`);
      dispatch(setProgress(75))
      if (res.status === 200) {
        await setAppointments(res.data);
      }
    } catch (err) {
      console.log(err)
    }
  }

  const deleteAppointment = async (id) => {
    if (window.confirm('Are you sure you want to delete this appointment')) {
      dispatch(setProgress(25))
      try {
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}api/appointments/${id}/`)
        dispatch(setProgress(40))
        if (res.status === 204) {
          dispatch(alert('Appointment deleted successfully', 'success'))
          await getAppointments()
          dispatch(setProgress(80))
        }
      } catch (err) {
        dispatch(alert('Failed to delete appointment ', 'danger'))

        console.log(err)
      }
      dispatch(setProgress(100))
    }
  }

  return (
    <>
      <Grid style={{ border: "1px solid #eff2f7" }}>
        <HeadingColumn justify="space-between">
          <h1>All Appointments</h1>
        </HeadingColumn>
      </Grid>
      <Grid style={{ overflowX: "scroll" }} direction="column">
        <OptionsColumn justify="flex-end" style={{ margin: "10px 0px" }}>
          <Search onChange={filterAppointments} type="text" placeholder="Search..." />
        </OptionsColumn>
        <Table>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Number</Th>
            <Th>Doctor</Th>
            <Th>Date</Th>
            <Th>Time</Th>
            <Th>Status</Th>
            <Th>Action</Th>
          </Tr>
          {
            appointments.map((appointment, i) => (
              appointment.status === 'completed' ?
                <Tr key={i}>

                  <Td>{appointment?.id}</Td>
                  <Td>{appointment?.name}</Td>
                  <Td>{appointment?.email}</Td>
                  <Td>{appointment?.number}</Td>
                  <Td img={true}> <div> { appointment?.doctor.image && <img src={`${process.env.REACT_APP_MEDIA_URL}${appointment?.doctor.image}`} />} {appointment?.doctor.name}</div></Td>
                  <Td>{getDateFromStr(appointment?.date)}</Td>
                  <Td>{getTimeFromStr(appointment?.time)}</Td>
                  <Td>{appointment?.status}</Td>
                  <Td>
                    <Actions>
                      <Button onClick={e => deleteAppointment(appointment.id)} danger>Delete</Button>
                    </Actions>
                  </Td>
                </Tr> : ' '

            ))
          }


        </Table>
      </Grid>

    </>
  )
}
