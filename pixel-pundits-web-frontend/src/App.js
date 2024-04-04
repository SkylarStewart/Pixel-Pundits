import logo from './logo.svg';
import './App.css';

import React from 'react';
import { BrowserRouter, Route, Routes, HashRouter } from 'react-router-dom';
import { UserProvider } from './contexts/user.context';
import Home from './pages/Home.page';
import Login from './pages/Login.page';
import PrivateRoute from './pages/PrivateRoute.page';
import Signup from './pages/Signup.page';
import Profile from './pages/Profile.page';
import NavigationBar from './Components/NavigationBar';
import Trades from './pages/Trades.page';
import MakeTrade from './pages/MakeTrade.page';
import CompletedTrade from './pages/CompletedTrade.page';
import 'bootstrap/dist/css/bootstrap.min.css';
import Tutorial from './pages/Tutorial.page';

function App() {
  return (
    <HashRouter>
      {/* We are wrapping our whole app with UserProvider so that */}
      {/* our user is accessible through out the app from any page*/}
      <UserProvider>
        <NavigationBar/>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          {/* We are protecting our Home Page from unauthenticated */}
          {/* users by wrapping it with PrivateRoute here. */}
          <Route element={<PrivateRoute />}>
            <Route exact path="/" element={<Home />} />
            <Route exact path = "/profile" element = {<Profile />}></Route>
            <Route exact path = "/trades" element = {<Trades />}></Route>
            <Route exact path = "/tutorial" element = {<Tutorial />}></Route>
            <Route exact path = "/maketrade/:id" element = {<MakeTrade />}></Route>
            <Route exact path = "/completedtrade" element = {<CompletedTrade/>}></Route>
          </Route>
        </Routes>
      </UserProvider>
    </HashRouter>
  );
}

export default App;
