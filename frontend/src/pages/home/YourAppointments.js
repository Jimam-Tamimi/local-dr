import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { showRazorpay } from '../../helpers';
import { setProgress } from '../../redux/progress/actions';
import { Button, ButtonLink, Container, Grid } from '../../styles/Essentials.styles';
import { Actions, OptionsColumn, Search, Table, Td, Th, Tr } from '../../styles/Table.styles';

export default function YourAppointments() {
  const [appointments, setAppointments] = useState([]);
  const getAppointments = async () => { 
    dispatch(setProgress(20))

    try { 

      const res = await axios.get(`${process.env.REACT_APP_API_URL}api/appointments/`,);
      console.log(res)
      dispatch(setProgress(80))
      if (res.status === 200) {
        setAppointments(res.data);
      }
      dispatch(setProgress(100))
    } catch (err) {
      console.log(err.response);
    }
  }
  useEffect(() => {
    setTimeout(() => {
      getAppointments()
    }, );
  }, [])

  const getDateFromStr = (date) => {
    var  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let d = new Date(date);
    let day = d.getDate();
    let month = d.getMonth();
    let year = d.getFullYear();
    return `${day} ${months[month]} ${year}`;
  }
  const getTimeFromStr = (time) => {
    let d = (new Date (new Date().toDateString() + ' ' + time));
    return `${d.getHours()}:${d.getMinutes()} ${d.getHours() >= 12 ? 'PM' : 'AM'}`;
  }

  const filterAppointments = async (e) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}api/appointments/?search=${e.target.value}`);
      if (res.status === 200) {
        setAppointments(res.data);
      }
    } catch (err) {
      console.log(err)
    }
  }
  const dispatch = useDispatch()
  return (
    <>
      <Container>

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
              <Th>Date</Th>
              <Th>Time</Th>
              <Th>Status</Th>
              <Th>Payment Status</Th>
              <Th>Action</Th>
            </Tr>
            {
              appointments.map((appointment, i) => (
                <Tr key={i}>

                  <Td>{appointment?.id}</Td>
                  <Td>{appointment?.name}</Td>
                  <Td>{appointment?.email}</Td>
                  <Td>{appointment?.number}</Td>
                  <Td>{getDateFromStr(appointment?.date)}</Td>
                  <Td>{getTimeFromStr(appointment?.time)}</Td>
                  <Td>{appointment?.status}</Td>
                  <Td>{appointment?.isPaid ? 'Paid': 'Unpaid'}</Td>
                  {
                    appointment?.isPaid ? 
                    <Td><ButtonLink to={`/appointments/${appointment.id}`} sm>View</ButtonLink></Td>
                     : <Td><Button onClick={e => showRazorpay(appointment.id, () => getAppointments()) }  sm>Pay</Button> </Td>
                  }

                </Tr>

              ))
            }


          </Table>
        </Grid>
      </Container>

    </>
  )
}
