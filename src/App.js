import React, { useState } from "react"
import Header from "./components/Header"
import Dashboard from "./components/Dashboard"
import UsersList from "./components/UsersList"
import Statistics from "./components/Statisctics"
import AppUpdates from "./components/AppUpdates"
import PriceUpdates from "./components/PriceUpdates"
import Profile from "./components/Profile"
import LoginView from "./components/LoginView"
import { AuthProvider } from "./hoc/AuthProvider"
import "./css/main.css"

import { Routes, Route, Link, Navigate, useLocation } from "react-router-dom"

// import checkAccess from "./checkAuth"
import axios from "axios"

import {
  ACCESS_TOKEN_NAME, 
  REFRESH_TOKEN_NAME,
  URL_API_ME,
  URL_LOGIN,
  URL_API_UPDATE_TOKEN,
  URL_API_UPDATE_REFRESH_TOKEN

}  from "./constants"
import { RequireAuth } from "./hoc/RequireAuth"
import Register from "./components/Register"
import ForgotPasswordView from "./components/ForgotPasswordView"
import ChangePasswordView from "./components/ChangePasswordView"





const App = () => {

  const location = useLocation()

  return(
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginView/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/forgotPassword" element={<ForgotPasswordView/>}/>
          <Route path="/changePassword" element={<ChangePasswordView/>}/>
          <Route path="/" element={<RequireAuth><Header/></RequireAuth>}>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/usersList" element={<UsersList/>}/>
            <Route path="/statistics" element={<Statistics/>}/>
            <Route path="/appUpdates" element={<AppUpdates/>}/>
            <Route path="/pricesUpdates" element={<PriceUpdates/>}/>
            <Route path="/profile" element={<Profile/>}/>
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  )

}



export default App