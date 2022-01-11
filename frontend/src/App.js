import React from "react";
import Layout from "./hoc/Layout";
import GuestRoute from './hoc/GuestRoute';
import PrivateRoute from './hoc/PrivateRoute';
import {  Route } from "react-router-dom";
import Home from "./pages/home/Home";
 
function App() {
  return (

    <> 
      <Layout>
        <PrivateRoute>
        </PrivateRoute>
        <GuestRoute>
          <Route to='/'  component={Home} />
          <Route to='/login/'  ></Route>
        </GuestRoute>
      </Layout>
    </>
  );
}

export default App;
