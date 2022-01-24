import React, { useEffect, useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { FirstSection, NavWrap, NotificationItem, NotificationsDiv, NotificationWrap, SecondSection } from './Dashnav.styles'
import { logout } from '../../redux/auth/actions'
import axios from 'axios'
import { IoNotificationsOutline, IoNotificationsSharp } from 'react-icons/io5'
import Dropdown from '../Dropdown/Dropdown'
export default function Dashnav({ showDash, setShowDash }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const adminAuth = useSelector(state => state.adminAuth)

    const [name, setName] = useState('');
    useEffect(async () => {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}api/get_user_name/`)
        if (res.status === 200) {
            setName(res?.data?.name)
        }
    }, []);


    // notification 
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unseen, setUnseen] = useState(0);


    const getNotifications = async () => {
        if (adminAuth.type === 'hospital') { 
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}api/get_notifications/`)
                if (res.status == 200) {
                    setUnseen(res.data.unseen)
                    setNotifications(res.data.notifications)
                    await setTimeout(() => {
                        getNotifications()
                    }, 5000);
                }
            } catch (error) {
                // console.log(error.response);
            }
        }

    }
    useEffect(() => {
        getNotifications()

    }, []);

    useEffect(async () => {
        if (showNotifications) {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}api/get_notifications/?seen=true`)
                if (res.status == 200) {
                    setUnseen(0)
                }
            } catch (error) {
                // console.log(error.response);
            }
        }
    }, [showNotifications]);


    return (
        <>
            <NavWrap>
                <FirstSection>
                    <GiHamburgerMenu onClick={e => setShowDash(!showDash)} />
                    <Link id="admin-name" to="/admin/">{name}</Link>
                </FirstSection>
                <SecondSection>

                    {
                        adminAuth.type === 'hospital' &&
                    <NotificationWrap showNum={unseen != 0 && unseen}>
                        <div onClick={e => setShowNotifications(!showNotifications)} className='notification-icon'>
                            <IoNotificationsOutline />
                        </div>
                        <Dropdown show={showNotifications} setShow={setShowNotifications}>
                            <NotificationsDiv>
                                {
                                    notifications?.map((notification, i) => (
                                        <NotificationItem onClick={e => history.push('/admin/appointment/')} key={i}>
                                            <h3>New Appointment</h3>
                                            <p>Appointment for doctor <b>{notification?.appointment?.doctor}</b> on <b>{notification?.appointment?.date}</b> at <b>{notification?.appointment?.time}</b></p>
                                        </NotificationItem>
                                    ))
                                }

                            </NotificationsDiv>
                        </Dropdown>
                    </NotificationWrap>
                    }


                    <p onClick={e => { dispatch(logout()); dispatch({ type: "IS_NOT_ADMIN" }) }} >Logout</p>
                </SecondSection>
            </NavWrap>
        </>
    )
}
