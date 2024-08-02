import React from 'react'
import SideBar from '../SideBar/SideBar'
import NavBar from '../NavBar/NavBar'
import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'

export default function MasterLayout() {
  return (
    <div className="100vh">
      <div className="d-flex">
        <div className="">
          <SideBar/>
        </div>
        <div className="w-100">
          <NavBar/>
          <Header/>
          <Outlet/>
        </div>
      </div>
    </div>
  )
}
