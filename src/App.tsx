import { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import antd from "antd"
import "antd/dist/antd.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from './Home'
import List from './List'
import Add from './Add'
import Edit from './Edit'
import WebLayout from './WebLayout'
import Login from './Login'
import Register from './Register'
import PrivateRouter from './PrivateRouter'

function App() {
  const userInfo = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : "";
  const [role, setRole] = useState<number>(0);
  useEffect(() => {
    if (!userInfo) return
    setRole(userInfo.user.role);
  }
    , [userInfo])
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<WebLayout />}>
          <Route index element={<Home />} />

          <Route path='products'>
            <Route index element={<PrivateRouter role={role}><List /></PrivateRouter>} />
            <Route path='add' element={<PrivateRouter role={role}><Add /></PrivateRouter>} />
            <Route path=':id/edit' element={<PrivateRouter role={role}><Edit /></PrivateRouter>} />
          </Route>

        </Route>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
