import logo from './logo.svg';
import './App.css';

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserProvider } from './contexts/user.context';
import Home from './pages/Home.page';
import Login from './pages/Login.page';
import PrivateRoute from './pages/PrivateRoute.page';
import Signup from './pages/Signup.page';
import Profile from './pages/Profile.page';
import Trades from './pages/Trades.page';

function App() {
  return (
    <BrowserRouter>
      {/* We are wrapping our whole app with UserProvider so that */}
      {/* our user is accessible through out the app from any page*/}
      <UserProvider>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          {/* We are protecting our Home Page from unauthenticated */}
          {/* users by wrapping it with PrivateRoute here. */}
          <Route element={<PrivateRoute />}>
            <Route exact path="/" element={<Home />} />
            <Route exact path = "/profile" element = {<Profile />}></Route>
            <Route exact path = "/trades" element = {<Trades />}></Route>
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
