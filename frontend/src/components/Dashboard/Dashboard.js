import React, { useEffect, useRef } from 'react'
import {FaHospitalAlt, FaPlusCircle, FaSitemap} from 'react-icons/fa' 
import { DashboardWrap, DashLink } from './Dashboard.styles'


export default function Dashboard({showDash, setShowDash}) {
    const dashRef = useRef(null);
    useEffect(() => {
      const toggleOpen = (e) => { 
        if (!dashRef.current.contains(e.target) && showDash && window.innerWidth < 850) {
            setShowDash(false);
        }
      };
      window.addEventListener("click", toggleOpen);
      return () => {
        window.removeEventListener("click", toggleOpen);
      };
    }, [showDash]);
    
    
    return (
        <>
            <DashboardWrap ref={dashRef} showDash={showDash}>
                <DashLink to="/admin/hospitals/">
                        <FaSitemap />
                        <p>Hospitals</p>
                </DashLink>
                {/* <DashLink to="#">
                        <FaPlusCircle />
                        <p>Add Hospital</p>
                </DashLink>
                <DashLink className='active' to="#">
                        <FaHospitalAlt />
                        <p>Temp</p>
                </DashLink>
                <DashLink to="#">
                        <FaSitemap />
                        <p>Temp</p>
                </DashLink>*/}
            </DashboardWrap> 
        </>
    )
}
