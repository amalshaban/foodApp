import React from 'react'
import logo from '../../../../assets/imgs/44.png'
export default function NotFound() {
  return (
    <div className="pt-3 ps-5 not-found-vector-bg">
    <div className='not-found-bg'>
          <img src={logo}/>
          <h1 className='pt-5'>Oops.... </h1>
          <h4 className='text-success'>Page  not found </h4>
          <p>This Page doesn’t exist or was removed!
          We suggest you  back to home.</p>
          <button className='btn btn-success p-3'>Back to Home</button>
      </div>
    </div>
  )
}
