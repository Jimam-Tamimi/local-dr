import React, { useEffect, useState } from 'react'
import { Box, BoxesWrap } from '../styles/admin/Index.styles'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import {setProgress} from '../../redux/progress/actions'
export default function Index() {
    const [adminDetails, setAdminDetails] = useState({});
    const dispatch = useDispatch()
    useEffect( async () => {
        document.title = 'Admin'
        dispatch(setProgress(10))
        try {

            const res = await axios.get(`${process.env.REACT_APP_API_URL}api/get_homepage_details/`)
            console.log(res);
            dispatch(setProgress(60))

            if(res.status == 200){
                setAdminDetails(res.data)
                
            }
        } catch (error) {
            console.log(error);
        }
        
        dispatch(setProgress(100))

    }, []);
    
    
    
    return (
        <>
            <BoxesWrap>

                {(adminDetails?.payments || adminDetails?.payments ===0) && <Box  to="/admin/appointment/" background="#009EFA">
                    <h3>{adminDetails?.payments}</h3>
                    <p>Total Payments</p>
                </Box>}

                <Box to="/admin/appointment/completed/" background="#009EFA">
                    <h3>{adminDetails?.completed_appointments}</h3>
                    <p>Completed Appointments</p>
                </Box>
                <Box  to="/admin/appointment/" background="#7260ED">
                    <h3>{adminDetails?.total_appointments}</h3>
                    <p>Total Appointments</p>
                </Box>
                <Box  to="/admin/schedule/"   background="#56CE66">
                    <h3>{adminDetails?.total_doctors}</h3>
                    <p>Total Doctors</p>
                </Box>

                {(adminDetails?.total_hospitals || adminDetails?.total_hospitals === 0) && <Box  to="/admin/hospitals/" background="#ffbd34">
                    <h3>{adminDetails?.total_hospitals}</h3>
                    <p>Total Hospitals</p>
                </Box>}
                
            </BoxesWrap>
        </>
    )
}
