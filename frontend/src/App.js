import React from "react";
import Layout from "./hoc/Layout";
import GuestRoute from './hoc/GuestRoute';
import PrivateRoute from './hoc/PrivateRoute';
import {  Route } from "react-router-dom";
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
function App() {
  useEffect(() => {
    AOS.init({once: true,})
  }, [])
  return (

    <> 
          <AdminLayout>
        <AdminRoute>
        <Route exact path="/admin/" component={Index} />
        <Route exact path="/admin/hospitals/" component={Hospitals} />
        </AdminRoute>
      </AdminLayout>
      <Layout>
        <PrivateRoute>
        </PrivateRoute>
        <GuestRoute>
          <Route exact path='/'  component={Home} />
          <Route exact path='/search/'  component={Search} />
          <Route exact path='/doctor/:id/'  component={BookAppointment} />
          <Route path='/' component={Account} />
        </GuestRoute>
      </Layout>

    </>
  );
}

export default App;
