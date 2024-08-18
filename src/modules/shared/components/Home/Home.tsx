import React from 'react'
import Header from '../Header/Header'
import headerbg from "../../../../assets/imgs/Group48102098.png"
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className=''>
      <Header 
        title = {"welcome upskilling!"}
        discribtion = {"This is a welcoming screen for the entry of the application , you can now see the options"}
        imgurl = {headerbg}
      />
      
    <div className="title p-4 mt-2  d-flex justify-content-between align-items-center">
<div className="title-info">
      <h4 className="">fill the <span className='text-success'>Recipes !</span></h4>
      <span className="">you can now fill the meals easily using the table and form ,<br/>
       click here and sill it with the table !</span>
    </div>
<Link to='/dashboard/recipieslist' className='btn btn-success pb-1'>Fill Recipes <i className="fa-solid fa-arrow-right"></i></Link>
</div>

      </div>
  )
}
