import React, { useState } from "react";
import Layout from "./hoc/Layout";
import GuestRoute from './hoc/GuestRoute';
import PrivateRoute from './hoc/PrivateRoute';
import { Route, useLocation } from "react-router-dom";
import Home from "./pages/home/Home";
import Account from "./components/Account/Account";
import Search from "./pages/home/Search";
import BookAppointment from "./pages/home/BookAppointment";
import Index from "./pages/admin/Index";
import AdminLayout from "./hoc/admin/AdminLayout";
import AdminRoute from "./hoc/admin/AdminRoute";
import Hospitals from "./pages/admin/Hospitals";
import AOS from 'aos'
import 'aos/dist/aos.css'; // You can also use <link> for styles

import { useEffect } from "react";
import { authenticate, refreshToken } from "./redux/auth/actions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { checkAdmin } from "./redux/adminAuth/actions";
import Doctors from "./pages/admin/Doctors";
import Appointments from "./pages/admin/hospital/Appointments";
import Schedule from "./pages/admin/hospital/Schedule";
function App() {
  const dispatch = useDispatch()
  const location = useLocation()
  useEffect(() => {
    AOS.init({ once: true, duration: 1000 });
    dispatch(authenticate())
  }, [])
  const auth = useSelector(state => state.auth)
  
  if (auth.isAuthenticated) {
    axios.interceptors.request.use(
      async config => {
        const token = await auth.access;
        config.headers.authorization = `JWT ${JSON.parse(localStorage.getItem('auth')).access}`;
       
        return config;
      },
      error => {
        Promise.reject(error);
      }
    );
    axios.interceptors.response.use(
      response => response,
      async error => {
        if (error.response.status === 401) {
          await dispatch(refreshToken())
          if (location.pathname.startsWith('/admin')) {
            await dispatch(checkAdmin())
          }
        }
        return Promise.reject(error);
      }
    )
  }

  const adminAuth = useSelector(state => state.adminAuth)
  return (

    <>
      <AdminLayout >
        <AdminRoute>
          {
            adminAuth.isAdmin === true && adminAuth.type === 'superuser' ?
              <>
                <Route exact path="/admin/" component={Index} />
                <Route exact path="/admin/hospitals/" component={Hospitals} />
                <Route exact path="/admin/doctors/" component={Doctors} />
              </> :
              adminAuth.isAdmin === true && adminAuth.type === 'hospital' ?
                <>
                <Route exact path="/admin/appointment/" component={Appointments} />
                <Route exact path="/admin/schedule/" component={Schedule} />

                </> : ''
          }
        </AdminRoute>
      </AdminLayout>
      <Layout>
        <PrivateRoute>
        </PrivateRoute>
        <GuestRoute>
        </GuestRoute>
        <Route exact path='/' component={Home} />
        <Route exact   path='/search/' component={Search} />
        <Route exact path='/doctor/:id/' component={BookAppointment} />
        <Route path='/' component={Account} />
      </Layout>

    </>
  );
}

export default App;
