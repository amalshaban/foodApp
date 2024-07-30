import React from 'react'
import SideBar from '../SideBar/SideBar'
import NavBar from '../NavBar/NavBar'
import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'

export default function MasterLayout() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 bg-success">
          <SideBar/>
        </div>
        <div className="col-md-9 bg-warning">
          <NavBar/>
          <Header/>
          <Outlet/>
        </div>
      </div>
    </div>
  )
}
