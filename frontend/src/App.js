import React from "react";
import Layout from "./hoc/Layout";
import GuestRoute from './hoc/GuestRoute';
import PrivateRoute from './hoc/PrivateRoute';
import {  Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Account from "./components/Account/Account";
import Search from "./pages/home/Search";
 
function App() {
  return (

    <> 
      <Layout>
        <PrivateRoute>
        </PrivateRoute>
        <GuestRoute>
          <Route exact path='/'  component={Home} />
          <Route exact path='/search/'  component={Search} />
          <Route path='/' component={Account} />
        </GuestRoute>
      </Layout>
    </>
  );
}

export default App;
