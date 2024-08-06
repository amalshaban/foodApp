import React from 'react'
import { Outlet } from 'react-router-dom'
import logo from '../../../../assets/imgs/44.png'

export default function AuthLayout({formTitle, formDesc}) {
  return (
    <div className="container-fluid">
    <div className="row containerImg vh-100">
    <div className="bg-overlay  d-flex   justify-content-center  ">
      <div className='col-md-6 bg-white text-center align-self-center p-5 rounded-3'>
      <img src={logo} className='w-50'/>
      <h3 className='d-flex justify-content-start'>{formTitle}</h3>
      <p className='d-flex justify-content-start pb-3'>{formDesc}</p>
      <Outlet/>
      </div>
    </div>
 </div>
 
</div>  
 
  )
}
