import React from 'react'
import { Route, BrowserRouter , Routes, Navigate } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Home from '../pages/Home'
import Project from '../pages/Project'
import UserAuth from '../auth/UserAuth'

const AppRoutes = () => {
  return (
    <BrowserRouter>
    <Routes>
       

        <Route path='/' element={<Navigate to='/register'></Navigate>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/project' element={<UserAuth> <Project/> </UserAuth>}></Route>
        <Route path='/home' element={<UserAuth> <Home/> </UserAuth>}></Route>
        

    </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
