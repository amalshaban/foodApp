import React from 'react'
import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="container-fluid">
    <div className="row containerImg vh-100">
    <div className="bg-overlay  d-flex   justify-content-center  ">
     
      <Outlet/>
    </div>
 </div>
 
</div>  
 
  )
}
