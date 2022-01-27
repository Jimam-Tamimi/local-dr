import React, { useEffect, useRef } from "react";
import { FaHospitalAlt, FaPlusCircle, FaSitemap } from "react-icons/fa";
import { useSelector } from "react-redux";
import { DashboardWrap, DashLink } from "./Dashboard.styles";

export default function Dashboard({ showDash, setShowDash }) {
  const dashRef = useRef(null);
  useEffect(() => {
    const toggleOpen = (e) => {
      if (
        !dashRef.current.contains(e.target) &&
        showDash &&
        window.innerWidth < 850
      ) {
        setShowDash(false);
      }
    };
    window.addEventListener("click", toggleOpen);
    return () => {
      window.removeEventListener("click", toggleOpen);
    };
  }, [showDash]);

  const adminAuth = useSelector((state) => state.adminAuth);

  return (
    <>
      <DashboardWrap ref={dashRef} showDash={showDash}>
        {adminAuth.isAdmin === true &&
        (adminAuth.type === "superuser" || adminAuth.type === "staff") ? (
          <>
            <DashLink onClick={e => setShowDash(false)}    to="/admin/hospitals/">
              <FaSitemap />
              <p>Hospitals</p>
            </DashLink>
            <DashLink onClick={e => setShowDash(false)}   to="/admin/hospital/deactivated/">
              <FaSitemap />
              <p>Deactivated Hospitals</p>
            </DashLink>
            <DashLink onClick={e => setShowDash(false)}   exact to="/admin/doctors/">
              <FaSitemap />
              <p>Doctor</p>
            </DashLink>
            {adminAuth.type !== "staff" && (
              <DashLink onClick={e => setShowDash(false)}   exact to="/admin/staff/">
                <FaSitemap />
                <p>Staff</p>
              </DashLink>
            )}
          </>
        ) : adminAuth.isAdmin === true && adminAuth.type === "hospital" ? (
          <>
            <DashLink onClick={e => setShowDash(false)}   to="/admin/schedule/">
              <FaSitemap />
              <p>Schedule</p>
            </DashLink>
            <DashLink onClick={e => setShowDash(false)}   exact to="/admin/appointment/">
              <FaSitemap />
              <p>Appointments</p>
            </DashLink>
            <DashLink onClick={e => setShowDash(false)}   exact to="/admin/appointment/completed/">
              <FaSitemap />
              <p>Completed Appointments</p>
            </DashLink>
          </>
        ) : (
          ""
        )}
        {/* <DashLink onClick={e => setShowDash(false)}   to="#">
                        <FaPlusCircle />
                        <p>Add Hospital</p>
                </DashLink>
                <DashLink onClick={e => setShowDash(false)}   className='active' to="#">
                        <FaHospitalAlt />
                        <p>Temp</p>
                </DashLink>
                <DashLink onClick={e => setShowDash(false)}   to="#">
                        <FaSitemap />
                        <p>Temp</p>
                </DashLink>*/}
      </DashboardWrap>
    </>
  );
}
