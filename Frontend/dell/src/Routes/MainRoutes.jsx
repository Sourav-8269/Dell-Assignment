import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Register from '../Components/Register'
import SimpleCard from '../Components/Login'

const MainRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Register/>} ></Route>
        <Route path="/login" element={<SimpleCard/>} ></Route>
        {/* SimpleCard */}
    </Routes>
  )
}

export default MainRoutes