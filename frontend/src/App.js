import React from "react";
import Layout from "./hoc/Layout";
import GuestRoute from './hoc/GuestRoute';
import AdminRoute from './hoc/AdminRoute';
import {  Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Account from "./components/Account/Account";
import Search from "./pages/home/Search";
import BookAppointment from "./pages/home/BookAppointment";
import Index from "./pages/admin/Index";
 
function App() {
  return (

    <> 
      <Layout>
        <AdminRoute>
          <Route path="/admin/" component={Index} />
        </AdminRoute>
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
