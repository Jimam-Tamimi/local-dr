import React, { useEffect, useState } from 'react'
import { Box, BoxesWrap } from '../styles/admin/Index.styles'
import axios from 'axios'
export default function Index() {
    const [adminDetails, setAdminDetails] = useState({});
    useEffect( async () => {
        document.title = 'Admin'
        try {

            const res = await axios.get(`${process.env.REACT_APP_API_URL}api/get_homepage_details/`)
            console.log(res);
            if(res.status == 200){
                setAdminDetails(res.data)
            }
        } catch (error) {
            console.log(error);
        }

    }, []);
    
    
    
    return (
        <>
            <BoxesWrap>

                {adminDetails?.payments && <Box background="#009EFA">
                    <h3>{adminDetails?.payments}</h3>
                    <p>Total Payments</p>
                </Box>}

                <Box background="#009EFA">
                    <h3>{adminDetails?.completed_appointments}</h3>
                    <p>Completed Appointments</p>
                </Box>
                <Box background="#7260ED">
                    <h3>{adminDetails?.total_appointments}</h3>
                    <p>Total Appointments</p>
                </Box>
                <Box  background="#56CE66">
                    <h3>{adminDetails?.total_doctors}</h3>
                    <p>Total Doctors</p>
                </Box>

                {adminDetails?.total_hospitals && <Box  background="#ffbd34">
                    <h3>{adminDetails?.total_hospitals}</h3>
                    <p>Total Hospitals</p>
                </Box>}
                
            </BoxesWrap>
        </>
    )
}
